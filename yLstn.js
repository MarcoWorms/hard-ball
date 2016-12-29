
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
    // 03 . Select an athlete
    //
    else if( $.target.id.substring( 0, 3 ) === 'min' )
    {
      let newAthlete = Number( $.target.id.substring( 4, 6 ) ) // 0 to 19

      if( Ω.now.athlete[ newAthlete ][ 2 ] === Ω.now.currentPlayer
      || Ω.now.athlete[ newAthlete ][ 2 ] === 'none' )
      {
        Ω.now.selected = newAthlete
        Ω.info.currentlyDisplayed = Ω.now.selected
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // 04 . Select the ball
    //
    else if( $.target.id === 'ball' )
    {
      Ω.now.selected = 'ball'
      Ω.info.currentlyDisplayed = Ω.now.selected
    }

    ////////////////////////////////////////////////////////////////////////////
    // 05 . Click on a zone
    //
    // It's important to note that its only possible to click a zone when the
    // ball or some athlete is selected
    //
    else if( $.target.id.substring( 0, 3 ) === 'zon' ) // target is a zone
    {
      let zone = Number( $.target.id.substring( 3, 5 ) ) // zone's number
      let zoneIndex = Ω.info.target[ 1 ].indexOf( zone )

      let zoneX = Ω.info.zone[ zone ][ 0 ]
      let zoneY = Ω.info.zone[ zone ][ 1 ]

      let coordinate = Ω.tool.convert( [ zoneX, zoneY ] )

      let changeTurn = false

      //========================================================================
      // Has a target
      //
      if( zoneIndex !== -1 )
      {
        let zoneTarget = Ω.info.target[ 0 ][ zoneIndex ] // 'ball' or 0 to 19

         // Targeted ball was clicked
         //
        if( zoneTarget === 'ball' )
        {
          console.log( 'ball' )
        }

        // Targeted athlete was clicked
        //
        else
        {
          let targetColor = Ω.now.athlete[ zoneTarget ][ 2 ]
          let selectedColor = Ω.now.athlete[ Ω.now.selected ][ 2 ]

          // Friendly target
          //
          if( targetColor === selectedColor )
          {
            console.log( 'friend' )
          }

          // Opponent target
          //
          else
          {
            console.log( 'opponent' )
          }
        }
      }

      //========================================================================
      // Hasn't a target
      //
      else
      {
        //......................................................................
        // Ball is selected
        //
        if( Ω.now.selected === 'ball' )
        {
          // tbd (ball goes to 1 of the 8 cells around its player)
        }

        //......................................................................
        // Athlete is selected
        //
        else
        {
          // Setting variables
          //
          let color
          let team
          let spawn

          // Zone is green
          //
           if( Ω.now.spawn.green.indexOf( coordinate ) !== -1 )
          {
            color = 'gre'
            team = Ω.now.team.green
            spawn = Ω.now.spawn.green
          }

          // Zone is blue
          //
          else if( Ω.now.spawn.blue.indexOf( coordinate ) !== -1 )
          {
            color = 'blu'
            team = Ω.now.team.blue
            spawn = Ω.now.spawn.blue
          }

          // Set the new athlete's new position
          //
          if( Ω.now.turn === 0
          //
          || Ω.now.turn < 8
          && Ω.now.currentPlayer === color
          && Ω.now.athlete[ Ω.now.selected ][ 2 ] === 'none'
          //
          || Ω.now.turn > 7
          && Ω.now.currentPlayer === Ω.now.athlete[ Ω.now.selected ][ 2 ] )
          {
            // Change the selected athlete's X and Y values
            //
            Ω.now.athlete[ Ω.now.selected ][ 0 ] = zoneX + 1
            Ω.now.athlete[ Ω.now.selected ][ 1 ] = zoneY + 1

            // Move on
            //
            changeTurn = true
          }

          // Set who's the first player of the match
          //
          if( Ω.now.turn === 0 ) Ω.now.firstPlayer = color

          // Set initial standards
          //
          if( Ω.now.turn === 0
          //
          || Ω.now.turn < 8
          && Ω.now.currentPlayer === color
          && Ω.now.athlete[ Ω.now.selected ][ 2 ] === 'none' )
          {
            // Assign athlete to a team
            //
            Ω.now.athlete[ Ω.now.selected ][ 2 ] = color

            // Remove this from the array of vacant initial cells
            //
            Ω.tool.remove( coordinate, spawn )

            // Update the team's formation array
            //
            team.push( Ω.now.selected )
          }
        }
      }

      // Ending 
      //
      if( changeTurn )
      {
        Ω.game.updTrn()
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // 06 . Select nothing
    //
    else
    {
      Ω.now.selected = 'none'
      Ω.info.currentlyDisplayed = Ω.now.selected
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
    Ω.now.hovered = 'none'

    ////////////////////////////////////////////////////////////////////////////
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

    ////////////////////////////////////////////////////////////////////////////
    // 00 . Hover some athlete that is not targeted
    //
    if( $.target.id.substring( 0, 3 ) === 'min' ) // if target is an athlete
    {
      let digit = Number( $.target.id.substring( 4, 6 ) ) // athlete's number

      if( Ω.info.target[ 0 ].indexOf( digit ) === -1 ) // and it isn't a target
      {
        Ω.now.hovered = digit // 'none' or 0 to 19
        Ω.info.currentlyDisplayed = Ω.now.hovered
      }

      //========================================================================
      // Hover color effects . Part 2 . Change the color of hovered athlete
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

      if( Ω.now.selected === 'ball' )
      {
        Ω.info.currentlyDisplayed = Ω.now.hovered
      }
      else if( Ω.now.selected !== 'none' ) // athlete
      {
        Ω.now.hovered = Ω.now.selected
        Ω.info.currentlyDisplayed = Ω.now.hovered
      }

      //========================================================================
      // Hover color effects . Part 3 . Change the color of hovered ball
      //
      Ω.page.ball.style.backgroundColor = 'rgb(143,111,79)'
    }

    ////////////////////////////////////////////////////////////////////////////
    // 02 . Hover the selection zone
    //
    else if( $.target.id === 'selection' )
    {
      Ω.now.hovered = Ω.now.selected
      Ω.info.currentlyDisplayed = Ω.now.hovered

      //========================================================================
      // Hover color effects . Part 4 . Get whatever is below the selection zone
      //
      if( Ω.info.currentlyDisplayed === 'ball' )
      {
        Ω.page.ball.style.backgroundColor = 'rgb(143,111,79)'
      }
      else if( Ω.info.currentlyDisplayed !== 'none' ) // athlete
      {
        let current = Ω.info.currentlyDisplayed
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
    // 03 . Hover a zone
    //
    else if( $.target.id.substring( 0, 3 ) === 'zon' )
    {
      let zone = Number( $.target.id.substring( 3, 5 ) )
      let zoneIndex = Ω.info.target[ 1 ].indexOf( zone )

      if( zoneIndex !== -1 ) // zone is targeting
      {
        let zoneTarget = Ω.info.target[ 0 ][ zoneIndex ]

        //======================================================================
        // Hover color effects . Part 5 . Get whatever is below the zone
        //
        if( zoneTarget === 'ball' )
        {
          Ω.page.ball.style.backgroundColor = 'rgb(143,111,79)'
        }
        else // athlete
        {
          let color = Ω.now.athlete[ zoneTarget ][ 2 ]
          let lighterColor

          if( color === 'none' ) lighterColor = 'rgb(191,191,191)'
          else if( color === 'red' ) lighterColor = 'rgb(223,63,63)'
          else if( color === 'gre' ) lighterColor = 'rgb(143,191,63)'
          else if( color === 'blu' ) lighterColor = 'rgb(111,79,207)'

          Ω.page.athlete[ zoneTarget ].style.backgroundColor = lighterColor
        }
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // 04 . Hover nothing
    //
    else
    {
      Ω.now.hovered = 'none'

      //========================================================================
      // Hover color effects . Part 6 . Refresh everything again
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
        Ω.info.currentlyDisplayed = Ω.now.selected
      }
      else
      {
        Ω.info.currentlyDisplayed = Ω.now.hovered
      }
    }

  //////////////////////////////////////////////////////////////////////////////
  // END of 'listen.hoverer'
  //
  }, false ),
}
