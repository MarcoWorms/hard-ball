
"use strict"

o.click = addEventListener( "mousedown", ( event )=>
{
  if( o.state.lock.main )
  {
    // PART 1
    //
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

    // PART 2
    //
    else if( event.target.id === "ball" )
    {
      o.state.selected = "ball"
      o.update.selection( "ball" )
      o.update.zone( "ball" )
    }
    else if( event.target.id === "trigger" )
    {
      // tbd
    }
    else if( event.target.id.substring( 0, 1 ) === "T" )
    {
      const number = Number( event.target.id.substring( 1, 3 ) )
      o.state.selected = number
      o.update.selection( number )
      o.update.zone( number )
    }
    else
    {
      o.state.selected = null
      o.update.selection( null )
      o.update.zone( null )
    }
  }
},
false )
