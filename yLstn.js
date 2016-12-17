
'use strict'

//////////////////////////////////////////////////////////////////////////////// LISTEN
// Tracks actions in the game
//
Ω.listen =
{
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
      Ω.tool.chgCls( Ω.page.reset, 'btn', 'rmv' )
      Ω.tool.chgCls( Ω.page.reset, 'dsp', 'add' )

      Ω.page.yes.style.display = 'flex'
      Ω.page.no.style.display = 'flex'
    }

    //==========================================================================
    // 01 . FINISH resetting the game
    //
    else if( $.target.id === 'yes' )
    {
      Ω.page.reset.innerHTML = 'RESET'
      Ω.page.reset.style.width = '25%'
      Ω.tool.chgCls( Ω.page.reset, 'dsp', 'rmv' )
      Ω.tool.chgCls( Ω.page.reset, 'btn', 'add' )

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

    //==========================================================================
    // 02 . STOP resetting the game
    //
    else if( $.target.id === 'no' )
    {
      Ω.page.reset.innerHTML = 'RESET'
      Ω.page.reset.style.width = '25%'
      Ω.tool.chgCls( Ω.page.reset, 'dsp', 'rmv' )
      Ω.tool.chgCls( Ω.page.reset, 'btn', 'add' )

      Ω.page.yes.style.display = 'none'
      Ω.page.no.style.display = 'none'
    }

    ////////////////////////////////////////////////////////////////////////////
    // 03 . Select some athlete
    //
    else if( $.target.id.substring( 0, 3 ) === 'min' )
    {
      Ω.now.selected = Number( $.target.id.substring( 4, 6 ) ) // 0 to 19
    }

    //==========================================================================
    // 04 . Select the ball
    //
    else if( $.target.id === 'ball' ) Ω.now.selected = 'ball'


    ////////////////////////////////////////////////////////////////////////////
    // 05 . Click on a zone
    //
    else if( $.target.id.substring( 0, 3 ) === 'zon' )
    {
      ////////////////////////////////////////////////////////////////////////////
      // Ball is selected
      //
      if( Ω.now.selected === 'ball' )
      {
        // tbd
      }

      //////////////////////////////////////////////////////////////////////////
      // Athlete is selected
      //
      else if( Ω.now.selected !== 'none' )
      {

        ////////////////////////////////////////////////////////////////////////
        // Athlete is ready
        //
        if( Ω.now.athlete[ Ω.now.selected ][ 1 ] > 555 
          && Ω.now.athlete[ Ω.now.selected ][ 3 ] === 'ready' )
        {

          //====================================================================
          // TURN 0
          //
          if( Ω.now.turn === 0 )
          {
            let entity = Number( $.target.id.substring( 3, 5 ) )

            let x = Ω.info.zone[ entity ][ 0 ]
            let y = Ω.info.zone[ entity ][ 1 ]

            Ω.now.athlete[ Ω.now.selected ][ 0 ] = x
            Ω.now.athlete[ Ω.now.selected ][ 1 ] = y

            Ω.now.turn = 1
          }
        }

        ////////////////////////////////////////////////////////////////////////
        // Athlete is playing
        //
        else
        {
        }
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // 06 . Select nothing
    //
    else
    {
      Ω.now.selected = 'none'
    }

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
