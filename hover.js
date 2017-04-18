
"use strict"

o.hover = addEventListener( "mouseover", ( event )=>
{
  if( o.state.lock.main )
  {
    if( event.target.id === "ball" )
    {
      o.update.origin( "ball" )
    }
    else if( event.target.id.substring( 0, 1 ) === "T" ) // athlete
    {
      o.update.origin( Number( event.target.id.substring( 1, 3 ) ) )
    }
    else if( o.state.selected )
    {
      o.update.origin( o.state.selected )
    }
    else
    {
      o.update.origin( null )
    }
  }
},
false )
