
'use strict'

o.click = addEventListener( 'mousedown', ( event )=>
{
  if( o.state.pass.main )
  {
    ////////////////////////////////////////////////////////////////////////////
    // RESET
    //
    if( event.target.id === 'reset' )
    {
      o.engine.reset( null )
    }
    else if( event.target.id === 'yes'
    && o.page.yes.innerHTML === '!' )
    {
      o.engine.reset( true )
    }
    else if( event.target.id === 'no'
    && o.page.no.innerHTML === '?' )
    {
      o.engine.reset( false )
    }

    ////////////////////////////////////////////////////////////////////////////
    // SELECTION
    //
    else if( o.state.rounder === null
    && o.state.grabber === null
    && event.target.id === 'ball_mask'
    && o.state.ball.x !== 456 )
    {
      o.state.selected = 'ball'
      o.zone_show.begin()
    }
    else if( event.target.id === 'selection' )
    {
      o.zone_show.begin()
    }
    else if( o.state.rounder === null
    && o.state.grabber === null
    && event.target.id.substring( 0, 1 ) === 'A' ) // athlete
    {
      o.state.selected = Number( event.target.id.substring( 1, 3 ) )
      o.zone_show.begin()
    }

    ////////////////////////////////////////////////////////////////////////////
    // GAMEPLAY
    //
    else if( event.target.id.substring( 0, 1 ) === 'Z' ) // zone
    {
      o.zone_click.begin( event )
    }
    else if( event.target.id === 'trigger' )
    {
      // tbd
    }

    ////////////////////////////////////////////////////////////////////////////
    // DESELECTION
    //
    else if( o.state.rounder === null
    && o.state.grabber === null )
    {
      o.zone_show.begin()
    }
  }
},
false )
