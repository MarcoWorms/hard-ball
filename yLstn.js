
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
    if( $.target.id.substring( 0, 3 ) === 'zon' ) // target is a zone
    {
      let digit = Number( $.target.id.substring( 3, 5 ) ) // zone's number

      //////////////////////////////////////////////////////////////////////////
      // MAIN MOVE BEHAVIOR
      //
      let athleteColor = Ω.now.athlete[ Ω.now.selected ][ 2 ] // 'gre' or 'blu'
      let turnColor = Ω.now.currentPlayer.substring( 0, 3 ) // 'gre' or 'blu'

      if( Ω.now.turn < 8 // turns 0 to 7
      && athleteColor === 'none' // selected athlete has no team

      || Ω.now.turn > 7 // turns 8+
      && athleteColor !== 'red' // selected athlete is not benched
      && athleteColor === turnColor ) // it is the athlete's team turn
      {
        //======================================================================
        // Change athlete's position through the zone to its new cell
        //
        let x = Ω.info.zone[ digit ][ 0 ]
        let y = Ω.info.zone[ digit ][ 1 ]

        Ω.now.athlete[ Ω.now.selected ][ 0 ] = x + 1
        Ω.now.athlete[ Ω.now.selected ][ 1 ] = y + 1

        //======================================================================
        // Setting initial parameters of each athlete
        //
        if( Ω.now.turn < 8 ) // turns 0 to 7
        {
          let coordinate = Ω.tool.convert( [ x, y ] ) // zone's coordinate
          let spawn // available zone to enter the arena
          let team // which team the athlete will be entered

          //....................................................................
          // Zone is green
          //
          if( Ω.now.spawn.green.indexOf( coordinate ) !== -1 )
          {
            if( Ω.now.turn === 0 ) Ω.now.firstPlayer = 'green'
            Ω.now.athlete[ Ω.now.selected ][ 2 ] = 'gre'
            spawn = Ω.now.spawn.green
            team = Ω.now.team.green
          }

          //....................................................................
          // Zone is blue
          //
          else
          {
            if( Ω.now.turn === 0 ) Ω.now.firstPlayer = 'blue'
            Ω.now.athlete[ Ω.now.selected ][ 2 ] = 'blu'
            spawn = Ω.now.spawn.blue
            team = Ω.now.team.blue
          }

          //....................................................................
          // Update the array of vacant initial cells
          //
          Ω.tool.remove( coordinate, spawn )

          //....................................................................
          // Update the team's formation array
          //
          team.push( Ω.now.selected )
        }

        //======================================================================
        // End turn
        //
        Ω.now.turn += 1
      }
    }

  //////////////////////////////////////////////////////////////////////////////
  // END of 'listen.zoner'
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

      location.reload()
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
      Ω.now.selected = Number( $.target.id.substring( 4, 6 ) ) // 0 to 19
      Ω.info.currentDisplayed = Ω.now.selected
    }

    ////////////////////////////////////////////////////////////////////////////
    // 04 . Select the ball
    //
    else if( $.target.id === 'ball' )
    {
      Ω.now.selected = 'ball'
      Ω.info.currentDisplayed = Ω.now.selected
    }

    ////////////////////////////////////////////////////////////////////////////
    // 05 . Select nothing
    //
    else 
    {
      Ω.now.selected = 'none'
      Ω.info.currentDisplayed = Ω.now.selected
    }

    ////////////////////////////////////////////////////////////////////////////
    // EXTRA . Updating the position of the selection zone
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
    ////////////////////////////////////////////////////////////////////////////
    // 00 . Hover some athlete that is not targeted
    //
    if( $.target.id.substring( 0, 3 ) === 'min' ) // if target is an athlete
    {
      let digit = Number( $.target.id.substring( 4, 6 ) ) // athlete's number

      if( Ω.info.target.indexOf( digit ) === -1 ) // and it isn't a target
      {
        Ω.now.hovered = digit // 'none' or 0 to 19
        Ω.info.currentDisplayed = Ω.now.hovered
      }

      //========================================================================
      // Hover color effects . Part 1 . Refresh everything
      //
      Ω.page.ball.style.backgroundColor = 'rgb(111,79,47)'

      for( let $ = 0; $ < 20; $ ++ )
      {
        let athlete = Ω.now.athlete[ $ ]
        let newColor = Ω.now.athlete[ $ ][ 2 ]
        let darkerColor

        if( newColor === 'none' ) darkerColor = 'rgb(143,143,143)'
        else if( newColor === 'red' ) darkerColor = 'rgb(207,47,47)'
        else if( newColor === 'gre' ) darkerColor = 'rgb(127,175,47)'
        else if( newColor === 'blu' ) darkerColor = 'rgb(95,63,191)'

        Ω.page.athlete[ $ ].style.backgroundColor = darkerColor
      }

      //========================================================================
      // Hover color effects . Part 2 . Change the color of hovered
      //
      let color =  Ω.now.athlete[ digit ][ 2 ]

      let lighterColor

      if( color === 'none' ) lighterColor = 'rgb(191,191,191)'
      else if( color === 'red' ) lighterColor = 'rgb(223,63,63)'
      else if( color === 'gre' ) lighterColor = 'rgb(143,191,63)'
      else if( color === 'blu' ) lighterColor = 'rgb(111,79,207)'

      Ω.page.athlete[ digit ].style.backgroundColor = lighterColor
    }

    ////////////////////////////////////////////////////////////////////////////
    // 01 . Hover the ball
    //
    else if( $.target.id === 'ball' )
    {
      Ω.now.hovered = 'ball'
      Ω.info.currentDisplayed = Ω.now.hovered

      //========================================================================
      // Hover color effects
      //
      Ω.page.ball.style.backgroundColor = 'rgb(143,111,79)'
    }

    ////////////////////////////////////////////////////////////////////////////
    // 02 . Hover the selection zone
    //
    else if( $.target.id === 'selection' )
    {
      Ω.now.hovered = Ω.now.selected
      Ω.info.currentDisplayed = Ω.now.hovered

      //========================================================================
      // Hover color effects
      //
      if( Ω.info.currentDisplayed === 'ball' )
      {
        Ω.page.ball.style.backgroundColor = 'rgb(143,111,79)'
      }
      else if( Ω.info.currentDisplayed !== 'none' ) // athlete
      {
        let current = Ω.info.currentDisplayed
        let color = Ω.now.athlete[ current ][ 2 ]
        let lighterColor

        if( color === 'none' ) lighterColor = 'rgb(191,191,191)'
        else if( color === 'red' ) lighterColor = 'rgb(223,63,63)'
        else if( color === 'gre' ) lighterColor = 'rgb(143,191,63)'
        else if( color === 'blu' ) lighterColor = 'rgb(111,79,207)'

        Ω.page.athlete[ current ].style.backgroundColor = lighterColor
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // 03 . Hover nothing
    //
    else
    {
      Ω.now.hovered = 'none'

      //========================================================================
      // Hover color effects . Part 3 . Refresh everything again
      //
      Ω.page.ball.style.backgroundColor = 'rgb(111,79,47)'

      for( let $ = 0; $ < 20; $ ++ )
      {
        let athlete = Ω.now.athlete[ $ ]
        let newColor = Ω.now.athlete[ $ ][ 2 ]
        let darkerColor

        if( newColor === 'none' ) darkerColor = 'rgb(143,143,143)'
        else if( newColor === 'red' ) darkerColor = 'rgb(207,47,47)'
        else if( newColor === 'gre' ) darkerColor = 'rgb(127,175,47)'
        else if( newColor === 'blu' ) darkerColor = 'rgb(95,63,191)'

        Ω.page.athlete[ $ ].style.backgroundColor = darkerColor
      }

      //========================================================================
      // Hovering nothing is tricky and must be safeguarded by this condition
      //
      if( Ω.now.selected !== 'none' ) // could be any athlete or the ball
      {
        Ω.info.currentDisplayed = Ω.now.selected
      }
      else
      {
        Ω.info.currentDisplayed = Ω.now.hovered
      }
    }

  //////////////////////////////////////////////////////////////////////////////
  // END of 'listen.hoverer'
  //
  }, false ),
}
