
"use strict"

o.hover = addEventListener( "mouseover", ( event )=>
{
  if( o.state.lock.main )
  {
    if( event.target.id === "ball" )
    {
      o.state.hovered = "ball"
    }
    else if( event.target.id.substring( 0, 1 ) === "T" )
    {
      o.state.hovered = Number( event.target.id.substring( 1, 3 ) )
    }
  }
},
false )
