
'use strict'

//////////////////////////////////////////////////////////////////////////////// GLOBALS
//
// TOOL LISTEN GAME MESSAGE PAGE LTOA INFO TEXT EVENT CHANGE STATE ENGINE

//////////////////////////////////////////////////////////////////////////////// TOOL
//
const tool =
{
  ////////////////////////////////////////////////////////////////////////////// E.hasCls
  // Check for a class in any HTML element
  //
  hasCls: function( element, klass )
  {
    return !!element.className.match( klass ) // TRUE or FALSE
  },

  ////////////////////////////////////////////////////////////////////////////// E.chgCls
  // Adds or removes a class in any HTML element
  //
  chgCls: function( element, klass, action )
  {
    if( !tool.hasCls( element, klass ) && action === "add" )
    {
      element.classList.add( klass );
    }
    else if( tool.hasCls( element, klass ) && action === "rmv" )
    {
      element.classList.remove( klass )
    }
    else
    {
      console.log( "You shall not class!" )
    }
  },
}

//////////////////////////////////////////////////////////////////////////////// LISTEN
//
const listen =
{
  ////////////////////////////////////////////////////////////////////////////// L.clicker
  // Every CLICK is identified here
  //
  clicker: document.addEventListener( 'mousedown', ( $ ) =>
  {
    // console.log( $ )

    ////////////////////////////////////////////////////////////////////////////
    // START resetting the game
    //
    if( $.target.id === 'reset' )
    {
      page.reset.innerHTML = 'REALLY ?'
      page.reset.style.width = '12.5%'

      tool.chgCls( page.reset, 'btn', 'rmv' )
      tool.chgCls( page.reset, 'dsp', 'add' )
      page.yes.style.display = 'flex'
      page.no.style.display = 'flex'
    }

    ////////////////////////////////////////////////////////////////////////////
    // FINISH resetting the game
    //
    else if( $.target.id === 'yes' )
    {
      page.reset.innerHTML = 'RESET'
      page.reset.style.width = '25%'
      tool.chgCls( page.reset, 'dsp', 'rmv' )
      tool.chgCls( page.reset, 'btn', 'add' )

      page.yes.style.display = 'none'
      page.no.style.display = 'none'

      change = JSON.parse( localStorage.getItem( '0' ) )
      game.create()
    }

    ////////////////////////////////////////////////////////////////////////////
    // STOP resetting the game
    //
    else if( $.target.id === 'no' )
    {
      page.reset.innerHTML = 'RESET'
      page.reset.style.width = '25%'
      tool.chgCls( page.reset, 'dsp', 'rmv' )
      tool.chgCls( page.reset, 'btn', 'add' )

      page.yes.style.display = 'none'
      page.no.style.display = 'none'
    }
  }, false ),

  ////////////////////////////////////////////////////////////////////////////// L.hoverer
  // Tells if the mouse entered any given athlete
  //
  hoverer: document.addEventListener( 'mouseover', ( $ ) =>
  {
    if( info.athlete.indexOf( $.target.id ) !== -1 )
    {
      change.now = Number( $.target.id.substring( 4, 6 ) )
      game.updZon()
    }
    else
    {
      change.now = 'none'
      game.updZon()
    }
  }, false ),

  ////////////////////////////////////////////////////////////////////////////// L.presser
  // Every PRESS is identified here
  //
  presser: document.addEventListener( 'keydown', ( $ ) =>
  {
    // console.log( $ )

    ////////////////////////////////////////////////////////////////////////////
    // CLEAR local storage
    //
    if( $.key === 'Escape' )
    {
      console.log( localStorage )
      localStorage.clear()
      console.log( localStorage )
    }
  }, false ),
}
