
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
      Ω.page.reset.style.width = '15%'
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
      // Preparation to avoid visual strange behavior
      //
      Array.from( Ω.page.animate1 ).forEach( function( $ )
      {
        $.style.transition = ''
        $.style.display = 'none'
      } )

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
      // Because nothing is selectable during roundabouting
      //
      if( Ω.now.rounding[ 0 ] === 'none' )
      {
        // Refreshing
        //
        Ω.info.marked = []

        // Start process
        //
        let newAthlete = Number( $.target.id.substring( 4, 6 ) ) // 0 to 19

        // If the athlete wasn't replaced this match
        //
        if( Ω.now.outed.indexOf( newAthlete ) === -1 )
        {
          // Say it is selected and displayed
          //
          Ω.now.selected = newAthlete
          Ω.now.displayed = Ω.now.selected

          // Make a list of which athletes cannot be hovered nor selected
          //
          Ω.info.marked = Ω.info.target[ 0 ]
        }
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // 04 . Select the ball
    //
    else if( $.target.id === 'ball' )
    {
      // Because nothing is selectable during roundabouting
      //
      if( Ω.now.rounding[ 0 ] === 'none' )
      {
        Ω.now.selected = 'ball'
        Ω.now.displayed = Ω.now.selected
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // 05 . Click on a zone
    //
    // It's important to note that its only possible to click a zone when the
    // ball or some athlete is selected
    //
    else if( $.target.id.substring( 0, 3 ) === 'zon' // target is a zone
    && !Ω.now.lock ) // game is not locked
    {
      // Lock the game
      //
      Ω.now.lock = true

      // Don't change turns just yet
      //
      let changeTurn = false

      // Check which is the zone clicked
      //
      let zone = Number( $.target.id.substring( 3, 5 ) )

      // Check where and if the zone is targeting something
      //
      let zoneIndex = Ω.info.target[ 1 ].indexOf( zone )

      // Check what the target, if any, is
      //
      let zoneTarget = Ω.info.target[ 0 ][ zoneIndex ] // 'ball' or 0 to 19

      // Check the zone's coordinate
      //
      let zoneX = Ω.info.zone[ zone ][ 0 ]
      let zoneY = Ω.info.zone[ zone ][ 1 ]

      let coordinate = Ω.tool.convert( [ zoneX, zoneY ] )

      // Preserve the athlete's old coordinates
      //
      let oldAthleteX = Ω.now.athlete[ Ω.now.selected ][ 0 ]
      let oldAthleteY = Ω.now.athlete[ Ω.now.selected ][ 1 ]

      //========================================================================
      // Has a target
      //
      if( zoneIndex !== -1 )
      {
        //......................................................................
        // Athlete is selected
        //
        if( Ω.now.selected !== 'ball' )
        {
          //....................................................................
          // Targeted ball was clicked
          //
          if( zoneTarget === 'ball' )
          {
            // tbd
          }

          //....................................................................
          // Targeted athlete was clicked
          //
          else
          {
            let targetIndex = Ω.info.target[ 1 ].indexOf( zone )
            let targeted = Ω.info.target[ 0 ][ targetIndex ]

            let athleteColor = Ω.now.athlete[ Ω.now.selected ][ 2 ]

            // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            // Check the amount of replacements available to the current team
            //
            let reps

            if( Ω.now.currentPlayer === 'gre' ) reps = Ω.now.reps.green
            else                                reps = Ω.now.reps.blue

            // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            // Actually push another athlete
            //
            if( Ω.info.blocked.indexOf( zone ) === -1 // not blocked
            && athleteColor === Ω.now.currentPlayer ) // athlete's turn
            {
              // Check where it might land
              //
              let newCoord = Ω.tool.tackle( targetIndex )

              // Move to push
              //
              Ω.now.athlete[ Ω.now.selected ][ 0 ] = zoneX + 1
              Ω.now.athlete[ Ω.now.selected ][ 1 ] = zoneY + 1

              // Push
              //
              Ω.now.pushed = targeted

              //   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .
              // Timeout 1 . Pushed athlete's move
              //
              setTimeout( function()
              {
                Ω.now.athlete[ targeted ][ 0 ] = newCoord[ 0 ] + 1
                Ω.now.athlete[ targeted ][ 1 ] = newCoord[ 1 ] + 1
              },
              newCoord[ 2 ] )

              //   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .
              // Timeout 2 . Complete pushing event
              //
              setTimeout( function()
              {
                // If selected is in the roudabout
                //
                if( Ω.now.rounded.indexOf( Ω.now.selected ) !== -1 )
                {
                  // Say it's roundabouting
                  //
                  Ω.now.rounding[ 0 ] = Ω.now.selected // on exit
                }

                // If selected isn't roundabouting, reset selected
                //
                if( Ω.now.rounding[ 0 ] === 'none' )
                {
                  Ω.now.selected = 'none'
                  Ω.now.displayed = Ω.now.selected
                }

                // This update had to happen right after the test above
                //
                Ω.game.updRdb()

                // Reset pushed (to avoid z-index problems)
                //
                Ω.now.pushed = 'none'

                // Preserve animation
                //
                Ω.game.updSel()
              },
              250 ) // To preserve z-index through motion

              //   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .
              // Move on
              //
              changeTurn = true
            }

            // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            // Replace an athlete if there are replacements available
            //
            else if( athleteColor === 'none'
            && reps > 0 )
            {
              //   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .
              //
              let newCoord = Ω.tool.tackle( targetIndex )

              // Arena
              //
              let x1 = Ω.now.athlete[ targeted ][ 0 ]
              let y1 = Ω.now.athlete[ targeted ][ 1 ]

              // Bench
              //
              let x2 = Ω.info.cell[ 12 ][ targeted ][ 0 ] + 1
              let y2 = Ω.info.cell[ 12 ][ targeted ][ 1 ] + 1

              //   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .
              // Benched (but not replaced) athlete moves onto the arena
              //
              Ω.now.athlete[ Ω.now.selected ][ 0 ] = x1
              Ω.now.athlete[ Ω.now.selected ][ 1 ] = y1

              //   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .
              // It gains its team's color
              //
              Ω.now.athlete[ Ω.now.selected ][ 2 ] = Ω.now.currentPlayer

              //   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .
              // Change the team's setup
              //
              if( Ω.now.currentPlayer === 'gre' )
              {
                Ω.tool.remove( targeted, Ω.now.team.green )
                Ω.now.team.green.push( Ω.now.selected )
              }

              else
              {
                Ω.tool.remove( targeted, Ω.now.team.blue )
                Ω.now.team.blue.push( Ω.now.selected )
              }

              Ω.now.pushed = targeted

              //   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .
              // Timeout 1 . Playing athlete is sent to the bench
              //
              setTimeout( function()
              {
                Ω.now.athlete[ targeted ][ 0 ] = x2
                Ω.now.athlete[ targeted ][ 1 ] = y2
                Ω.now.athlete[ targeted ][ 2 ] = Ω.now.currentPlayer + 'Blk'

                Ω.now.outed.push( targeted )
              },
              newCoord[ 2 ] ) // To start when the benched arrives

              //   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .
              // Timeout 2 . Refresh selected and pushed
              //
              setTimeout( function()
              {
                Ω.now.pushed = 'none'
                Ω.now.lock = false

                Ω.game.updRdb()
                Ω.game.updSel()
                Ω.game.updRpl()
              },
              newCoord[ 2 ] + 10 ) // To preserve z-index through motion

              // Finish process
              //
              if( Ω.now.currentPlayer === 'gre' ) Ω.now.reps.green --
              else                                Ω.now.reps.blue --
            }

            // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            // If it isn't the athlete's turn
            //
            else if( athleteColor !== Ω.now.currentPlayer
            //
            // Or if the targeted athlete isn't marked nor in a blocked zone to
            // safeguard against "fast-hovering" bugs
            //
            || Ω.info.marked.indexOf( targeted ) === -1
            && Ω.info.blocked.indexOf( zone ) === -1 )
            {
              Ω.now.selected = targeted
              Ω.now.displayed = targeted

              // To avoid a form of "fast-hover" bug after selecting an athlete
              // in sequence to selecting yet other athlete
              //
              setTimeout( function()
              {
                Ω.info.marked = Ω.info.target[ 0 ]
              }, 250 )

              Ω.now.lock = false
            }

            // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            // Target is blocked and/or marked
            //
            else
            {
              // To avoid a form of "fast-hover" bug after selecting an athlete
              // in sequence to selecting yet other athlete
              //
              setTimeout( function()
              {
                Ω.info.marked = Ω.info.target[ 0 ]
              }, 250 )

              Ω.now.lock = false
            }
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
          //....................................................................
          // Setting variables
          //
          let color
          let team
          let spawn

          //....................................................................
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

          //....................................................................
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

          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // If an empty zone was clicked off the athlete's turn
          //
          else
          {
            Ω.now.lock = false
          }

          //....................................................................
          // Set who's the first player of the match
          //
          if( Ω.now.turn === 0 ) Ω.now.firstPlayer = color

          //....................................................................
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

      //========================================================================
      // Ending 
      //
      if( changeTurn )
      {
        //......................................................................
        // Timeout 1 . Actually change turn
        //
        setTimeout( function()
        {
          if( Ω.now.rounding[ 1 ] > 0 ) Ω.now.rounding[ 0 ] = 'none'
          else                          Ω.now.rounding[ 1 ] ++

          if( Ω.now.rounding[ 0 ] === 'none' )
          {
            Ω.now.turn ++

            Ω.now.selected = 'none'
            Ω.now.displayed = Ω.now.selected

            // Preserve animation
            //
            Ω.game.updSel()

            // Refreshing roundabouting counter
            //
            Ω.now.rounding[ 1 ] = 0
          }

          // Unlock game
          //
          Ω.now.lock = false
        },
        300 ) // To properly determine who, if anyone, is roundabouting

        //......................................................................
        // Timeout 2 . Compensate for lack of process inputed at line 220
        //
        setTimeout( function()
        {
          if( Ω.now.pushed === 'none' )
          {
            // If selected is in the roundabout
            //
            if( Ω.now.rounded.indexOf( Ω.now.selected ) !== -1 )
            {
              // Say it's roundabouting
              //
              Ω.now.rounding[ 0 ] = Ω.now.selected // on exit
            }

            // This update had to happen right after the test above
            //
            Ω.game.updRdb() 
          }
        },
        250 ) // To preserve z-index through motion
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // 06 . Select nothing
    //
    else
    {
      // Because nothing is selectable during roundabouting
      //
      if( Ω.now.rounding[ 0 ] === 'none' )
      {
        Ω.now.selected = 'none'
        Ω.now.displayed = Ω.now.selected

        // Unlock game
        //
        Ω.now.lock = false
      }
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
    // Refreshing
    //
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

      else if( newColor === 'gre'
      || newColor === 'greBlk' )
      {
        darkerColor = 'rgb(127,175,47)'
      }

      else if( newColor === 'blu'
      || newColor === 'bluBlk' )
      {
        darkerColor = 'rgb(95,63,191)'
      }

      Ω.page.athlete[ $ ].style.backgroundColor = darkerColor
    }

    ////////////////////////////////////////////////////////////////////////////
    // 00 . Hover some athlete that is not targeted nor marked
    //
    if( $.target.id.substring( 0, 3 ) === 'min' ) // if target is an athlete
    {
      let digit = Number( $.target.id.substring( 4, 6 ) ) // athlete's number

      if( Ω.info.target[ 0 ].indexOf( digit ) === -1 // and it isn't a target
      && Ω.info.marked.indexOf( digit ) === -1 ) // nor marked
      {
        Ω.now.hovered = digit // 'none' or 0 to 19
        Ω.now.displayed = Ω.now.hovered
      }

      //========================================================================
      // Hover color effects . Part 2 . Change the color of hovered athlete
      //
      let color =  Ω.now.athlete[ digit ][ 2 ]

      let lighterColor

      if( color === 'none' ) lighterColor = 'rgb(191,191,191)'

      else if( color === 'gre'
      || color === 'greBlk' )
      {
        lighterColor = 'rgb(143,191,63)'
      }

      else if( color === 'blu'
      || color === 'bluBlk' )
      {
        lighterColor = 'rgb(111,79,207)'
      }

      Ω.page.athlete[ digit ].style.backgroundColor = lighterColor
    }

    ////////////////////////////////////////////////////////////////////////////
    // 01 . Hover the ball
    //
    else if( $.target.id === 'ball' )
    {
      Ω.now.hovered = 'ball'
      Ω.now.displayed = Ω.now.hovered

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
      Ω.now.displayed = Ω.now.hovered

      //========================================================================
      // Hover color effects . Part 4 . Get whatever is below the selection zone
      //
      if( Ω.now.displayed === 'ball' )
      {
        Ω.page.ball.style.backgroundColor = 'rgb(143,111,79)'
      }
      else if( Ω.now.displayed !== 'none' ) // athlete
      {
        let current = Ω.now.displayed
        let color = Ω.now.athlete[ current ][ 2 ]
        let lighterColor

        if( color === 'none' ) lighterColor = 'rgb(191,191,191)'

        else if( color === 'gre'
        || color === 'greBlk' )
        {
          lighterColor = 'rgb(143,191,63)'
        }

        else if( color === 'blu'
        || color === 'bluBlk' )
        {
          lighterColor = 'rgb(111,79,207)'
        }

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

      //========================================================================
      // Avoid "fast-hover-changes-displayed-slowly" bug
      //
      if( Ω.now.selected !== 'none' ) Ω.now.displayed = Ω.now.selected
      else                            Ω.now.displayed = Ω.now.hovered

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

          else if( color === 'gre'
          || color === 'greBlk' )
          {
            lighterColor = 'rgb(143,191,63)'
          }

          else if( color === 'blu'
          || color === 'bluBlk' )
          {
            lighterColor = 'rgb(111,79,207)'
          }

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
        else if( newColor === 'gre'
        || newColor === 'greBlk' )
        {
          darkerColor = 'rgb(127,175,47)'
        }
        else if( newColor === 'blu'
        || newColor === 'bluBlk' )
        {
          darkerColor = 'rgb(95,63,191)'
        }

        Ω.page.athlete[ $ ].style.backgroundColor = darkerColor
      }

      //========================================================================
      // Hovering nothing is tricky and must be safeguarded by this condition
      //
      if( Ω.now.selected !== 'none' )
      {
        Ω.now.displayed = Ω.now.selected

        // To avoid a form of "fast-hover" bug after selecting an athlete
        // in sequence to selecting yet other athlete
        //
        setTimeout( function()
        {
          Ω.info.marked = Ω.info.target[ 0 ]
        }, 250 )
      }

      else
      {
        Ω.now.displayed = Ω.now.hovered

        // Avoid "non-hoverable-pre-marked-athlete"
        //
        Ω.info.marked = []
      }
    }

  //////////////////////////////////////////////////////////////////////////////
  // END of 'listen.hoverer'
  //
  }, false ),
}
