
'use strict'

////////////////////////////////////////////////////////////////////////////////
// Gameplay functions
//
Ω.game =
{
  //////////////////////////////////////////////////////////////////////////////
  //
  updAtl: function()
  {
    //==========================================================================
    //
    for( let $ = 0; $ < 20; $ ++ )
    {
      let x = Ω.state.athlete[ $ ].x
      let y = Ω.state.athlete[ $ ].y

      Ω.tool.translate( Ω.page.athlete[ $ ], x, y )
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // Ball's and Shoot's position
  //
  updBal: function()
  {
    //==========================================================================
    //
    Ω.tool.translate( Ω.page.ball, Ω.state.ball.x, Ω.state.ball.y )

    //==========================================================================
    //
    Ω.tool.translate( Ω.page.shootMain, Ω.state.shoot.x, Ω.state.shoot.y )
  },

  //////////////////////////////////////////////////////////////////////////////
  // Updates whose turn it is (plus athlete's art and area cell's name glow)
  //
  updCur: function()
  {
    //==========================================================================
    // Defining who is to play this turn
    //
    if( Ω.state.firstPlayer === 'gre' )
    {
      if( Ω.state.turn % 2 === 0 ) Ω.state.currentPlayer = 'gre' // odd turn
      else                         Ω.state.currentPlayer = 'blu' // even turn
    }

    else if( Ω.state.firstPlayer === 'blu' )
    {
      if( Ω.state.turn % 2 === 0 ) Ω.state.currentPlayer = 'blu' // odd turn
      else                         Ω.state.currentPlayer = 'gre' // even turn
    }

    //==========================================================================
    // Determining cells' texts and athletes' arts to be shown with glow effect
    //
    let hideText
    let showText
    let hideGlow
    let showGlow

    if( Ω.state.currentPlayer === 'gre' )
    {
      hideText = Array.from( Ω.page.textBlue )
      showText = Array.from( Ω.page.textGreen )
      hideGlow = Ω.state.team.blue
      showGlow = Ω.state.team.green
    }

    else if( Ω.state.currentPlayer === 'blu' )
    {
      hideText = Array.from( Ω.page.textGreen )
      showText = Array.from( Ω.page.textBlue )
      hideGlow = Ω.state.team.green
      showGlow = Ω.state.team.blue
    }

    //==========================================================================
    // Making the selected cells and athletes' arts glow
    //
    if( Ω.state.turn !== 0 ) // except on turn 0
    {
      //........................................................................
      //
      hideText.forEach( ( $ ) =>
      {
        $.style.color = 'rgba(255,255,255,0.25)'
        $.style.textShadow = ''
      } )

      //........................................................................
      //
      showText.forEach( ( $ ) =>
      {
        let value = Ω.change.glow[ 0 ]

        $.style.color = 'rgba(255,255,255,' + value + ')'
        $.style.textShadow = '0 0 4px rgba(255,255,255,' + value + ')'
      } )

      //........................................................................
      //
      for( let $ = 0; $ < hideGlow.length; $ ++ )
      {
        Array.from( Ω.page.glow[ hideGlow[ $ ] ] ).forEach( function( $ )
        {
          $.style.fill = 'rgba(255,255,255,0.75)'
        } )
      }

      //........................................................................
      //
      for( let $ = 0; $ < showGlow.length; $ ++ )
      {
        Array.from( Ω.page.glow[ showGlow[ $ ] ] ).forEach( function( $ )
        {
          let value = ( Ω.change.glow[ 0 ] - Ω.change.glow[ 0 ] / 8 )

          $.style.fill = 'rgba(255,255,255,' + ( 1 - value ) + ')'
        } )
      }
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // Display moving objects above everything else in the arena
  //
  updInd: function()
  {
    //==========================================================================
    // Update athletes' indexes
    //
    Array.from( Ω.page.athlete ).forEach( function( $1, $2 )
    {
      let value = '1'

      if( Ω.state.selected === $2 )    value = '4'
      else if( Ω.state.pushed === $2 ) value = '3'

      $1.style.zIndex = value
    } )

    //==========================================================================
    // PART I . Update the shoot's index
    //
    Array.from( Ω.page.shoot ).forEach( function( $1, $2 )
    {
      let ballZIndex = Number( Ω.page.ball.style.zIndex )
      $1.style.zIndex = String( ballZIndex - 1 )
    } )

    //==========================================================================
    // Update the ball's index
    //
    if( Ω.state.ball.x === 457 ) Ω.page.ball.style.zIndex = '3'
    else if( Ω.state.displayed === 'ball' ) Ω.page.ball.style.zIndex = '5'
    else Ω.page.ball.style.zIndex = '1'

    //==========================================================================
    // PART II . Update the shoot's index
    //
    Array.from( Ω.page.shoot ).forEach( function( $1, $2 )
    {
      let ballZIndex = Number( Ω.page.ball.style.zIndex )
      $1.style.zIndex = String( ballZIndex - 1 )
    } )

  },

  //////////////////////////////////////////////////////////////////////////////
  // Updates an array containing currently targeted athletes
  //
  updTar: function()
  {
    //==========================================================================
    // Refresh targets
    //
    Ω.state.target.zone = []
    Ω.state.target.aimed = []

    //==========================================================================
    //
    for( let $1 = 0; $1 < 16; $1 ++ )
    {
      //........................................................................
      // Look for athletes
      //
      for( let $2 = 0; $2 < 20; $2 ++ )
      {
        if( Ω.state.zone[ $1 ].x === Ω.state.athlete[ $2 ].x - 1
        && Ω.state.zone[ $1 ].y === Ω.state.athlete[ $2 ].y - 1 )
        {
          Ω.state.target.zone.push( $1 )
          Ω.state.target.aimed.push( $2 )
        }
      }

      //........................................................................
      // Look for the ball
      //
      if( Ω.state.zone[ $1 ].x === Ω.state.ball.x - 1
      && Ω.state.zone[ $1 ].y === Ω.state.ball.y - 1 )
      {
        Ω.state.target.zone.push( $1 )
        Ω.state.target.aimed.push( 'ball' )
      }
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // Changes the color of a zone to black if targeted athlete cannot be pushed
  //
  updBlk: function()
  {
    Ω.state.blocked = []

    let targetLength = Ω.state.target.zone.length

    if( Ω.state.target.aimed.indexOf( 'ball' ) !== -1 )
    {
      let indexOfBall = Ω.state.target.aimed.indexOf( 'ball' )
      let lastZone = Ω.state.target.zone[ indexOfBall ]

      Ω.tool.remove( 'ball', Ω.state.target.aimed )
      Ω.tool.remove( lastZone, Ω.state.target.zone )

      Ω.state.target.aimed.push( 'ball' )
      Ω.state.target.zone.push( lastZone )

      targetLength --
    }

    if( targetLength !== 0 )
    {
      //========================================================================
      // Ball is selected
      //
      if( Ω.state.displayed === 'ball' )
      {
        for( let $ = 0; $ < targetLength; $ ++ )
        {
          let zone = Ω.state.target.zone[ $ ]
          let aimed = Ω.state.athlete[ Ω.state.target.aimed[ $ ] ]
          let holder = Ω.state.athlete[ Ω.state.holder ]

          if( aimed.color !== holder.color )
          {
            Ω.state.blocked.push( zone )
          }
        }
      }

      //========================================================================
      // Athlete is selected
      //
      else if( Ω.state.displayed !== 'none' )
      {
        for( let $1 = 0; $1 < targetLength; $1 ++ )
        {
          //....................................................................
          // How far the zone/target is from the aiming athlete
          //
          let zone = Ω.state.target.zone[ $1 ]
          let aimed = Ω.state.target.aimed[ $1 ]

          let pusherX = Ω.state.athlete[ Ω.state.displayed ].x - 1
          let pusherY = Ω.state.athlete[ Ω.state.displayed ].y - 1

          let aimedX = Ω.state.athlete[ aimed ].x - 1
          let aimedY = Ω.state.athlete[ aimed ].y - 1

          let distanceX = aimedX - pusherX
          let distanceY = aimedY - pusherY

          let newX = aimedX + distanceX
          let newY = aimedY + distanceY

          let blockedX = Ω.tool.bend( newX, 'x' )
          let blockedY = Ω.tool.bend( newY, 'y' )

          let newCoordinate = Ω.tool.convert( [ blockedX, blockedY ] )

          let area

          //....................................................................
          // Avoid athletes from being pushed to its opponent's area
          // Or their own area if it isn't the keeper
          //
          if( Ω.state.athlete[ aimed ].color === 'gre' )
          {
            area = Ω.info.area.blue
            if( Ω.state.keeper.green !== 'none' ) area += Ω.info.area.green
          }

          else
          {
            area = Ω.info.area.green
            if( Ω.state.keeper.blue !== 'none' ) area += Ω.info.area.blue
          }

          //....................................................................
          // Testing if there are athletes impeding the push action
          //
          for( let $2 = 0; $2 < 20; $2 ++ )
          {
            let athleteX = Ω.state.athlete[ $2 ].x
            let athleteY = Ω.state.athlete[ $2 ].y


            // Checking if it's possible to push or not
            //
            if( area.indexOf( newCoordinate ) === -1 )
            {
              if( blockedX === athleteX - 1 )
              {
                if( blockedY === athleteY - 1 )
                {
                  Ω.state.blocked.push( zone )
                }
              }
            }

            // Part of opponent's area
            //
            else
            {
              Ω.state.blocked.push( zone )
            }

            //==================================================================
            // UNRELATED TO ACTUAL BLOCKED-CELL TRACKING (code above)
            //
            // Shows that is not possible to further replace athletes
            //
            let turnColor = Ω.state.currentPlayer
            let athleteColor = Ω.state.athlete[ Ω.state.displayed ].color
            let replacementsLeft

            if( turnColor === 'gre' ) replacementsLeft = Ω.state.reps.green
            else                      replacementsLeft = Ω.state.reps.blue

            if( athleteColor === 'none'
            && replacementsLeft === 0 )
            {
              Ω.state.blocked.push( zone )
            }
          }
        }
      }
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // Updates the position of the selection zone
  //
  updSel: function()
  {
    //==========================================================================
    // Refresh display so animation can begin again
    //
    Ω.page.selection.style.display = 'none'

    if( Ω.state.selected !== 'none' )
    {
      let x
      let y

      //........................................................................
      // Ball is selected
      //
      if( Ω.state.selected === 'ball' )
      {
        x = Ω.state.ball.x + 2
        y = Ω.state.ball.y + 2
      }

      //........................................................................
      // Athlete is selected
      //
      else
      {
        x = Ω.state.athlete[ Ω.state.selected ].x + 2
        y = Ω.state.athlete[ Ω.state.selected ].y + 2
      }

      //........................................................................
      // Add a little delay so animation can begin again
      //
      setTimeout( function()
      {
        Ω.page.selection.style.display = 'flex'
        Ω.tool.translate( Ω.page.selection, x, y )
      }, 0 )
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // Colorize replaced athletes
  //
  updRpl: function()
  {
    //==========================================================================
    //
    for( let $ = 0; $ < 20; $ ++ )
    {
      if( Ω.state.athlete[ $ ].color.substring( 3, 6 ) === 'Blk' )
      {
        //......................................................................
        //
        Ω.page.athlete[ $ ].style.borderColor = 'black'

        //......................................................................
        //
        Array.from( Ω.page.glow[ $ ] ).forEach( function( $ )
        {
          $.style.fill = 'rgba(255,255,255,0.5)'
        } )
      }

      else if( Ω.state.athlete[ $ ].color === 'gre' )
      {
        Ω.page.athlete[ $ ].style.backgroundColor = 'rgb(127,175,47)'
      }

      else if( Ω.state.athlete[ $ ].color === 'blu' )
      {
        Ω.page.athlete[ $ ].style.backgroundColor = 'rgb(95,63,191)'
      }
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // Updating if there's any athlete currently inside its area (goalkeeper)
  //
  updKee: function()
  {
    Ω.state.keeper.green = 'none'
    Ω.state.keeper.blue = 'none'

    //==========================================================================
    //
    if( Ω.state.turn > 7 ) // turns 8+ (so that each team is complete)
    {
      for( let $ = 0; $ < 4; $ ++ ) // test once per team athlete
      {
        //======================================================================
        // Test for green athletes
        //
        let x1 = Ω.state.athlete[ Ω.state.team.green[ $ ] ].x - 1
        let y1 = Ω.state.athlete[ Ω.state.team.green[ $ ] ].y - 1
        let coordinate1 = Ω.tool.convert( [ x1, y1 ] )

        //......................................................................
        //
        if( Ω.info.area.green.indexOf( coordinate1 ) !== -1 )
        {
          Ω.state.keeper.green = Ω.state.team.green[ $ ]
        }

        //======================================================================
        // Test for blue athletes
        //
        let x2 = Ω.state.athlete[ Ω.state.team.blue[ $ ] ].x - 1
        let y2 = Ω.state.athlete[ Ω.state.team.blue[ $ ] ].y - 1
        let coordinate2 = Ω.tool.convert( [ x2, y2 ] )

        //......................................................................
        //
        if( Ω.info.area.blue.indexOf( coordinate2 ) !== -1 )
        {
          Ω.state.keeper.blue = Ω.state.team.blue[ $ ]
        }
      }
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // Updates an array containing the numbers of the athletes in the roundabout
  //
  updRdb: function()
  {
    //==========================================================================
    //
    Ω.state.rounding = []

    //==========================================================================
    //
    for( let $ = 0; $ < 20; $ ++ )
    {
      //........................................................................
      //
      let athleteY = Ω.state.athlete[ $ ].y

      //........................................................................
      //
      if( athleteY < 50 || athleteY > 434 && athleteY < 583)
      {
        Ω.state.rounding.push( $ )
      }
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // Controls the activity of certain aspects of ball holding
  //
  updHol: function()
  {
    //==========================================================================
    // Initial grab
    //
    if( Ω.state.ball.x === 457 )
    {
      for( let $1 = 0;  $1 < 20; $1 ++ )
      {
        for( let $2 = 0;  $2 < 4; $2 ++ )
        {
          let athlete = Ω.state.athlete[ $1 ]
          let cell = Ω.tool.convert( Ω.info.arenaCenter[ $2 ] )

          if( athlete.x - 1 === cell.x )
          {
            if( athlete.y - 1 === cell.y )
            {
              Ω.state.newHolder = $1
            }
          }
        }
      }
    }

    //==========================================================================
    // If the ball changed hands
    //
    if( Ω.state.newHolder !== 'none'
    && Ω.state.ballLock === false )
    {
      Ω.state.ballLock = true

      Ω.state.holder = Ω.state.newHolder

      //........................................................................
      //
      let athlete = Ω.state.holder

      Ω.state.ball.x = Ω.state.athlete[ athlete ].x
      Ω.state.ball.y = Ω.state.athlete[ athlete ].y

      Ω.page.ball.style.opacity = '0.75'

      //........................................................................
      //
      Ω.state.selected = 'ball'
      Ω.state.displayed = Ω.state.selected

      Ω.zone.updZon1()
      Ω.zone.updZon2()

      Ω.game.updSel()
      Ω.game.updTar()

      Ω.state.marked = Ω.state.target.aimed
      Ω.state.marked.push( athlete )
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // Controls the SHOOT button behavior
  //
  updSho: function()
  {
    //==========================================================================
    // Shoot button behavior
    //
    if( Ω.state.displayed === 'ball'
    && Ω.state.newHolder === 'none'
    && Ω.state.ball.x !== 457 )
    {
      let holder = Ω.state.athlete[ Ω.state.holder ]
      let dif =
      {
        x: Ω.state.ball.x - holder.x,
        y: Ω.state.ball.y - holder.y,
      }

      // This bit should probably be more carefully thought (!)
      //
      if( dif.x !== undefined && dif.y !== undefined )
      {
        Ω.state.shoot.x = Ω.tool.bend( Ω.state.ball.x + dif.x - 1, 'x' ) + 2
        Ω.state.shoot.y = Ω.tool.bend( Ω.state.ball.y + dif.y - 1, 'y' ) + 2

        setTimeout( function(){ Ω.page.shootMain.style.display = 'flex' }, 0 )
      }
    }

    //==========================================================================
    //
    else
    {
      Ω.state.shoot.x = Ω.state.ball.x + 1
      Ω.state.shoot.y = Ω.state.ball.y + 1
    }
  },
}

////////////////////////////////////////////////////////////////////////////////
// Runs the game
//
Ω.engine =
{
  //////////////////////////////////////////////////////////////////////////////
  //
  create: function()
  {
    Ω.tool.save( true )

    Ω.game.updSel()
    Ω.game.updRpl()

    //==========================================================================
    //
    if( Ω.state.newHolder !== 'none' ) Ω.page.ball.style.opacity = '0.75'

    //==========================================================================
    // First turn
    //
    if( Ω.state.turn === 0 )
    {
      //........................................................................
      // Athletes' initial positions
      //
      for( let $ = 0; $ < 20; $ ++ )
      {
        Ω.state.athlete[ $ ].x = Ω.info.cell[ 12 ][ $ ].x + 1
        Ω.state.athlete[ $ ].y = Ω.info.cell[ 12 ][ 0 ].y + 1
      }

      //........................................................................
      // Ball initial position
      //
      Ω.state.ball.x = 457
      Ω.state.ball.y = 265
    }

    //==========================================================================
    // Hover color . Part 0 . Refresh everything
    //
    Ω.page.ball.style.backgroundColor = 'rgb(111,79,47)'

    for( let $1 = 0; $1 < 20; $1 ++ )
    {
      let athleteColor = Ω.state.athlete[ $1 ].color
      let darkerColor

      //========================================================================
      // Teamless athlete
      //
      if( athleteColor === 'none' ) darkerColor = 'rgb(143,143,143)'

      //........................................................................
      // Athlete is playing or was benched this match (green team)
      //
      else if( athleteColor === 'gre' || athleteColor === 'greBlk' )
      {
        darkerColor = 'rgb(127,175,47)'
      }

      //........................................................................
      // Athlete is playing or was benched this match (blue team)
      //
      else if( athleteColor === 'blu' || athleteColor === 'bluBlk' )
      {
        darkerColor = 'rgb(95,63,191)'
      }

      //========================================================================
      // Set the athlete's color
      //
      Ω.page.athlete[ $1 ].style.backgroundColor = darkerColor
    }

    //==========================================================================
    // Avoid 'everything-travelling-from-point-0' bug
    //
    Ω.trigger.event.push(
    {
      //........................................................................
      //
      check: function()
      {
        let entity = Ω.page.ball.getBoundingClientRect()

        let a = entity.x - Ω.state.screen.x
        let b = Ω.state.ball.x

        let c = entity.y - Ω.state.screen.y
        let d = Ω.state.ball.y

        return a === b && c === d
      },

      //........................................................................
      //
      act: function()
      {
        Array.from( Ω.page.animate1 ).forEach( function( $ )
        {
          $.style.transition = 'all 0.25s ease-in-out'
        } )
      }
    } )
  },

  //////////////////////////////////////////////////////////////////////////////
  //
  update: function()
  {
    //..........................................................................
    // The screen adaptation must happen before anything else
    //
    Ω.tool.screen()

    //..........................................................................
    //
    Ω.trigger.pull()

    //..........................................................................
    // Calling ZONE functions
    //
    Ω.zone.updZon1()
    Ω.zone.updZon2()

    //..........................................................................
    // Calling GAME functions
    //
    Ω.game.updAtl()
    Ω.game.updBal()

    Ω.game.updCur()
    Ω.game.updInd()
    Ω.game.updTar()
    Ω.game.updBlk()
    Ω.game.updKee()
    Ω.game.updHol()
    Ω.game.updSho()

    window.requestAnimationFrame( Ω.engine.update )
  },
}

////////////////////////////////////////////////////////////////////////////////
// Initializing the game
//
Ω.engine.create()
Ω.engine.update()
