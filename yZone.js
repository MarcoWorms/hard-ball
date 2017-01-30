
'use strict'

////////////////////////////////////////////////////////////////////////////////
// Specialized gameplay functions
//
Ω.zone =
{
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
      if( Ω.state.ball.x === 457 ) Ω.zone.updZonCdn( 'cnt', false )
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
        if( Ω.state.turn < 8 ) Ω.zone.updZonCdn( 'stt', false )
        else                   Ω.zone.updZonCdn( 'rep', false )
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
          Ω.zone.updZonCdn( 'mtx', true )
        }

        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        // Not roundabouting
        //
        else Ω.zone.updZonCdn( 'mtx', false )
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
}
