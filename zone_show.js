
'use strict'

o.zone_show =
{
  begin:()=>
  {
    // REFRESH
    //
    Array.from( o.page.zone ).map( ( zone, index )=>
    {
      zone.style.display = 'none'
      o.state.zone[ index ] = { x:null, y:null }
    } )

    // UPDATES
    //
    if( o.state.turn > 0 )
    {
      o.update.now()
      o.update.lights()
      o.update.rounder_keeper()
    }

    // SET DISPLAYED
    //
    o.state.hovered !== null
    ? o.state.displayed = o.state.hovered
    : o.state.selected !== null
    ? o.state.displayed = o.state.selected
    : o.state.displayed = null

    o.zone_show.process()
  },
  process:()=>
  {
    // PROCESS
    //
    if( o.state.displayed === 'ball' )
    {
      if( o.state.ball.x === 456 )
      {
        o.zone_show.coord( 'center', null, null )
        o.zone_show.appear()
        o.zone_show.style( 'thin' )
      }
      else if( o.state.holder.now !== null )
      {
        o.zone_show.coord( 'matrix', 18, o.state.holder.now )
        o.zone_show.appear()
        o.zone_show.style( 'bold' )
      }
    }
    else if( typeof( o.state.displayed ) === 'number' )
    {
      const ath_num = o.state.displayed
      const athlete = o.state.athlete[ ath_num ]

      if( athlete.y === 586 )
      {
        if( o.state.turn < 8 )
        {
          o.state.turn === 0
          ? o.zone_show.coord( 'start', null, null )
          : o.zone_show.coord( 'place', null, null )

          o.zone_show.appear()
          o.zone_show.style( 'bold' )
        }
        else
        {
          o.zone_show.coord( 'replace', null, null )
          o.zone_show.appear()
          o.zone_show.style( 'bold' )
        }
      }
      else // playing
      {
        if( o.state.rounder !== null
        && o.state.rounder === o.state.displayed )
        {
          o.zone_show.coord( 'matrix', 18, ath_num )
          o.zone_show.appear()
          o.zone_show.style( 'bold' )
        }
        else
        {
          o.zone_show.coord( 'matrix', ath_num, ath_num )
          o.zone_show.appear()

          if( o.state.turn < 8
          || o.state.now !== athlete.color 
          || o.state.rounder !== null
          && o.state.rounder !== o.state.displayed )
          {
            o.zone_show.style( 'thin' )
          }
          else
          {
            o.zone_show.style( 'bold' )
          }
        }
      }
    }
  },
  coord:( alfa, beta, gama )=>
  {
    // TURN PREPARATIONS
    //
    let spawn
    let team

    if( o.state.turn > 0 )
    {
      if( o.state.now === 'gre' )
      {
        spawn = o.state.spawn.green
        team = o.state.team.green.map( ( number, index )=>
        {
          const athlete = o.state.athlete[ number ]
          return( o.tool.convert( athlete.x, athlete.y ) )
        } )
      }
      else if( o.state.now === 'blu' )
      {
        spawn = o.state.spawn.blue
        team = o.state.team.blue.map( ( number, index )=>
        {
          const athlete = o.state.athlete[ number ]
          return( o.tool.convert( athlete.x, athlete.y ) )
        } )
      }
    }

    // LIST DEFINITION
    //
    let list

    if( alfa === 'center' )
    {
      list = o.info.center
    }
    else if( alfa === 'start' )
    {
      list = o.state.spawn.green.concat( o.state.spawn.blue )
    }
    else if( alfa === 'place' )
    {
      list = spawn
    }
    else if( alfa === 'replace' )
    {
      list = team
    }
    else if( alfa === 'matrix' )
    {
      let counter = 0

      o.info.matrix[ beta ].map( ( binary, index )=>
      {
        if( binary )
        {
          o.info.guide[ index ].map( ( mod )=>
          {
            o.state.zone[ counter ] =
            {
              x:o.tool.bend( o.state.athlete[ gama ].x + mod[ 0 ] * 48, 'x' ),
              y:o.tool.bend( o.state.athlete[ gama ].y + mod[ 1 ] * 48, 'y' ),
            }

            counter ++
          } )
        }
      } )
    }

    // WRITE COORDINATES
    //
    if( alfa !== 'matrix' )
    {
      list.map( ( name, index )=>
      {
        const coord = o.tool.convert( name, null )
        o.state.zone[ index ] = { x:coord.x, y:coord.y }
      } )
    }
  },
  appear:()=> // + AIM and BLOCKED updates
  {
    o.state.zone.map( ( zone, index )=>
    {
      if( zone.x !== null
      && o.zone_show.ok( o.tool.convert( zone.x, zone.y ) ) )
      {
        o.page.zone[ index ].style.marginLeft = zone.x + 'px'
        o.page.zone[ index ].style.marginTop = zone.y + 'px'
        o.page.zone[ index ].style.display = 'flex'
      }
    } )

    o.update.aim()
    o.update.blocked()
  },
  style:( condition )=>
  {
    const classes = 'zon sqr abs box rn2 tr2'

    let non = classes
    let tgt = classes
    let blk = classes

    if( condition === 'bold' )
    {
      non += ' bld pnt'
      tgt += ' btg pnt'
      blk += ' bbl'
    }
    else if( condition === 'thin' )
    {
      non += ' thi'
      tgt += ' ttg'
      blk += ' tbl'
    }

    Array.from( o.page.zone ).map( ( zone, index )=>
    {
      o.state.aim.zone.indexOf( index ) === -1
      ? zone.classList = non
      : o.state.blocked.indexOf( index ) !== -1
      ? zone.classList = blk
      : zone.classList = tgt
    } )
  },
  ok:( coord )=>
  {
    if( o.state.displayed === 'ball' )
    {
      return( true )
    }
    else // athlete
    {
      const athlete = o.state.athlete[ o.state.displayed ]

      if( athlete.color === 'gre'
      || athlete.color === 'blu' )
      {
        let own_area
        let opp_area
        let keeper

        if( athlete.color === 'gre' )
        {
          own_area = o.info.area.green
          opp_area = o.info.area.blue
          keeper = o.state.keeper.green
        }
        else if( athlete.color === 'blu' )
        {
          own_area = o.info.area.blue
          opp_area = o.info.area.green
          keeper = o.state.keeper.blue
        }

        if( opp_area.indexOf( coord ) !== -1
        || own_area.indexOf( coord ) !== -1
        && keeper !== null
        && keeper !== o.state.displayed )
        {
          return( false )
        }
        else
        {
          return( true )
        }
      }
      else
      {
        return( true )
      }
    }
  },
}
