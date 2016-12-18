
'use strict'

//////////////////////////////////////////////////////////////////////////////// LISTEN
// Tracks actions in the game
//
Ω.listen =
{
  ////////////////////////////////////////////////////////////////////////////// L.zoner
  //
  zoner: addEventListener( 'mousedown', function( $ )
  {
    if( $.target.id.substring( 0, 3 ) === 'zon' )
    {
      let digit = Number( $.target.id.substring( 3, 5 ) )

      //////////////////////////////////////////////////////////////////////////
      // Turn 0 to 7
      //
      if( Ω.now.turn < 8 && Ω.now.athlete[ digit ][ 2 ] === 'none' )
      {
        ////////////////////////////////////////////////////////////////////////
        // Position
        //
        let x = Ω.info.zone[ digit ][ 0 ]
        let y = Ω.info.zone[ digit ][ 1 ]

        Ω.now.athlete[ Ω.now.selected ][ 0 ] = x + 1
        Ω.now.athlete[ Ω.now.selected ][ 1 ] = y + 1

        ////////////////////////////////////////////////////////////////////////
        // Color and defining cell is now occupied
        //
        let coordinate = Ω.tool.convert( [ x, y ] )
        let entity

        if( Ω.now.spawn.green.indexOf( coordinate ) !== -1 ) // zone is green
        {
          Ω.now.athlete[ Ω.now.selected ][ 2 ] = 'gre'
          if( Ω.now.turn === 0 ) Ω.now.firstPlayer = 'green'
          entity = Ω.now.spawn.green
        }
        else
        {
          Ω.now.athlete[ Ω.now.selected ][ 2 ] = 'blu'
         if( Ω.now.turn === 0 ) Ω.now.firstPlayer = 'blue'
          entity = Ω.now.spawn.blue
        }

        Ω.tool.remove( coordinate, entity )

        ////////////////////////////////////////////////////////////////////////
        // Extra
        //
        Ω.now.turn += 1
      }
    }

  //////////////////////////////////////////////////////////////////////////////
  // END of 'listen.clicker'
  //
  }, false ),

  ////////////////////////////////////////////////////////////////////////////// L.clicker
  //
  clicker: addEventListener( 'mousedown', function( $ )
  {
    ////////////////////////////////////////////////////////////////////////////
    // 00 . START resetting the game
    //
    if( $.target.id === 'reset' )
    {
      Ω.page.reset.innerHTML = 'REALLY ?'
      Ω.page.reset.style.width = '12.5%'
      Ω.tool.chgCls( Ω.page.reset, '-', 'btn' )
      Ω.tool.chgCls( Ω.page.reset, '+', 'dsp' )

      Ω.page.yes.style.display = 'flex'
      Ω.page.no.style.display = 'flex'
    }

    ////////////////////////////////////////////////////////////////////////////
    // 01 . FINISH resetting the game
    //
    else if( $.target.id === 'yes' )
    {
      Ω.page.reset.innerHTML = 'RESET'
      Ω.page.reset.style.width = '25%'
      Ω.tool.chgCls( Ω.page.reset, '-', 'dsp' )
      Ω.tool.chgCls( Ω.page.reset, '+', 'btn' )

      Ω.page.yes.style.display = 'none'
      Ω.page.no.style.display = 'none'

      //========================================================================
      // Actual RESET
      //
      Ω.now = JSON.parse( localStorage.getItem( 'first' ) )
      // Only way to recover the original state

      localStorage.removeItem( 'last' )
      // So it does not trigger load below

      Ω.engine.create()
    }

    ////////////////////////////////////////////////////////////////////////////
    // 02 . STOP resetting the game
    //
    else if( $.target.id === 'no' )
    {
      Ω.page.reset.innerHTML = 'RESET'
      Ω.page.reset.style.width = '25%'
      Ω.tool.chgCls( Ω.page.reset, '-', 'dsp' )
      Ω.tool.chgCls( Ω.page.reset, '+', 'btn' )

      Ω.page.yes.style.display = 'none'
      Ω.page.no.style.display = 'none'
    }

    ////////////////////////////////////////////////////////////////////////////
    // 03 . Select some athlete
    //
    else if( $.target.id.substring( 0, 3 ) === 'min' )
    {
      //========================================================================
      //
      Ω.now.selected = Number( $.target.id.substring( 4, 6 ) ) // 0 to 19
    }

    ////////////////////////////////////////////////////////////////////////////
    // 04 . Select the ball
    //
    else if( $.target.id === 'ball' ) Ω.now.selected = 'ball'

    ////////////////////////////////////////////////////////////////////////////
    // 05 . Select nothing
    //
    else Ω.now.selected = 'none'

    ////////////////////////////////////////////////////////////////////////////
    // EXTRA
    //
    Ω.game.updSel() // Updated here to preserve animation

  //////////////////////////////////////////////////////////////////////////////
  // END of 'listen.clicker'
  //
  }, false ),

  ////////////////////////////////////////////////////////////////////////////// L.hoverer
  //
  hoverer: addEventListener( 'mouseover', function( $ )
  {
    Ω.now.hovered = 'none'

    ////////////////////////////////////////////////////////////////////////////
    // 00 . Hover some athlete
    //
    if( $.target.id.substring( 0, 3 ) === 'min' )
    {
      //========================================================================
      //
      Ω.now.hovered = Number( $.target.id.substring( 4, 6 ) ) // 0 to 19
    }

    ////////////////////////////////////////////////////////////////////////////
    // 01 . Hover the ball
    //
    else if( $.target.id === 'ball' ) Ω.now.hovered = 'ball'

  //////////////////////////////////////////////////////////////////////////////
  // END of 'listen.hoverer'
  //
  }, false ),
}
