
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
    // Refreshing
    //
    Ω.info.marked = []

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
      let newAthlete = Number( $.target.id.substring( 4, 6 ) ) // 0 to 19

      if( Ω.now.outed.indexOf( newAthlete ) === -1 )
      {
        Ω.now.selected = newAthlete
        Ω.now.displayed = Ω.now.selected

        Ω.info.marked = Ω.info.target[ 0 ]
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // 04 . Select the ball
    //
    else if( $.target.id === 'ball' )
    {
      Ω.now.selected = 'ball'
      Ω.now.displayed = Ω.now.selected
    }

    ////////////////////////////////////////////////////////////////////////////
    // 05 . Click on a zone
    //
    // It's important to note that its only possible to click a zone when the
    // ball or some athlete is selected
    //
    else if( $.target.id.substring( 0, 3 ) === 'zon' ) // target is a zone
    {
      let changeTurn = false

      // Step 1
      //
      let zone = Number( $.target.id.substring( 3, 5 ) )

      // Step 2
      //
      let zoneIndex = Ω.info.target[ 1 ].indexOf( zone )

      // Step 3
      //
      let zoneTarget = Ω.info.target[ 0 ][ zoneIndex ] // 'ball' or 0 to 19

      // Step 4
      //
      let zoneX = Ω.info.zone[ zone ][ 0 ]
      let zoneY = Ω.info.zone[ zone ][ 1 ]

      let coordinate = Ω.tool.convert( [ zoneX, zoneY ] )

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
            //
            let reps // amount of replacements available to the current team

            if( Ω.now.currentPlayer === 'gre' ) reps = Ω.now.reps.green
            else                                reps = Ω.now.reps.blue

            // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            //
            if( Ω.info.blocked.indexOf( zone ) === -1 // not blocked
            && athleteColor === Ω.now.currentPlayer ) // athlete's turn
            {
              let newCoord = Ω.tool.tackle( targetIndex ) // it MUST be here!

              Ω.now.athlete[ Ω.now.selected ][ 0 ] = zoneX + 1
              Ω.now.athlete[ Ω.now.selected ][ 1 ] = zoneY + 1

              Ω.now.pushed = targeted

              //   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .
              // Timeout 1
              //
              setTimeout( function()
              {
                Ω.now.athlete[ targeted ][ 0 ] = newCoord[ 0 ] + 1
                Ω.now.athlete[ targeted ][ 1 ] = newCoord[ 1 ] + 1
              },
              newCoord[ 2 ] )

              //   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .
              // Timeout 2
              //
              setTimeout( function()
              {
                Ω.now.selected = 'none'
                Ω.now.pushed = 'none'

                Ω.game.updSel()
              },
              newCoord[ 2 ] + 260 )

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
              let newCoord = Ω.tool.tackle( targetIndex )

              // Arena
              //
              let x1 = Ω.now.athlete[ targeted ][ 0 ]
              let y1 = Ω.now.athlete[ targeted ][ 1 ]

              // Bench
              //
              let x2 = Ω.info.cell[ 12 ][ targeted ][ 0 ] + 1
              let y2 = Ω.info.cell[ 12 ][ targeted ][ 1 ] + 1

              Ω.now.athlete[ Ω.now.selected ][ 0 ] = x1
              Ω.now.athlete[ Ω.now.selected ][ 1 ] = y1

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
              // Timeout 1
              //
              setTimeout( function()
              {
                Ω.now.athlete[ targeted ][ 0 ] = x2
                Ω.now.athlete[ targeted ][ 1 ] = y2
                Ω.now.athlete[ targeted ][ 2 ] = Ω.now.currentPlayer + 'Blk'
              },
              newCoord[ 2 ] )

              //   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .
              // Timeout 2
              //
              setTimeout( function()
              {
                Ω.now.selected = 'none'
                Ω.now.pushed = 'none'

                Ω.game.updSel()
              },
              newCoord[ 2 ] )

              // Finish process
              //
              if( Ω.now.currentPlayer === 'gre' ) Ω.now.reps.green --
              else                                Ω.now.reps.blue --
            }

            // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            // Select the aimed athlete if the selected athlete is off its turn
            // and is also not on a blocked zone
            //
            else if( Ω.info.marked.indexOf( targeted ) === -1
            && Ω.info.blocked.indexOf( zone ) === -1 )
            {
              Ω.now.selected = targeted
              Ω.now.displayed = targeted
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
        Ω.now.turn ++

        let athlete = Ω.now.athlete[ Ω.now.selected ]

        let distX = zoneX - athlete[ 0 ]
        let distY = zoneY - athlete[ 1 ]

        if( distX < 0 ) distX = ( - distX )
        if( distY < 0 ) distY = ( - distY )

        let value

        if( distX > distY ) value = distX
        else                value = distY

        if( Ω.now.pushed === 'none' )
        {
          setTimeout( function()
          {
            Ω.now.selected = 'none'

            Ω.game.updSel()
          },
          value + 280 )
        }
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // 06 . Select nothing
    //
    else
    {
      Ω.now.selected = 'none'
      Ω.now.displayed = Ω.now.selected
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
      && Ω.info.marked.indexOf( digit ) === -1 ) // nor it's marked
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
      if( Ω.now.selected !== 'none' ) // could be any athlete or the ball
      {
        Ω.now.displayed = Ω.now.selected
      }
      else
      {
        Ω.now.displayed = Ω.now.hovered
      }
    }

  //////////////////////////////////////////////////////////////////////////////
  // END of 'listen.hoverer'
  //
  }, false ),
}
