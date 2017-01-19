
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
      let x = Ω.state.athlete[ $ ][ 0 ]
      let y = Ω.state.athlete[ $ ][ 1 ]

      Ω.tool.translate( Ω.page.athlete[ $ ], x, y )
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  //
  updBal: function()
  {
    //==========================================================================
    //
    Ω.tool.translate( Ω.page.ball, Ω.state.ball[ 0 ], Ω.state.ball[ 1 ] )
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

        for( let $ = 0; $ < 16; $ ++ ) array.push( [ 'none', 'none' ] )

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
      if( Ω.state.ball[ 0 ] === 457 ) Ω.game.updZonCdn( 'cnt', false )
    }

    //==========================================================================
    // Displayed athlete is unmarked
    //
    else if( Ω.state.displayed !== 'none' )
    {
      let athleteColor = Ω.state.athlete[ Ω.state.displayed ][ 2 ]

      //........................................................................
      // Displayed and unmarked athlete is ready to play
      //
      if( athleteColor === 'none' )
      {
        if( Ω.state.turn < 8 ) Ω.game.updZonCdn( 'stt', false )
        else                   Ω.game.updZonCdn( 'rep', false )
      }

      //........................................................................
      // Displayed and unmarked athlete is playing
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
      if( Ω.state.ball[ 0 ] === 457 )
      {
        value = 0.66
        lock = false
      }
    }

    //==========================================================================
    // Displayed athlete is unmarked
    //
    else if( Ω.state.displayed !== 'none'
    && Ω.state.marked.indexOf( Ω.state.displayed ) === -1 )
    {
      //........................................................................
      // If team-selection time is still going on
      // And displayed athlete is ready to play
      //
      if( Ω.state.turn < 8
      && Ω.state.athlete[ Ω.state.displayed ][ 2 ] !== 'none'
      //
      // Or if team-selection time is over
      // And athlete isn't the same color as the turn
      //
      || Ω.state.turn > 7
      && Ω.state.athlete[ Ω.state.displayed ][ 2 ] !== Ω.state.currentPlayer
      //
      // Or if there is someone roundabouting
      // And the athlete isn't the one doing it
      //
      || Ω.state.rounding[ 0 ] !== 'none'
      && Ω.state.rounding[ 0 ] !== Ω.state.displayed )
      {
        value = 0.66

        let athleteColor = Ω.state.athlete[ Ω.state.displayed ][ 2 ]

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
      let counter = 0

      let origin

      //........................................................................
      //
      if( round ) origin = 18
      else        origin = Ω.state.displayed

      //........................................................................
      //
      Ω._.athleteX = Ω.state.athlete[ Ω.state.displayed ][ 0 ]
      Ω._.athleteX = Ω.state.athlete[ Ω.state.displayed ][ 1 ]

      //........................................................................
      // Matrix 1
      //
      if( Ω.info.move[ origin ][ 1 ] === 1 )
      {
        x = Ω.tool.bend( Ω._.athleteX + 47, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 1, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 49, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 1, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 1, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 47, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 1, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 49, 'y' )
        counter += Ω.tool.isZone( counter, x, y )
      }

      //........................................................................
      // Matrix 2
      //
      if( Ω.info.move[ origin ][ 2 ] === 1 )
      {
        x = Ω.tool.bend( Ω._.athleteX + 95, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 1, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 97, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 1, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 1, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 95, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 1, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 97, 'y' )
        counter += Ω.tool.isZone( counter, x, y )
      }

      //........................................................................
      // Matrix 3
      //
      if( Ω.info.move[ origin ][ 3 ] === 1 )
      {
        x = Ω.tool.bend( Ω._.athleteX + 143, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 1, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 145, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 1, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 1, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 143, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 1, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 145, 'y' )
        counter += Ω.tool.isZone( counter, x, y )
      }

      //........................................................................
      // Matrix 4
      //
      if( Ω.info.move[ origin ][ 4 ] === 1 )
      {
        x = Ω.tool.bend( Ω._.athleteX + 47, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 47, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX + 47, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 49, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 49, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 49, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 49, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 47, 'y' )
        counter += Ω.tool.isZone( counter, x, y )
      }

      //........................................................................
      // Matrix 5
      //
      if( Ω.info.move[ origin ][ 5 ] === 1 )
      {
        x = Ω.tool.bend( Ω._.athleteX + 47, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 95, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 49, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 95, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 97, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 47, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 97, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 49, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 49, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 97, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX + 47, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 97, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX + 95, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 49, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX + 95, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 47, 'y' )
        counter += Ω.tool.isZone( counter, x, y )
      }

      //........................................................................
      // Matrix 6
      //
      if( Ω.info.move[ origin ][ 6 ] === 1 )
      {
        x = Ω.tool.bend( Ω._.athleteX + 47, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 143, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 49, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 143, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 145, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 47, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 145, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 49, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 49, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 145, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX + 47, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 145, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX + 143, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 49, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX + 143, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 47, 'y' )
        counter += Ω.tool.isZone( counter, x, y )
      }

      //........................................................................
      // Matrix 7
      //
      if( Ω.info.move[ origin ][ 7 ] === 1 )
      {
        x = Ω.tool.bend( Ω._.athleteX + 95, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 95, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX + 95, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 97, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 97, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 97, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 97, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 95, 'y' )
        counter += Ω.tool.isZone( counter, x, y )
      }

      //........................................................................
      // Matrix 8
      //
      if( Ω.info.move[ origin ][ 8 ] === 1 )
      {
        x = Ω.tool.bend( Ω._.athleteX + 95, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 143, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 97, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 143, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 145, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 95, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 145, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 97, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 97, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 145, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX + 95, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 145, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX + 143, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 97, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX + 143, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 95, 'y' )
        counter += Ω.tool.isZone( counter, x, y )
      }

      //........................................................................
      // Matrix 9
      //
      if( Ω.info.move[ origin ][ 9 ] === 1 )
      {
        x = Ω.tool.bend( Ω._.athleteX + 143, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 143, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX + 143, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 145, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 145, 'x' )
        y = Ω.tool.bend( Ω._.athleteY - 145, 'y' )
        counter += Ω.tool.isZone( counter, x, y )

        x = Ω.tool.bend( Ω._.athleteX - 145, 'x' )
        y = Ω.tool.bend( Ω._.athleteY + 143, 'y' )
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

            x = coordinate[ 0 ]
            y = coordinate[ 1 ]
          }

          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // Show every blue spawn point
          //
          else
          {
            let coordinate = Ω.tool.convert( Ω.state.spawn.blue[ $ - 4 ] )

            x = coordinate[ 0 ]
            y = coordinate[ 1 ]
          }

          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // Apply coordinates accordingly
          //
          Ω.state.zone[ $ ][ 0 ] = x
          Ω.state.zone[ $ ][ 1 ] = y
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
        if( Ω.state.currentPlayer === 'gre' ) Ω._.spawn = Ω.state.spawn.green
        else                                  Ω._.spawn = Ω.state.spawn.blue

        //......................................................................
        // And only as many as there are
        //
        for( let $ = 0; $ < Ω._.spawn.length; $ ++ )
        {
          Ω._.coordinate = Ω.tool.convert( Ω._.spawn[ $ ] )

          Ω.state.zone[ $ ][ 0 ] = Ω._.coordinate[ 0 ]
          Ω.state.zone[ $ ][ 1 ] = Ω._.coordinate[ 1 ]
        }

        //......................................................................
        // The number decreases each at athlete selection (team related)
        //
        value = Ω._.spawn.length
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

        Ω.state.zone[ $ ][ 0 ] = playingAthlete[ 0 ] - 1
        Ω.state.zone[ $ ][ 1 ] = playingAthlete[ 1 ] - 1
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

        Ω.state.zone[ $2 ][ 0 ] = coordinate[ 0 ]
        Ω.state.zone[ $2 ][ 1 ] = coordinate[ 1 ]
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
        x = Ω.state.zone[ $ ][ 0 ] + 3
        y = Ω.state.zone[ $ ][ 1 ] + 3

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
    // Determining which cell text is to be shown with glow effect
    //
    let hideText
    let showText

    if( Ω.state.currentPlayer === 'gre' )
    {
      hideText = Array.from( Ω.page.textBlue )
      showText = Array.from( Ω.page.textGreen )
    }

    else if( Ω.state.currentPlayer === 'blu' )
    {
      hideText = Array.from( Ω.page.textGreen )
      showText = Array.from( Ω.page.textBlue )
    }

    //==========================================================================
    // Making the selected cells glow
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
        let value = Ω.changer.glow[ 0 ]

        $.style.color = 'rgba(255,255,255,' + value + ')'
        $.style.textShadow = '0 0 4px rgba(255,255,255,' + value + ')'
      } )
    }

    //==========================================================================
    // Determining which athlete art is to be shown with glow effect
    //
    let hideGlow
    let showGlow

    if( Ω.state.currentPlayer === 'gre' )
    {
      hideGlow = Ω.state.team.blue
      showGlow = Ω.state.team.green
    }

    else if( Ω.state.currentPlayer === 'blu' )
    {
      hideGlow = Ω.state.team.green
      showGlow = Ω.state.team.blue
    }

    //==========================================================================
    // Making the selected arts glow
    //
    if( hideGlow !== undefined )
    {
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
          let value = ( Ω.changer.glow[ 0 ] - Ω.changer.glow[ 0 ] / 8 )

          $.style.fill = 'rgba(255,255,255,' + ( 1 - value ) + ')'
        } )
      }
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // Updates an array containing currently targeted athletes
  //
  updTar: function()
  {
    //==========================================================================
    //
    Ω.info.target = [ [], [] ] // refresh the array (targets & zones)

    //==========================================================================
    //
    for( let $1 = 0; $1 < 16; $1 ++ )
    {
      //........................................................................
      // Look for athletes
      //
      for( let $2 = 0; $2 < 20; $2 ++ )
      {
        if( Ω.state.athlete[ $2 ][ 0 ] - 1 === Ω.state.zone[ $1 ][ 0 ]
        && Ω.state.athlete[ $2 ][ 1 ] - 1 === Ω.state.zone[ $1 ][ 1 ] )
        {
          Ω.info.target[ 0 ].push( $2 ) // targets
          Ω.info.target[ 1 ].push( $1 ) // zones
        }
      }

      //........................................................................
      // Look for the ball
      //
      if( Ω.state.ball[ 0 ] - 1 === Ω.state.zone[ $1 ][ 0 ]
      && Ω.state.ball[ 1 ] - 1 === Ω.state.zone[ $1 ][ 1 ] )
      {
        Ω.info.target[ 0 ].push( 'ball' ) // ball
        Ω.info.target[ 1 ].push( $1 ) // zone
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
        let x1 = Ω.state.athlete[ Ω.state.team.green[ $ ] ][ 0 ] - 1
        let y1 = Ω.state.athlete[ Ω.state.team.green[ $ ] ][ 1 ] - 1
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
        let x2 = Ω.state.athlete[ Ω.state.team.blue[ $ ] ][ 0 ] - 1
        let y2 = Ω.state.athlete[ Ω.state.team.blue[ $ ] ][ 1 ] - 1
        let coordinate2 = Ω.tool.convert( [ x2, y2 ] )

        //......................................................................
        //
        if( Ω.info.area.blue.indexOf( Ω._.coordinate2 ) !== -1 )
        {
          Ω.state.keeper.blue = Ω.state.team.blue[ $ ]
        }
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
    let targetLength = Ω.info.target[ 0 ].length

    if( targetLength !== 0 )
    {
      for( let $1 = 0; $1 < targetLength; $1 ++ )
      {
        //......................................................................
        // How far the zone/target is from the aiming athlete
        //
        let aimed = Ω.info.target[ 0 ][ $1 ]
        let zone = Ω.info.target[ 1 ][ $1 ]

        let pusherX = Ω.state.athlete[ Ω.state.displayed ][ 0 ] - 1
        let pusherY = Ω.state.athlete[ Ω.state.displayed ][ 1 ] - 1

        let aimedX = Ω.state.athlete[ aimed ][ 0 ] - 1
        let aimedY = Ω.state.athlete[ aimed ][ 1 ] - 1

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
        for( let $2 = 0; $2 < 20; $2 ++ )
        {
          let athleteX = Ω.state.athlete[ $2 ][ 0 ]
          let athleteY = Ω.state.athlete[ $2 ][ 1 ]

          let area

          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // Avoid athletes from being pushed to its opponent's area
          //
          if( Ω.state.athlete[ aimed ][ 2 ] === 'gre' )
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
          let athleteColor = Ω.state.athlete[ Ω.state.displayed ][ 2 ]

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
    if( Ω.state.ball[ 0 ] === 457 ) Ω.page.ball.style.zIndex = '3'
    else                            Ω.page.ball.style.zIndex = '1'
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
        x = Ω.state.ball[ 0 ] + 2
        y = Ω.state.ball[ 1 ] + 2
      }

      //........................................................................
      // Athlete is selected
      //
      else
      {
        x = Ω.state.athlete[ Ω.state.selected ][ 0 ] + 2
        y = Ω.state.athlete[ Ω.state.selected ][ 1 ] + 2
      }

      //........................................................................
      // Add a little delay so animation can begin again
      //
      setTimeout( function()
      {
        Ω.page.selection.style.display = 'flex'
        Ω.tool.translate( Ω.page.selection, x, y )
      }, 1 )
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
      if( Ω.state.athlete[ $ ][ 2 ].substring( 3, 6 ) === 'Blk' )
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
      let athleteY = Ω.state.athlete[ $ ][ 1 ]

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

      Ω.state.ball[ 0 ] = athlete[ 0 ]
      Ω.state.ball[ 1 ] = athlete[ 1 ]

      //........................................................................
      //
      Ω.state.selected = 'ball'
      Ω.state.displayed = Ω.state.selected
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
    // First round
    //
    if( Ω.state.turn === 0 )
    {
      //........................................................................
      // Athletes' initial positions
      //
      for( let $ = 0; $ < 20; $ ++ )
      {
        Ω.state.athlete[ $ ][ 0 ] = Ω.info.cell[ 12 ][ $ ][ 0 ] + 1
        Ω.state.athlete[ $ ][ 1 ] = Ω.info.cell[ 12 ][ 0 ][ 1 ] + 1
      }

      //........................................................................
      // Ball initial position
      //
      Ω.state.ball[ 0 ] = 457
      Ω.state.ball[ 1 ] = 265
    }

    //==========================================================================
    // Avoid as much as possible "everything-travelling-from-point-0" bug
    //
    setTimeout( function()
    {
      Array.from( Ω.page.animate1 ).forEach( function( $ )
      {
        $.style.transition = 'all 0.25s ease-in-out'
      } )
    }, 9 ) // beyond this value, animation on reset and reload is lost
  },

  //////////////////////////////////////////////////////////////////////////////
  //
  update: function()
  {
    Ω.game.updAtl()
    Ω.game.updBal()

    Ω.game.updZon1()
    Ω.game.updZon2()

    Ω.game.updInd()

    window.requestAnimationFrame( Ω.engine.update )
  },
}

////////////////////////////////////////////////////////////////////////////////
// Initializing the game
//
Ω.engine.create()
Ω.engine.update()
