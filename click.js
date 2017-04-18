
"use strict"

o.click = addEventListener( "mousedown", ( event )=>
{
  if( o.state.lock.main )
  {
    ////////////////////////////////////////////////////////////////////////////
    //
    if( event.target.id === "reset" )
    {
      o.tool.reset( null )
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

    ////////////////////////////////////////////////////////////////////////////
    //
    else if( event.target.id === "ball" )
    {
      if( o.state.ball.x !== 456 )
      {
        o.state.selected = "ball"
        o.update.selection( "ball" )
        o.update.origin( "ball" )
      }
    }
    else if( event.target.id === "trigger" )
    {
      // tbd
    }
    else if( event.target.id.substring( 0, 1 ) === "T" ) // athlete
    {
      const number = Number( event.target.id.substring( 1, 3 ) )
      o.state.selected = number
      o.update.selection( number )
      o.update.origin( number )
    }
    else if( event.target.id === "selection" )
    {
      o.update.selection( o.state.selected )
      o.update.origin( o.state.selected )
    }
    else
    {
      o.state.selected = null
      o.update.selection( null )
      o.update.origin( null )
    }
  }
},
false )
