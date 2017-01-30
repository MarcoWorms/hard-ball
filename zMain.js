
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
  //
  updBal: function()
  {
    //==========================================================================
    //
    Ω.tool.translate( Ω.page.ball, Ω.state.ball.x, Ω.state.ball.y )
  },

  //////////////////////////////////////////////////////////////////////////////
  // Calls 'game.updZonCdn' differently depending on the situation
  //
  updZon1: function()
  {
    //==========================================================================
    // Undisplay every zone and refresh 'state.zone'
    //
    for( let $ = 0; $ < 16; $ ++ ) Ω.page.zone[ $ ].style.display = 'none'

    //..........................................................................
    //
    Ω.state.zone =
    (
      function()
      {
        let array = []

        for( let $ = 0; $ < 16; $ ++ ) array.push( { x: 'none', y: 'none' } )

        return array
      }()
    )

    //==========================================================================
    // Ball is displayed
    //
    if( Ω.state.displayed === 'ball' )
    {
      //........................................................................
      // Ball's initial state
      //
      if( Ω.state.ball.x === 457 ) Ω.game.updZonCdn( 'cnt', false )
    }

    //==========================================================================
    // Athlete is displayed
    //
    else if( Ω.state.displayed !== 'none' )
    {
      let athleteColor = Ω.state.athlete[ Ω.state.displayed ].color

      //........................................................................
      // Unmarked athlete is ready to play
      //
      if( athleteColor === 'none' )
      {
        if( Ω.state.turn < 8 ) Ω.game.updZonCdn( 'stt', false )
        else                   Ω.game.updZonCdn( 'rep', false )
      }

      //........................................................................
      // Unmarked athlete is playing
      //
      else if( athleteColor.substring( 3, 6 ) !== 'Blk' )
      {
        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        // Roundabouting
        //
        if( Ω.state.displayed === Ω.state.rounding[ 0 ] )
        {
          Ω.game.updZonCdn( 'mtx', true )
        }

        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        // Not roundabouting
        //
        else Ω.game.updZonCdn( 'mtx', false )
      }
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // Updates the appearance of zones
  //
  updZon2: function()
  {
    //==========================================================================
    // Determining how are zones to be shown
    //
    let value = 1
    let lock = true

    //==========================================================================
    // Ball is displayed
    //
    if( Ω.state.displayed === 'ball' )
    {
      //........................................................................
      // Ball wasn't moved yet
      //
      if( Ω.state.ball.x === 457 )
      {
        value = 0.66
        lock = false
      }
    }

    //==========================================================================
    // Athlete is displayed and unmarked
    //
    else if( Ω.state.displayed !== 'none'
    && Ω.state.marked.indexOf( Ω.state.displayed ) === -1 )
    {
      let athleteColor = Ω.state.athlete[ Ω.state.displayed ].color

      //........................................................................
      // If team-selection time is still going on
      // And displayed athlete is ready to play
      //
      if( Ω.state.turn < 8
      && athleteColor !== 'none'
      //
      // Or if team-selection time is over
      // And athlete isn't the same color as the turn
      //
      || Ω.state.turn > 7
      && athleteColor !== Ω.state.currentPlayer
      //
      // Or if there is someone roundabouting
      // And the athlete isn't the one doing it
      //
      || Ω.state.rounding[ 0 ] !== 'none'
      && Ω.state.rounding[ 0 ] !== Ω.state.displayed )
      {
        value = 0.66

        if( athleteColor === 'none' ) lock = true
        else                          lock = false
      }
    }

    //==========================================================================
    // Finally apply the desired effects
    //
    Array.from( Ω.page.zone ).forEach( function( $1, $2 )
    {
      let color

      if( Ω.state.blocked.indexOf( $2 ) !== -1 ) color = '0,0,0'
      else                                       color = '255,255,255'

      $1.style.borderColor = 'rgba(' + color + ',' + value + ')'

      if( lock ) $1.style.boxShadow = '0 0 0 3px rgba(' + color + ',0.5)'
      else       $1.style.boxShadow = ''
    } )
  },

  //////////////////////////////////////////////////////////////////////////////
  // Updating zones coordinates
  //
  updZonCdn: function( behavior, round )
  {
    //==========================================================================
    //
    let value = 0

    let x
    let y

    //==========================================================================
    // Fill 'state.zone'
    //==========================================================================
    // By matrix
    //
    if( behavior === 'mtx' )
    {
      //........................................................................
      //
      let origin

      if( round ) origin = 18
      else        origin = Ω.state.displayed

      //........................................................................
      //
      let counter = 0

      let athleteX = Ω.state.athlete[ origin ].x
      let athleteY = Ω.state.athlete[ origin ].y

      //........................................................................
      // Matrix 1
      //
      if( Ω.info.move[ origin ][ 1 ] === 1 )
      {
        x = Ω.tool.bend( athleteX + 47, 'x' )
        y = Ω.tool.bend( athleteY - 1, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 49, 'x' )
        y = Ω.tool.bend( athleteY - 1, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 1, 'x' )
        y = Ω.tool.bend( athleteY + 47, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 1, 'x' )
        y = Ω.tool.bend( athleteY - 49, 'y' )
        counter += Ω.tool.isZone( counter, x, y )
      }

      //........................................................................
      // Matrix 2
      //
      if( Ω.info.move[ origin ][ 2 ] === 1 )
      {
        x = Ω.tool.bend( athleteX + 95, 'x' )
        y = Ω.tool.bend( athleteY - 1, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 97, 'x' )
        y = Ω.tool.bend( athleteY - 1, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 1, 'x' )
        y = Ω.tool.bend( athleteY + 95, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 1, 'x' )
        y = Ω.tool.bend( athleteY - 97, 'y' )
        counter += Ω.tool.isZone( counter, x, y )
      }

      //........................................................................
      // Matrix 3
      //
      if( Ω.info.move[ origin ][ 3 ] === 1 )
      {
        x = Ω.tool.bend( athleteX + 143, 'x' )
        y = Ω.tool.bend( athleteY - 1, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 145, 'x' )
        y = Ω.tool.bend( athleteY - 1, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 1, 'x' )
        y = Ω.tool.bend( athleteY + 143, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 1, 'x' )
        y = Ω.tool.bend( athleteY - 145, 'y' )
        counter += Ω.tool.isZone( counter, x, y )
      }

      //........................................................................
      // Matrix 4
      //
      if( Ω.info.move[ origin ][ 4 ] === 1 )
      {
        x = Ω.tool.bend( athleteX + 47, 'x' )
        y = Ω.tool.bend( athleteY + 47, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX + 47, 'x' )
        y = Ω.tool.bend( athleteY - 49, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 49, 'x' )
        y = Ω.tool.bend( athleteY - 49, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 49, 'x' )
        y = Ω.tool.bend( athleteY + 47, 'y' )
        counter += Ω.tool.isZone( counter, x, y )
      }

      //........................................................................
      // Matrix 5
      //
      if( Ω.info.move[ origin ][ 5 ] === 1 )
      {
        x = Ω.tool.bend( athleteX + 47, 'x' )
        y = Ω.tool.bend( athleteY + 95, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 49, 'x' )
        y = Ω.tool.bend( athleteY + 95, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 97, 'x' )
        y = Ω.tool.bend( athleteY + 47, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 97, 'x' )
        y = Ω.tool.bend( athleteY - 49, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 49, 'x' )
        y = Ω.tool.bend( athleteY - 97, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX + 47, 'x' )
        y = Ω.tool.bend( athleteY - 97, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX + 95, 'x' )
        y = Ω.tool.bend( athleteY - 49, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX + 95, 'x' )
        y = Ω.tool.bend( athleteY + 47, 'y' )
        counter += Ω.tool.isZone( counter, x, y )
      }

      //........................................................................
      // Matrix 6
      //
      if( Ω.info.move[ origin ][ 6 ] === 1 )
      {
        x = Ω.tool.bend( athleteX + 47, 'x' )
        y = Ω.tool.bend( athleteY + 143, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 49, 'x' )
        y = Ω.tool.bend( athleteY + 143, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 145, 'x' )
        y = Ω.tool.bend( athleteY + 47, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 145, 'x' )
        y = Ω.tool.bend( athleteY - 49, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 49, 'x' )
        y = Ω.tool.bend( athleteY - 145, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX + 47, 'x' )
        y = Ω.tool.bend( athleteY - 145, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX + 143, 'x' )
        y = Ω.tool.bend( athleteY - 49, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX + 143, 'x' )
        y = Ω.tool.bend( athleteY + 47, 'y' )
        counter += Ω.tool.isZone( counter, x, y )
      }

      //........................................................................
      // Matrix 7
      //
      if( Ω.info.move[ origin ][ 7 ] === 1 )
      {
        x = Ω.tool.bend( athleteX + 95, 'x' )
        y = Ω.tool.bend( athleteY + 95, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX + 95, 'x' )
        y = Ω.tool.bend( athleteY - 97, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 97, 'x' )
        y = Ω.tool.bend( athleteY - 97, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 97, 'x' )
        y = Ω.tool.bend( athleteY + 95, 'y' )
        counter += Ω.tool.isZone( counter, x, y )
      }

      //........................................................................
      // Matrix 8
      //
      if( Ω.info.move[ origin ][ 8 ] === 1 )
      {
        x = Ω.tool.bend( athleteX + 95, 'x' )
        y = Ω.tool.bend( athleteY + 143, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 97, 'x' )
        y = Ω.tool.bend( athleteY + 143, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 145, 'x' )
        y = Ω.tool.bend( athleteY + 95, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 145, 'x' )
        y = Ω.tool.bend( athleteY - 97, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 97, 'x' )
        y = Ω.tool.bend( athleteY - 145, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX + 95, 'x' )
        y = Ω.tool.bend( athleteY - 145, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX + 143, 'x' )
        y = Ω.tool.bend( athleteY - 97, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX + 143, 'x' )
        y = Ω.tool.bend( athleteY + 95, 'y' )
        counter += Ω.tool.isZone( counter, x, y )
      }

      //........................................................................
      // Matrix 9
      //
      if( Ω.info.move[ origin ][ 9 ] === 1 )
      {
        x = Ω.tool.bend( athleteX + 143, 'x' )
        y = Ω.tool.bend( athleteY + 143, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX + 143, 'x' )
        y = Ω.tool.bend( athleteY - 145, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 145, 'x' )
        y = Ω.tool.bend( athleteY - 145, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( athleteX - 145, 'x' )
        y = Ω.tool.bend( athleteY + 143, 'y' )
        counter += Ω.tool.isZone( counter, x, y )
      }

      //........................................................................
      //
      value = counter
    }

    //==========================================================================
    // By start
    //
    else if( behavior === 'stt' )
    {
      //........................................................................
      // Turn 0
      //
      if( Ω.state.turn === 0 )
      {
        for( let $ = 0; $ < 8; $ ++ )
        {
          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // Show every green spawn point
          //
          if( $ < 4 )
          {
            let coordinate = Ω.tool.convert( Ω.state.spawn.green[ $ ] )

            x = coordinate.x
            y = coordinate.y
          }

          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // Show every blue spawn point
          //
          else
          {
            let coordinate = Ω.tool.convert( Ω.state.spawn.blue[ $ - 4 ] )

            x = coordinate.x
            y = coordinate.y
          }

          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // Apply coordinates accordingly
          //
          Ω.state.zone[ $ ].x = x
          Ω.state.zone[ $ ].y = y
        }

        value = 8 // always 8 zones in turn 0
      }

      //////////////////////////////////////////////////////////////////////////
      // Turn 1 to 7
      //
      else
      {
        //......................................................................
        // Only show color specific spawn points
        //
        let spawn

        if( Ω.state.currentPlayer === 'gre' ) spawn = Ω.state.spawn.green
        else                                  spawn = Ω.state.spawn.blue

        //......................................................................
        // And only as many as there are
        //
        for( let $ = 0; $ < spawn.length; $ ++ )
        {
          let coordinate = Ω.tool.convert( spawn[ $ ] )

          Ω.state.zone[ $ ].x = coordinate.x
          Ω.state.zone[ $ ].y = coordinate.y
        }

        //......................................................................
        // The number decreases each at athlete selection (team related)
        //
        value = spawn.length
      }
    }

    //==========================================================================
    // By replacement
    //
    else if( behavior === 'rep' )
    {
      //........................................................................
      //
      let team

      if( Ω.state.currentPlayer === 'gre' ) team = Ω.state.team.green
      else                                  team = Ω.state.team.blue

      //........................................................................
      //
      for( let $ = 0; $ < 4; $ ++ )
      {
        let playingAthlete = Ω.state.athlete[ team[ $ ] ]

        Ω.state.zone[ $ ].x = playingAthlete.x - 1
        Ω.state.zone[ $ ].y = playingAthlete.y - 1
      }

      //........................................................................
      //
      value = 4
    }

    //==========================================================================
    // By center (ball's initial state only)
    //
    else if( behavior === 'cnt' )
    {
      //........................................................................
      //
      Ω.info.arenaCenter.forEach( function( $1, $2 )
      {
        let coordinate = Ω.tool.convert( $1 )

        Ω.state.zone[ $2 ].x = coordinate.x
        Ω.state.zone[ $2 ].y = coordinate.y
      } )

      //........................................................................
      //
      value = 4
    }

    //==========================================================================
    // Display zones accordingly
    //
    for( let $ = 0; $ < 16; $ ++ )
    {
      if( $ < value )
      {
        x = Ω.state.zone[ $ ].x + 3
        y = Ω.state.zone[ $ ].y + 3

        Ω.tool.translate( Ω.page.zone[ $ ], x, y )
        Ω.tool.rotate( Ω.page.zone[ $ ], 1 )

        Ω.page.zone[ $ ].style.display = 'flex'
      }
    }
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

      if( Ω.state.selected === $2 || Ω.state.pushed === $2 ) value = '3'

      $1.style.zIndex = value
    } )

    //==========================================================================
    // Update the ball's index
    //
    if( Ω.state.ball.x === 457 ) Ω.page.ball.style.zIndex = '3'
    else                         Ω.page.ball.style.zIndex = '1'
  },

  //////////////////////////////////////////////////////////////////////////////
  // Updates an array containing currently targeted athletes
  //
  updTar: function()
  {
    //==========================================================================
    // Refresh targets
    //
    Ω.state.target.zone = Ω.state.target.aimed = []

    //==========================================================================
    //
    for( let $1 = 0; $1 < 16; $1 ++ )
    {
      //........................................................................
      // Look for athletes
      //
      for( let $2 = 0; $2 < 20; $2 ++ )
      {
        if( Ω.state.athlete[ $2 ].x - 1 === Ω.state.zone[ $1 ].x
        && Ω.state.athlete[ $2 ].y - 1 === Ω.state.zone[ $1 ].y )
        {
          Ω.state.target.zone.push( $2 ) // targets
          Ω.state.target.aimed.push( $1 ) // zones
        }
      }

      //........................................................................
      // Look for the ball
      //
      if( Ω.state.ball.x - 1 === Ω.state.zone[ $1 ].x
      && Ω.state.ball.y - 1 === Ω.state.zone[ $1 ].y )
      {
        Ω.state.target.zone.push( 'ball' ) // ball
        Ω.state.target.aimed.push( $1 ) // zone
      }
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // Changes the color of a zone to black if targeted athlete cannot be pushed
  //
  updBlk: function()
  {
    //==========================================================================
    // Refreshes which cell is blocked
    //
    Ω.state.blocked = []

    //==========================================================================
    // If there are targets
    //
    let targetLength = Ω.state.target.zone.length

    if( targetLength !== 0 )
    {
      for( let $ = 0; $ < targetLength; $ ++ )
      {
        //......................................................................
        // How far the zone/target is from the aiming athlete
        //
        let aimed = Ω.state.target.zone[ $ ]
        let zone = Ω.state.target.aimed[ $ ]

        let pusherX = Ω.state.athlete[ Ω.state.displayed ].x - 1
        let pusherY = Ω.state.athlete[ Ω.state.displayed ].y - 1

        let aimedX = Ω.state.athlete[ aimed ].x - 1
        let aimedY = Ω.state.athlete[ aimed ].y - 1

        let distanceX = pusherX - aimedX
        let distanceY = pusherY - aimedY

        let newX = aimedX - distanceX
        let newY = aimedY - distanceY

        let blockedX = Ω.tool.bend( newX, 'x' )
        let blockedY = Ω.tool.bend( newY, 'y' )

        let newCoordinate = Ω.tool.convert( [ blockedX, blockedY ] )

        //......................................................................
        // Testing if there are athletes impeding the push action
        //
        for( let $ = 0; $ < 20; $ ++ )
        {
          let athleteX = Ω.state.athlete[ $ ].x
          let athleteY = Ω.state.athlete[ $ ].y

          let area

          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // Avoid athletes from being pushed to its opponent's area
          //
          if( Ω.state.athlete[ aimed ].color === 'gre' )
          {
            area = Ω.info.area.blue

            if( Ω.state.keeper.green !== 'none' ) area += Ω.info.area.green
          }

          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          //
          else
          {
            area = Ω.info.area.green

            if( Ω.state.keeper.blue !== 'none' ) area += Ω.info.area.blue
          }

          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // If coordinate isn't in the athletes area
          // And if there isn't any athlete impeding the route completion
          //
          if( area.indexOf( newCoordinate ) === -1
          && blockedX === athleteX - 1
          && blockedY === athleteY - 1 )
          {
            Ω.state.blocked.push( zone )
          }

          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // If zone is part of the opponent's area
          //
          else
          {
            Ω.state.blocked.push( zone )
          }

          //////////////////////////////////////////////////////////////////////
          // UNRELATED TO ACTUAL BLOCKED-CELL TRACKING (code above)
          //////////////////////////////////////////////////////////////////////
          // Shows that is not possible to further replace athletes
          //
          let turnColor = Ω.state.currentPlayer
          let athleteColor = Ω.state.athlete[ Ω.state.displayed ].color

          let replacementsLeft

          if( turnColor === 'gre' ) replacementsLeft = Ω.state.reps.green
          else                      replacementsLeft = Ω.state.reps.blue

          if( athleteColor === 'none' && replacementsLeft === 0 )
          {
            Ω.state.blocked.push( zone )
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
    Ω.state.rounded = []

    //==========================================================================
    //
    for( let $ = 0; $ < 20; $ ++ )
    {
      //........................................................................
      //
      let athleteY = Ω.state.athlete[ $ ].y

      //........................................................................
      //
      if( athleteY < 50 || athleteY > 480 && athleteY < 584)
      {
        Ω.state.rounded.push( $ )
      }
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // Controls the activity of certain aspects of ball holding
  //
  updHol: function()
  {
    //==========================================================================
    // If the ball changed hands
    //
    if( Ω.state.newHolder !== 'none' )
    {
      //........................................................................
      //
      let athlete = Ω.state.athlete[ Ω.state.selected ]

      Ω.state.ball.x = athlete.x
      Ω.state.ball.y = athlete.y

      //........................................................................
      //
      Ω.state.selected = 'ball'
      Ω.state.displayed = Ω.state.selected
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // Controls the activity of certain aspects of ball holding
  //
  updScr: function()
  {
    //==========================================================================
    //
    Ω.state.screen = document.getElementById( 'A00' ).getBoundingClientRect().x
  }
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
    // First round
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

    ////////////////////////////////////////////////////////////////////////////
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
        let a = Ω.page.ball.getBoundingClientRect().x - Ω.state.screen
        let b = Ω.state.ball.x

        return a === b
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
    Ω.game.updScr()

    Ω.trigger.pull()

    Ω.game.updAtl()
    Ω.game.updBal()

    Ω.game.updZon1()
    Ω.game.updZon2()

    Ω.game.updCur()
    Ω.game.updInd()

    window.requestAnimationFrame( Ω.engine.update )
  },
}

////////////////////////////////////////////////////////////////////////////////
// Initializing the game
//
Ω.engine.create()
Ω.engine.update()
