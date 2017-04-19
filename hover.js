
"use strict"

o.hover = addEventListener( "mouseover", ( event )=>
{
  if( o.state.pass.main )
  {
    if( event.target.id === "ball" )
    {
      o.zone.origin( "ball" )
    }
    else if( event.target.id.substring( 0, 1 ) === "A" ) // athlete
    {
      o.zone.origin( Number( event.target.id.substring( 1, 3 ) ) )
    }
    else if( o.state.selected !== null )
    {
      o.zone.origin( o.state.selected )
    }
    else
    {
      o.zone.origin( null )
    }
  }
},
false )
