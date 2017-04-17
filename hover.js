
"use strict"

o.hover = addEventListener( "mouseover", ( event )=>
{
  if( o.state.lock.main )
  {
    console.log( event.target )
    if( event.target.id === "ball" )
    {
      o.update.zone( "ball" )
    }
    else if( event.target.id.substring( 0, 1 ) === "T" )
    {
      o.update.zone( Number( event.target.id.substring( 1, 3 ) ) )
    }
    else if( o.state.selected !== null )
    {
      o.update.zone( o.state.selected )
    }
    else
    {
      o.update.zone( null )
    }
  }
},
false )
