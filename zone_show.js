
'use strict'

o.zone_show =
{
  begin:()=> // define who is being displayed
  {
    if( o.state.hovered !== null )      { o.state.displayed = o.state.hovered }
    else if( o.state.selected !== null ){ o.state.displayed = o.state.selected }
    else                                { o.state.displayed = null }

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
        if( o.state.turn < 8 ) // enter
        {
          if( o.state.turn === 0 )
          {
            // tbd
          }

          // tbd
        }
        else // replace
        {
          // tbd
        }
      }
      else // playing
      {
        if( o.state.rounder !== null ) // rounding
        {
          o.zone_show.coordinate( 'matrix', ath_num, 18 )
        }
        else // not rounding
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
  coordinate:( condition, alfa, beta )=>
  {
    if( condition === 'center' )
    {
      o.info.center.map( ( name, index )=>
      {
        const coord = o.tool.convert( name, null )
        o.state.zone[ index ] = { x:coord.x, y:coord.y }
      } )
    }
    else if( condition === 'matrix' )
    {
      const origin = alfa
      const matrix = beta
    }
  },
  template:()=>
  {
    // tbd
  },
}
