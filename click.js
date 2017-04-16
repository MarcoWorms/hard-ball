
"use strict"

o.click = addEventListener( "mousedown", ( event )=>
{
  if( o.state.lock.main )
  {
    if( event.target.id === "reset" )
    {
      o.tool.reset()
    }
    else if( event.target.id === "yes"
    && o.page.yes.innerHTML === "!" )
    {
      o.tool.reset( true )
    }
    else if( event.target.id === "no"
    && o.page.no.innerHTML === "?" )
    {
      o.tool.reset( false )
    }
    else if( event.target.id === "ball" )
    {
      o.state.selected = "ball"
    }
    else if( event.target.id.substring( 0, 1 ) === "T" )
    {
      o.state.selected = Number( event.target.id.substring( 1, 3 ) )
    }
  }
},
false )
