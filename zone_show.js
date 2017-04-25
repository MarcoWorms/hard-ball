
'use strict'

o.zone_show =
{
  begin:()=> // define who is being displayed
  {
    o.zone_show.step_1()

    if( o.state.hovered !== null )      { o.state.displayed = o.state.hovered }
    else if( o.state.selected !== null ){ o.state.displayed = o.state.selected }
    else                                { o.sate.displayed = null }
  },
  step_1:()=> // refresh zones
  {
    Array.from( o.page.zone ).map( ( zone, index )=>
    {
      zone.style.display = 'none'
      o.state.zone[ index ] = { x:null, y:null }
    } )
  },
  step_2:()=> // setup coordinates
  {
    if( o.state.displayed === 'ball' )
    {
      // tbd
    }
    else if( typeof( o.state.displayed ) === 'number' )
  },
  step_3:()=>
  {
    // tbd
  },
  step_4:()=>
  {
    // tbd
  },
  step_5:()=>
  {
    // tbd
  },
}
