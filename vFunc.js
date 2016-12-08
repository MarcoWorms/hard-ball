
'use strict'

//////////////////////////////////////////////////////////////////////////////// GLOBALS
//
// GAME EXTRA LISTEN TEXT PAGE ATOZ INFO TEXT EVENT CHANGE STATE ENGINE

//////////////////////////////////////////////////////////////////////////////// GAME
//
const game =
{
  ////////////////////////////////////////////////////////////////////////////// G.create
  //
  create: () =>
  {
    if( change.turn === 0 )
    {
      for( let $ = 0; $ < 20; $ ++ )
      {
        change.athlete[ $ ][ 0 ] = info.gps[ 12 ][ $ ][ 0 ] + 1
        change.athlete[ $ ][ 1 ] = info.gps[ 12 ][ $ ][ 1 ] + 1
      }
    }
  },

  ////////////////////////////////////////////////////////////////////////////// G.update
  //
  update: () =>
  {
    //==========================================================================
    // Updating athletes' positions
    //
    for( let $ = 0; $ < 20; $ ++ )
    {
      let x = change.athlete[ $ ][ 0 ]
      let y = change.athlete[ $ ][ 1 ]

      page.athlete[ $ ].style.transform = 'translate(' + x + 'px,' + y + 'px)'
    }
  },
}

//////////////////////////////////////////////////////////////////////////////// EXTRA
//
const extra =
{
  ////////////////////////////////////////////////////////////////////////////// E.hasCls
  // Check for a class in any HTML element
  //
  hasCls: function( object, klass )
  {
    return !!object.className.match( klass ) // TRUE or FALSE
  },

  ////////////////////////////////////////////////////////////////////////////// E.chgCls
  // Adds or removes a class in any HTML element
  //
  chgCls: function( object, klass, action )
  {
    if( !extra.hasCls( object, klass ) && action === "add" )
    {
      object.classList.add( klass );
    }
    else if( extra.hasCls( object, klass ) && action === "rmv" )
    {
      object.classList.remove( klass )
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
      extra.chgCls( page.reset, 'btn', 'rmv' )
      extra.chgCls( page.reset, 'dsp', 'add' )

      page.yes.style.display = 'flex'
      page.no.style.display = 'flex'
    }

    ////////////////////////////////////////////////////////////////////////////
    // FINISH resetting the game
    //
    if( $.target.id === 'yes' )
    {
      page.reset.innerHTML = 'RESET'
      page.reset.style.width = '25%'
      extra.chgCls( page.reset, 'dsp', 'rmv' )
      extra.chgCls( page.reset, 'btn', 'add' )

      page.yes.style.display = 'none'
      page.no.style.display = 'none'

      change = JSON.parse( localStorage.getItem( '0' ) )
      game.create()
    }

    ////////////////////////////////////////////////////////////////////////////
    // STOP resetting the game
    //
    if( $.target.id === 'no' )
    {
      page.reset.innerHTML = 'RESET'
      page.reset.style.width = '25%'
      extra.chgCls( page.reset, 'dsp', 'rmv' )
      extra.chgCls( page.reset, 'btn', 'add' )

      page.yes.style.display = 'none'
      page.no.style.display = 'none'
    }

  //////////////////////////////////////////////////////////////////////////////
  // END of L.clicker
  //
  }, false ),

  ////////////////////////////////////////////////////////////////////////////// L.presser
  // Every PRESS is identified here
  //
  presser: document.addEventListener( 'keydown', ( $ ) =>
  {
    // console.log( $ )

  //////////////////////////////////////////////////////////////////////////////
  // END of L.presser
  //
  }, false ),
}
