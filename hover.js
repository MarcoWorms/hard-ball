
"use strict"

o.hover = addEventListener( "mouseover", ( event )=>
{
  if( o.state.lock.main )
  {
    if( event.target.id === "ball" )
    {
      o.zone.origin( "ball" )
    }
    else if( event.target.id.substring( 0, 1 ) === "T" ) // athlete
    {
      o.zone.origin( Number( event.target.id.substring( 1, 3 ) ) )
    }
    else if( o.state.selected )
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
