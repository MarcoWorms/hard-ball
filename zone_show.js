
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
      else if( o.state.holder !== null )
      {
        o.zone_show.coord( 'matrix', 18, o.state.holder )
        o.zone_show.appear()
        o.zone_show.style( 'bold' )
      }
    }
    else if( typeof( o.state.displayed ) === 'number' )
    {
      const ath_num = o.state.displayed
      const ath_coo = o.state.athlete[ ath_num ]

      if( ath_coo.y === 586 )
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
        }
      }
      else // playing
      {
        if( o.state.rounder !== null )
        {
          o.zone_show.coord( 'matrix', 18, ath_num )
          o.zone_show.appear()
          o.zone_show.style( 'bold' )
        }
        else
        {
          o.zone_show.coord( 'matrix', ath_num, ath_num )
          o.zone_show.appear()

          o.state.now === ath_coo.color
          ? o.zone_show.style( 'bold' )
          : o.zone_show.style( 'thin' )
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
        team = o.state.team.green
      }
      else
      {
        spawn = o.state.spawn.blue
        team = o.state.team.blue
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
              x:o.tool.bend( o.state.athete[ gama ].x + mod[ 0 ] * 48, 'x' ),
              y:o.tool.bend( o.state.athete[ gama ].y + mod[ 1 ] * 48, 'y' ),
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
      if( zone.x !== null )
      {
        if( o.zone_show.ok( o.tool.convert( zone.x, zone.y ) ) )
        {
          o.page.zone[ index ].style.marginLeft = zone.x + "px"
          o.page.zone[ index ].style.marginTop = zone.y + "px"
          o.page.zone[ index ].style.display = "flex"
        }
      }
    } )

    o.update.aim()
    o.update.blocked()
  },
  style:( condition )=>
  {
    const classes = "zon sqr abs box rn2 tr2"

    let non = classes
    let tgt = classes
    let blk = classes

    if( condition === "bold" )
    {
      non += " bld pnt"
      tgt += " btg pnt"
      blk += " bbl"
    }
    else if( condition === "thin" )
    {
      non += " thi"
      tgt += " ttg"
      blk += " tbl"
    }

    Array.from( o.page.zone ).map( ( zone, index )=>
    {
      if( o.state.aim.zone.indexOf( index ) !== -1 )
      {
        o.state.blocked.indexOf( index ) !== -1
        ? zone.classList = blk
        : zone.classList = tgt
      }
      else
      {
        zone.classList = non
      }
    } )
  },
  ok:( coord )=>
  {
    if( o.state.displayed === "ball" )
    {
      return( true )
    }
    else // athlete
    {
      let own_area
      let opp_area
      let keeper

      if( o.state.athlete[ o.state.displayed ].color === "gre" )
      {
        own_area = o.info.area.green
        opp_area = o.info.area.blue
        keeper = o.state.keeper.green
      }
      else
      {
        own_area = o.info.area.blue
        opp_area = o.info.area.green
        keeper = o.state.keeper.blue
      }

      if( opp_area.indexOf( coord ) !== -1
      || own_area.indexOf( coord ) !== -1
      && keeper !== null
      && keeper !== object )
      {
        return( false )
      }
      else
      {
        return( true )
      }
    }
  },
}
