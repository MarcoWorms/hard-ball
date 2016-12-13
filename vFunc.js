
'use strict'

//////////////////////////////////////////////////////////////////////////////// GLOBALS
//
// TOOL TIMER LISTEN GAME MESSAGE PAGE LTOA INFO TEXT EVENT CHANGE STATE ENGINE

//////////////////////////////////////////////////////////////////////////////// TOOL
//
const tool =
{
  ////////////////////////////////////////////////////////////////////////////// E.translate
  //
  translate: function( entity, x, y )
  {
    entity.style.transform = 'translate(' + x + 'px,' + y + 'px)'
  },

  ////////////////////////////////////////////////////////////////////////////// E.rotate
  //
  rotate: function( entity, speed )
  {
    entity.style.transform += ' rotate(' + timer.spin[ 0 ] * speed + 'deg)'
  },

  ////////////////////////////////////////////////////////////////////////////// E.hasCls
  // Check for a class in any HTML object
  //
  hasCls: function( entity, klass )
  {
    return !!entity.className.match( klass ) // TRUE or FALSE
  },

  ////////////////////////////////////////////////////////////////////////////// E.chgCls
  // Adds or removes a class in any HTML object
  //
  chgCls: function( entity, klass, action )
  {
    if( !tool.hasCls( entity, klass ) && action === "add" )
    {
      entity.classList.add( klass );
    }
    else if( tool.hasCls( entity, klass ) && action === "rmv" )
    {
      entity.classList.remove( klass )
    }
    else
    {
      console.log( "You shall not class!" )
    }
  },
}

//////////////////////////////////////////////////////////////////////////////// TIMER
//
const timer =
{
  spin: [ 0, setInterval( function()
    {
      if( timer.spin[ 0 ] > 359 ) timer.spin[ 0 ] = 0
      else                        timer.spin[ 0 ] ++
    }, 10 ) ],
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

      change.selected = 'none'
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
      change.hovered = Number( $.target.id.substring( 4, 6 ) )

      game.updZonCdn()

      console.log( change.hovered + ' . ' + change.athlete[ change.hovered ] )
    }
    else
    {
      change.hovered = 'none'

      console.log( $.target.id )
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
      localStorage.clear()
      engine.create()
    }
  }, false ),
}
