
'use strict'

o.update =
{
  cluster:()=> // on engine CREATE and LOAD
  {
    o.update.ball()
    o.update.trigger()
    o.update.athlete()
    o.update.team()
    o.update.z_index()
    o.update.lights()
  },
  screen:()=>
  {
    const firstCell = document.querySelector( '.cll' ).getBoundingClientRect()

    // CHROME & SAFARI
    //
    const dif = navigator.userAgent.indexOf( 'Safari' ) !== -1
    ? { x:-15, y:101.5 }
    : { x:0, y:0 }

    o.state.screen.x = firstCell.left + dif.x
    o.state.screen.y = firstCell.top + dif.y
  },
  ball:()=>
  {
    o.tool.translate( o.page.ball, o.state.ball.x, o.state.ball.y )
  },
  trigger:()=>
  {
    o.tool.translate( o.page.trigger, o.state.ball.x, o.state.ball.y )
  },
  athlete:()=>
  {
    Array.from( o.page.athlete ).map( ( athlete, index )=>
    {
      const coord = o.state.athlete[ index ]
      o.tool.translate( athlete, coord.x, coord.y )
    } )
  },
  team:()=>
  {
    Array.from( o.page.athlete ).map( ( athlete, index )=>
    {
      o.state.team.green.indexOf( index ) !== -1
      ? athlete.classList = 'ath sqr rn2 bd3 box abs cnt gre'
      : o.state.replaced.green.indexOf( index ) !== -1
      ? athlete.classList = 'ath sqr rn2 bd3 box abs cnt grp' // tbd . class grp
      : o.state.team.blue.indexOf( index ) !== -1
      ? athlete.classList = 'ath sqr rn2 bd3 box abs cnt blu'
      : o.state.replaced.blue.indexOf( index ) !== -1
      ? athlete.classList = 'ath sqr rn2 bd3 box abs cnt brp' // tbd . class brp
      : athlete.classList = 'ath sqr rn2 bd3 box abs cnt btn'
    } )
  },
  z_index:()=>
  {
    const value =
    {
      ball:'3',
      trigger:'2',
    }

    // tbd

    o.page.ball.style.zIndex = value.ball
    o.page.trigger.style.zIndex = value.trigger
  },
  now:()=>
  {
    if( o.state.turn % 2 === 0 )
    {
      if( o.state.first === 'gre' ){ o.state.now = 'gre' }
      else if( o.state.first === 'blu' ){ o.state.now = 'blu' }
    }
    else
    {
      if( o.state.first === 'gre' ){ o.state.now = 'blu' }
      else if( o.state.first === 'blu' ){ o.state.now = 'gre' }
    }
  },
  blocked:()=>
  {
    o.state.blocked = []

    if( o.state.displayed === 'ball' )
    {
      // tbd
    }
    else if( typeof( o.state.displayed ) === 'number' // athlete
    && o.state.turn > 7 )
    {
      const athlete = o.state.athlete[ o.state.displayed ]

      if( athlete.y === 586 ) // benched
      {
        let replaced
        let team

        if( o.state.now === 'gre' )
        {
          replaced = o.state.replaced.green
          team = o.state.team.green
        }
        else
        {
          replaced = o.state.replaced.blue
          team = o.state.team.blue
        }

        if( replaced.length === 2 ){ o.state.blocked = team }
      }
      else // playing
      {
        Array.from( o.state.aim.target ).map( ( target_num, index )=>
        {
          if( target_num !== 'ball' )
          {
            // STEP 1
            //
            const zone_num = o.state.aim.zone[ index ]
            const zone = o.state.zone[ zone_num ]
            const dif =
            {
              x:zone.x - athlete.x,
              y:zone.y - athlete.y,
            }
            const future =
            {
              x:o.tool.bend( zone.x + dif.x, 'x' ),
              y:o.tool.bend( zone.y + dif.y, 'y' ),
            }
            const future_str = o.tool.convert( future.x, future.y )

            // STEP 2
            //
            const target = o.state.athlete[ target_num ]

            let tgt_opp_area
            let tgt_own_area
            let keeper

            if( target.color === 'gre' )
            {
              tgt_opp_area = o.info.area.blue
              tgt_own_area = o.info.area.green
              keeper = o.state.keeper.green
            }
            else
            {
              tgt_opp_area = o.info.area.green
              tgt_own_area = o.info.area.blue
              keeper = o.state.keeper.blue
            }

            // STEP 3
            //
            if( tgt_opp_area.indexOf( future_str ) !== -1
            || tgt_own_area.indexOf( future_str ) !== -1
            && keeper !== null )
            {
              o.state.blocked.push( zone_num )
            }
            else
            {
              o.state.athlete.map( ( athlete )=>
              {
                const str = o.tool.convert( athlete.x, athlete.y )
                if( str === future_str ){ o.state.blocked.push( zone_num ) }
              } )
            }
          }
        } )
      }
    }
  },
  aim:()=>
  {
    o.state.aim = { zone:[], target:[] }

    o.state.zone.map( ( zone, zone_index )=>
    {
      if( zone.x === o.state.ball.x
      && zone.y === o.state.ball.y )
      {
        o.state.aim.zone.push( zone_index )
        o.state.aim.target.push( 'ball' )
      }

      o.state.athlete.map( ( athlete, athlete_index )=>
      {
        if( zone.x === athlete.x
        && zone.y === athlete.y )
        {
          o.state.aim.zone.push( zone_index )
          o.state.aim.target.push( athlete_index )
        }
      } )
    } )
  },
  selection:()=>
  {
    o.page.selection.style.display = 'none'

    if( o.state.selected === 'ball' )
    {
      setTimeout( ()=>
      {
        o.page.selection.style.display = 'flex'
        const x = o.state.ball.x
        const y = o.state.ball.y
        o.tool.translate( o.page.selection, x, y )
      } )
    }
    else if( typeof( o.state.selected ) === 'number' )
    {
      setTimeout( ()=>
      {
        o.page.selection.style.display = 'flex'
        const x = o.state.athlete[ o.state.selected ].x
        const y = o.state.athlete[ o.state.selected ].y
        o.tool.translate( o.page.selection, x, y )
      } )
    }
  },
  rounder_keeper:()=>
  {
    o.state.keeper = { green:null, blue:null }
    o.state.roundabout = []

    o.state.athlete.map( ( athlete, index )=>
    {
      const coord = o.tool.convert( athlete.x, athlete.y )
      const ltr = coord.substring( 0, 1 )
      const both_areas = o.info.area.green.concat( o.info.area.blue )

      if( both_areas.indexOf( coord ) !== -1 )
      {
        o.state.team.green.indexOf( index ) !== -1
        ? o.state.keeper.green = index
        : o.state.keeper.blue = index
      }

      else if( ltr === 'A' || ltr === 'B' || ltr === 'K' || ltr === 'L' )
      {
        if( index !== o.state.rounder ){ o.state.roundabout.push( index ) }
      }
    } )
  },
  console:()=>
  {
    document.querySelector( '#console' ).innerHTML = ''
  },
  lights:()=>
  {
    // REFRESH
    //
    Array.from( o.page.svg ).map( ( s )=>{ s.classList.remove( 'glw' ) } )

    o.info.area.green.concat( o.info.area.blue ).map( ( name, name_index )=>
    {
      Array.from( o.page.cell ).map( ( cell, cell_index )=>
      {
        let cell_name = cell.innerHTML.substring( 0, 1 )
        cell_name += cell.innerHTML.substring( 2, 4 )

        if( name === cell_name ){ cell.classList.remove( 'glw' ) }
      } )
    } )

    // INITIAL SETUP
    //
    const side =
    {
      team:o.state.now === 'gre'
      ? o.state.team.green
      : o.state.now === 'blu'
      ? o.state.team.blue
      : 0,
      area:o.state.now === 'gre'
      ? o.info.area.green
      : o.state.now === 'blu'
      ? o.info.area.blue
      : 0,
    }

    // END
    //
    if( side.team !== 0 )
    {
      side.team.map( ( n )=>{ o.page.svg[ n ].classList.add( 'glw' ) } )

      side.area.map( ( name, name_index )=>
      {
        Array.from( o.page.cell ).map( ( cell, cell_index )=>
        {
          let cell_name = cell.innerHTML.substring( 0, 1 )
          cell_name += cell.innerHTML.substring( 2, 4 )

          if( name === cell_name ){ cell.classList.add( 'glw' ) }
        } )
      } )
    }
  },
}
