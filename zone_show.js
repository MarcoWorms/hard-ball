
'use strict'

o.zone_show =
{
  begin:()=>
  {
    // UPDATES
    //
    if( o.state.turn > 0 )
    {
      o.update.now()

      if( o.state.turn > 7 )
      {
        // tbd
      }
    }

    // SET DISPLAYED
    //
    if( o.state.hovered !== null )      { o.state.displayed = o.state.hovered }
    else if( o.state.selected !== null ){ o.state.displayed = o.state.selected }
    else                                { o.state.displayed = null }

    // CALL STEPS
    //
    o.zone_show.refresh()
    o.zone_show.step_1()
    o.zone_show.step_2()
  },
  step_1:()=>
  {
    if( o.state.displayed === 'ball' )
    {
      if( o.state.ball.x === 456 )
      {
        o.zone_show.coordinate( 'center', null, null )
      }
      else if( o.state.holder !== null )
      {
        o.zone_show.coordinate( 'matrix', o.state.holder, 18 )
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
          if( o.state.turn === 0 )
          {
            o.zone_show.coordinate( 'start', null, null )
          }
          else
          {
            o.zone_show.coordinate( 'place', null, null )
          }
        }
        else
        {
          o.zone_show.coordinate( 'replace', null, null )
        }
      }
      else // playing
      {
        if( o.state.rounder !== null )
        {
          o.zone_show.coordinate( 'matrix', ath_num, 18 )
        }
        else
        {
          o.zone_show.coordinate( 'matrix', ath_num, ath_num )
        }
      }
    }
  },
  step_2:()=>
  {
    // tbd
  },
  refresh:()=>
  {
    Array.from( o.page.zone ).map( ( zone, index )=>
    {
      zone.style.display = 'none'
      o.state.zone[ index ] = { x:null, y:null }
    } )
  },
  coordinate:( alfa, beta, gama )=>
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
    const both_spawns = o.state.spawn.green.concat( o.state.spawn.blue )

    let list

    if( alfa === 'center' ){ list = o.info.center }
    else if( alfa === 'start' ){ list = both_spawns }
    else if( alfa === 'place' ){ list = spawn }
    else if( alfa === 'replace' ){ list = team }
    else if( alfa === 'matrix' )
    {
      const origin = beta
      const matrix = gama

      // tbd
    }

    // WRITE COORDINATES
    //
    list.map( ( name, index )=>
    {
      const coord = o.tool.convert( name, null )
      o.state.zone[ index ] = { x:coord.x, y:coord.y }
    } )
  },
  template:()=>
  {
    // tbd
  },
}
