
'use strict'

////////////////////////////////////////////////////////////////////////////////
// Tracks click actions in the game
//
Ω.clicker = addEventListener( 'mousedown', function( $ )
{
  //////////////////////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////////////////////////////
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

    //==========================================================================
    // Preparation to avoid visual strange behavior
    //
    Array.from( Ω.page.animate1 ).forEach( function( $1 )
    {
      $1.style.transition = ''
      $1.style.display = 'none'
    } )

    //==========================================================================
    // Only way to recover the original state
    //
    Ω.state = JSON.parse( localStorage.getItem( 'first' ) )

    //==========================================================================
    // So it does not trigger load below
    //
    localStorage.removeItem( 'last' )

    //==========================================================================
    // Reload page
    //
    location.reload()
  }

  //////////////////////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////////////////////////////
  // 03 . Select the ball (if unlocked)
  //
  else if( $.target.id === 'ball'
  && Ω.state.lock === false
  && Ω.state.rounder === 'none'
  && Ω.state.newHolder === 'none' )
  {
    Ω.state.selected = 'ball'
    Ω.state.displayed = Ω.state.selected

    Ω.state.marked = Ω.state.target.aimed
  }

  //////////////////////////////////////////////////////////////////////////////
  // 04 . Select an athlete (if unlocked)
  //
  else if( $.target.id.substring( 0, 3 ) === 'min'
  && Ω.state.lock === false
  && Ω.state.rounder === 'none'
  && Ω.state.newHolder === 'none' )
  {
    let athlete = Number( $.target.id.substring( 4, 6 ) )

    //==========================================================================
    // If athlete is unmarked
    //
    if( Ω.state.marked.indexOf( athlete ) === -1 )
    {
      Ω.state.selected = athlete
      Ω.state.displayed = Ω.state.selected

      Ω.state.marked = Ω.state.target.aimed
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // 05 . Click on a zone (if unlocked)
  //
  // It's important to note that its only possible to click a zone when the
  // ball or some athlete is selected
  //
  else if( $.target.id.substring( 0, 3 ) === 'zon'
  && Ω.state.lock === false )
  {
    //==========================================================================
    //
    Ω.state.lock = true

    //==========================================================================
    //
    let zone = Number( $.target.id.substring( 3, 5 ) ) // 0 to 15
    let zoneIndex = Ω.state.target.zone.indexOf( zone )

    let zoneX = Ω.state.zone[ zone ].x
    let zoneY = Ω.state.zone[ zone ].y

    let zoneCoordinate = Ω.tool.convert( [ zoneX, zoneY ] )

    let athlete = Ω.state.selected
    let aimed = Ω.state.target.aimed[ zoneIndex ] // 'ball' or 0 to 19

    //..........................................................................
    // Controls how the play will end
    //
    let finish = ''
    let toReturn = { check: () => { return true }, act: () => { return true } }

    //==========================================================================
    // Ball is selected and was already moved
    //
    if( Ω.state.selected === 'ball' )
    {
      if( Ω.state.ball.x !== 457 )
      {
        ////////////////////////////////////////////////////////////////////////
        // HAS target (can only be an athlete)
        //
        if( zoneIndex !== -1 )
        {
          let a = Ω.state.athlete[ Ω.state.holder ]
          let b = Ω.state.athlete[ aimed ]

          if( a.color === b.color )
          {
            Ω.state.newHolder = aimed
            Ω.state.ballLock = false
          }
        }

        ////////////////////////////////////////////////////////////////////////
        // Has NO target
        //
        else finish = 'placeBall'
      }
    }

    //==========================================================================
    // Athlete is selected
    //
    else
    {
      //////////////////////////////////////////////////////////////////////////
      // Athlete is ready to play
      //
      if( Ω.state.team.playing.indexOf( athlete ) === -1 )
      {
        //======================================================================
        // Athlete selection phase
        //
        if( Ω.state.turn < 8 )
        {
          //....................................................................
          //
          if( Ω.state.turn === 0 )
          {
            if( zone < 4 ) Ω.state.firstPlayer = 'gre'
            else           Ω.state.firstPlayer = 'blu'
          }

          //....................................................................
          //
          if( Ω.state.spawn.green.indexOf( zoneCoordinate ) !== -1 )
          {
            Ω.tool.remove( zoneCoordinate, Ω.state.spawn.green )
            Ω.state.athlete[ athlete ].color = 'gre'
            Ω.state.team.green.push( athlete )
            Ω.state.team.playing.push( athlete )
          }

          else
          {
            Ω.tool.remove( zoneCoordinate, Ω.state.spawn.blue )
            Ω.state.athlete[ athlete ].color = 'blu'
            Ω.state.team.blue.push( athlete )
            Ω.state.team.playing.push( athlete )
          }

          //....................................................................
          //
          finish = 'regular'
        }

        //======================================================================
        // Replacing some athlete
        //
        else
        {
          let repsLeft

          if( Ω.state.currentPlayer === 'gre' ) repsLeft = Ω.state.reps.green
          else                                  repsLeft = Ω.state.reps.blue

          if( repsLeft > 0 ) finish = 'replace'
        }
      }

      //////////////////////////////////////////////////////////////////////////
      // Athlete is playing
      //
      else if( Ω.state.turn > 7 )
      {
        if( Ω.state.athlete[ athlete ].color === Ω.state.currentPlayer
        && Ω.state.blocked.indexOf( zone ) === -1 )
        {
          //====================================================================
          // Test for ROUNDABOUTER
          //
          ( function()
          {
            Ω.game.updRdb()

            //..................................................................
            //
            if( Ω.state.rounding.indexOf( athlete ) !== -1 )
            {
              if( Ω.state.rounder === 'none' ) Ω.state.rounder = athlete
              else                             Ω.state.rounder = 'none'
            }

            //..................................................................
            //
            else if( Ω.state.rounder !== 'none' ) Ω.state.rounder = 'none'
          }() )

          //====================================================================
          // HAS target
          //
          if( zoneIndex !== -1 )
          {
            //..................................................................
            // Ball is under aim
            //
            if( aimed === 'ball' ) finish = 'regular'

            //..................................................................
            // Athlete is under aim
            //
            else
            {
              let isBlocked = Ω.state.blocked.indexOf( zone )
              if( isBlocked === -1 ) finish = 'tackle'
            }
          }

          //====================================================================
          // Has NO target
          //
          else finish = 'regular'
        }
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Ending process
    //
    if( finish === 'regular' )
    {
      //........................................................................
      //
      Ω.state.athlete[ athlete ].x = zoneX + 1
      Ω.state.athlete[ athlete ].y = zoneY + 1

      //........................................................................
      //
      toReturn.check = function()
      {
        let athleteToken = Ω.page.athlete[ athlete ].getBoundingClientRect()

        let a = athleteToken.x - Ω.state.screen.x
        let b = Ω.state.athlete[ athlete ].x

        let c = athleteToken.y - Ω.state.screen.y
        let d = Ω.state.athlete[ athlete ].y

        return a === b && c === d
      }

      //........................................................................
      //
      toReturn.act = function()
      {
        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        // NOT roundabouting
        //
        if( Ω.state.rounder === 'none' )
        {
          Ω.state.turn ++

          if( aimed === 'ball'
          || athlete === Ω.state.holder )
          {
            Ω.state.newHolder = athlete
            Ω.state.futureHolder = 'none'
          }

          else if( Ω.state.futureHolder !== 'none' )
          {
            Ω.state.newHolder = Ω.state.futureHolder
            Ω.state.futureHolder = 'none'
          }

          else
          {
            Ω.state.selected = 'none'
            Ω.state.displayed = 'none'
            Ω.state.marked = []
          }
        }

        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        // Roundabouting
        //
        else
        {
          Ω.state.displayed = athlete

          Ω.zone.updZon1()
          Ω.zone.updZon2()

          Ω.game.updTar()

          Ω.state.marked = Ω.state.target.aimed

          if( aimed === 'ball' )
          {
            Ω.state.futureHolder = athlete
          }
        }

        Ω.game.updSel()

        Ω.state.lock = false
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    //
    else if( finish === 'tackle' || finish === 'replace' )
    {
      //........................................................................
      //
      Ω.state.pushed = aimed

      let newCoordinate = Ω.tool.tackle()

      //........................................................................
      // Change the athlete's coordinates
      //
      Ω.state.athlete[ athlete ].x = zoneX + 1
      Ω.state.athlete[ athlete ].y = zoneY + 1

      //........................................................................
      //
      toReturn.check = function()
      {
        let athleteToken = Ω.page.athlete[ athlete ].getBoundingClientRect()

        let a = athleteToken.x - Ω.state.screen.x
        let b = Ω.state.athlete[ athlete ].x

        let c = athleteToken.y - Ω.state.screen.y
        let d = Ω.state.athlete[ athlete ].y

        return a === b && c === d
      }

      //........................................................................
      //
      toReturn.act = function()
      {
        if( finish === 'replace' )
        {
          let oldCoordinate = Ω.info.cell[ 12 ][ aimed ]

          Ω.state.athlete[ aimed ].x = oldCoordinate.x
          Ω.state.athlete[ aimed ].y = oldCoordinate.y

          Ω.state.athlete[ athlete ].color = Ω.state.currentPlayer
          Ω.state.athlete[ aimed ].color = Ω.state.currentPlayer + 'Blk'

          Ω.tool.remove( aimed, Ω.state.team.playing )
          Ω.state.team.playing.push( athlete )

          if( Ω.state.currentPlayer === 'gre' )
          {
            Ω.tool.remove( aimed, Ω.state.team.green )
            Ω.state.team.green.push( athlete )
            Ω.state.reps.green --
          }

          else if( Ω.state.currentPlayer === 'blu' )
          {
            Ω.tool.remove( aimed, Ω.state.team.blue )
            Ω.state.team.blue.push( athlete )
            Ω.state.reps.blue --
          }

          Ω.game.updRpl()

          if( aimed === Ω.state.holder ) Ω.state.newHolder = athlete

          Ω.state.lock = false
        }

        else if( finish === 'tackle' )
        {
          Ω.state.athlete[ aimed ].x = newCoordinate.x + 1
          Ω.state.athlete[ aimed ].y = newCoordinate.y + 1

          Ω.trigger.event.push(
          {
            //..................................................................
            //
            check: function()
            {
              let athleteToken = Ω.page.athlete[ aimed ]
              athleteToken = athleteToken.getBoundingClientRect()

              let a = athleteToken.x - Ω.state.screen.x
              let b = Ω.state.athlete[ aimed ].x

              let c = athleteToken.y - Ω.state.screen.y
              let d = Ω.state.athlete[ aimed ].y

              return a === b && c === d
            },

            //..................................................................
            //
            act: function()
            {
              // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
              //
              let equal = false

              let aimedX = Ω.state.athlete[ aimed ].x - 1
              let aimedY = Ω.state.athlete[ aimed ].y - 1 
              let aimedCoordinate = Ω.tool.convert( [ aimedX, aimedY ] )

              let ballX = Ω.state.ball.x - 1
              let ballY = Ω.state.ball.y - 1
              let ballCoordinate = Ω.tool.convert( [ ballX, ballY ] )

              if( aimedCoordinate === ballCoordinate ) equal = true

              // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
              // NOT roundabouting
              //
              if( Ω.state.rounder === 'none' )
              {
                Ω.state.turn ++

                if( aimed === Ω.state.holder
                || aimed === Ω.state.futureHolder
                || athlete === Ω.state.holder )
                {
                  Ω.state.newHolder = athlete
                  Ω.state.futureHolder = 'none'
                }

                else if( Ω.state.futureHolder !== 'none' )
                {
                  Ω.state.newHolder = Ω.state.futureHolder
                  Ω.state.futureHolder = 'none'
                }

                else if( equal
                && Ω.state.ball.x !== 457 )
                {
                  Ω.state.newHolder = aimed
                }

                else
                {
                  Ω.state.selected = 'none'
                  Ω.state.marked = []
                }
              }

              // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
              // Roundabouting
              //
              else
              {
                Ω.state.displayed = athlete

                Ω.zone.updZon1()
                Ω.zone.updZon2()

                Ω.game.updTar()

                Ω.state.marked = Ω.state.target.aimed

                if( aimed === 'ball'
                || aimed === Ω.state.holder )
                {
                  Ω.state.futureHolder = athlete
                }

                else if( equal )
                {
                  Ω.state.futureHolder = aimed
                }
              }

              Ω.state.pushed = 'none'

              Ω.game.updSel()

              Ω.state.lock = false
            }
          } )
        }
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    //
    else if( finish === 'placeBall' )
    {
      Ω.state.ball.x = zoneX + 1
      Ω.state.ball.y = zoneY + 1

      //........................................................................
      //
      toReturn.check = function()
      {
        let ballToken = Ω.page.ball.getBoundingClientRect()

        let a = ballToken.x - Ω.state.screen.x
        let b = Ω.state.ball.x

        let c = ballToken.y - Ω.state.screen.y
        let d = Ω.state.ball.y

        return a === b && c === d
      }

      //........................................................................
      //
      toReturn.act = function()
      {
        Ω.state.newHolder = 'none'
        Ω.state.displayed = 'ball'

        Ω.zone.updZon1()
        Ω.zone.updZon2()

        Ω.game.updTar()

        Ω.state.marked = Ω.state.target.aimed

        Ω.state.ballLock = false
        Ω.state.lock = false
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    //
    if( toReturn.check() === false ) Ω.trigger.event.push( toReturn )
    else Ω.state.lock = false
  }

  //////////////////////////////////////////////////////////////////////////////
  // 06 . Click the selection zone or nothing (if unlocked)
  //
  else if( Ω.state.lock === false
  && Ω.state.rounder === 'none'
  && Ω.state.newHolder === 'none' )
  {
    Ω.state.selected = 'none'
    Ω.state.displayed = Ω.state.selected

    Ω.state.marked = []

    Ω.state.lock = false
  }

  //////////////////////////////////////////////////////////////////////////////
  // Updating selection zone here to preserve animation
  //
  Ω.game.updSel()

////////////////////////////////////////////////////////////////////////////////
// END of 'Ω.clicker'
//
}, false )
