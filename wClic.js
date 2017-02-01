
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
  && Ω.state.rounder === 'none' )
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
  && Ω.state.rounder === 'none' )
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
    let toReturn = { check: function(){}, act: function(){} }

    //==========================================================================
    // Ball is selected
    //
    if( Ω.state.selected === 'ball' )
    {
      //........................................................................
      // Ball WAS moved already
      //
      if( Ω.state.ball.x !== 457 )
      {
        ////////////////////////////////////////////////////////////////////////
        // HAS target (can only be an athlete)
        //
        if( zoneIndex !== -1 )
        {
          // tbd

          setTimeout( function(){ Ω.state.lock = false }, 100 )
        }

        ////////////////////////////////////////////////////////////////////////
        // Has NO target
        //
        else
        {
          // tbd

          setTimeout( function(){ Ω.state.lock = false }, 100 )
        }
      }

      //........................................................................
      // Ball was NOT moved yet
      //
      else
      {
        // tbd

        setTimeout( function(){ Ω.state.lock = false }, 100 )
      }
    }

    //==========================================================================
    // Athlete is selected
    //
    else
    {
      ////////////////////////////////////////////////////////////////////////
      // Athlete is ready to play
      //
      if( Ω.state.team.playing.indexOf( athlete ) === -1 )
      {
        //====================================================================
        // Athlete selection phase
        //
        if( Ω.state.turn < 8 )
        {
          //..................................................................
          //
          finish = 'regular'

          //..................................................................
          //
          if( Ω.state.turn === 0 )
          {
            if( zone < 4 ) Ω.state.firstPlayer = 'gre'
            else           Ω.state.firstPlayer = 'blu'
          }

          //..................................................................
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
        }

        //====================================================================
        // Replacing some athlete
        //
        else
        {
          let repsLeft

          if( Ω.state.currentPlayer === 'gre' ) repsLeft = Ω.state.reps.green
          else                                  repsLeft = Ω.state.reps.blue

          if( repsLeft > 0 ) finish = 'replace'
          else setTimeout( function(){ Ω.state.lock = false }, 100 )
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
          // HAS target
          //
          if( zoneIndex !== -1 )
          {
            //..................................................................
            // Ball is under aim
            //
            if( aimed === 'ball' )
            {
              // tbd

              setTimeout( function(){ Ω.state.lock = false }, 100 )
            }

            //..................................................................
            // Athlete is under aim
            //
            else
            {
              let isBlocked = Ω.state.blocked.indexOf( zone )

              if( isBlocked === -1 ) finish = 'tackle'
              else setTimeout( function(){ Ω.state.lock = false }, 100 )
            }
          }

          //====================================================================
          // Has NO target
          //
          else
          {
            finish = 'regular'
          }
        }
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    //
    Ω.game.updRdb()

    if( Ω.state.rounding.indexOf( athlete ) !== -1 )
    {
      if( Ω.state.rounder === 'none' ) Ω.state.rounder = athlete
      else                             Ω.state.rounder = 'none'
    }

    else if( Ω.state.rounder !== 'none' )
    {
      Ω.state.rounder = 'none'
    }

    ////////////////////////////////////////////////////////////////////////////
    // Ending process
    //
    if( finish === 'regular' )
    {
      //........................................................................
      //
      Ω.state.athlete[ athlete ].x = Ω.state.zone[ zone ].x + 1
      Ω.state.athlete[ athlete ].y = Ω.state.zone[ zone ].y + 1

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
        if( Ω.state.rounder === 'none' )
        {
          Ω.state.turn ++
          Ω.state.selected = 'none'
          Ω.state.marked = []
        }

        else
        {
          Ω.state.marked = Ω.state.target.aimed
        }

        Ω.game.updSel()

        setTimeout( function(){ Ω.state.lock = false }, 100 )
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    //
    else if( finish === 'tackle' || finish === 'replace' )
    {
      //........................................................................
      //
      Ω.state.pushed = aimed

      let newCoordinate

      if( Ω.state.pushed !== undefined ) newCoordinate = Ω.tool.tackle()

      //........................................................................
      // Change the athlete's coordinates
      //
      Ω.state.athlete[ athlete ].x = Ω.state.zone[ zone ].x + 1
      Ω.state.athlete[ athlete ].y = Ω.state.zone[ zone ].y + 1

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
        if( finish === 'tackle' )
        {
          Ω.state.athlete[ aimed ].x = newCoordinate.x + 1
          Ω.state.athlete[ aimed ].y = newCoordinate.y + 1
        }

        else if( finish === 'replace' )
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
        }

        Ω.trigger.event.push(
        {
          //....................................................................
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

          //....................................................................
          //
          act: function()
          {
            if( Ω.state.rounder === 'none' )
            {
              if( finish === 'tackle' ) Ω.state.turn ++

              Ω.state.selected = 'none'
              Ω.state.marked = []
            }

            else
            {
              Ω.state.marked = Ω.state.target.aimed
            }

            Ω.state.pushed = 'none'

            Ω.game.updSel()

            setTimeout( function(){ Ω.state.lock = false }, 100 )
          }
        } )
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    //
    if( toReturn.check() === false ) Ω.trigger.event.push( toReturn )
    else setTimeout( function(){ Ω.state.lock = false }, 100 )
  }

  //////////////////////////////////////////////////////////////////////////////
  // 06 . Click the selection zone or nothing (if unlocked)
  //
  else if( Ω.state.lock === false
  && Ω.state.rounder === 'none' )
  {
    Ω.state.selected = 'none'
    Ω.state.displayed = Ω.state.selected

    Ω.state.marked = []

    setTimeout( function(){ Ω.state.lock = false }, 100 )
  }

  //////////////////////////////////////////////////////////////////////////////
  // Updating selection zone here to preserve animation
  //
  Ω.game.updSel()

////////////////////////////////////////////////////////////////////////////////
// END of 'Ω.clicker'
//
}, false )