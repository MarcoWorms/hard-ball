
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
    // First round
    //
    if( Ω.state.turn === 0 )
    {
      //........................................................................
      // Athletes' initial positions
      //
      for( let $ = 0; $ < 20; $ ++ )
      {
        if( Ω.state.turn === 0 )
        {
          Ω.state.athlete[ $ ][ 0 ] = Ω.info.cell[ 12 ][ $ ][ 0 ] + 1
          Ω.state.athlete[ $ ][ 1 ] = Ω.info.cell[ 12 ][ 0 ][ 1 ] + 1
        }
      }
    }

    //==========================================================================
    // Every other round
    //
    else
    {
      for( let $ = 0; $ < 20; $ ++ )
      {
        Ω._.x = Ω.state.athlete[ $ ][ 0 ]
        Ω._.y = Ω.state.athlete[ $ ][ 1 ]

        Ω.tool.translate( Ω.page.athlete[ $ ], Ω._.x, Ω._.y )
      }
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  //
  updBal: function()
  {
    //==========================================================================
    // First round
    //
    if( Ω.state.turn === 0 )
    {
      //........................................................................
      // Ball initial position
      //
      Ω.state.ball[ 0 ] = 457
      Ω.state.ball[ 1 ] = 265
    }

    //==========================================================================
    // Every other round
    //
    else Ω.tool.translate( Ω.page.ball, Ω.state.ball[ 0 ], Ω.state.ball[ 1 ] )
  },

  //////////////////////////////////////////////////////////////////////////////
  // Calls 'game.updZonCdn' differently depending on the situation
  //
  updZon1: function()
  {
    //==========================================================================
    // Undisplay every zone and refresh 'info.zone'
    //
    for( Ω.$ = 0; Ω.$ < 16; Ω.$ ++ ) Ω.page.zone[ Ω.$ ].style.display = 'none'

    //..........................................................................
    //
    Ω.state.zone =
    (
      function()
      {
        Ω._.array = []
        for( Ω.$ = 0; Ω.$ < 16; Ω.$ ++ ) Ω._.array.push( [ 'none', 'none' ] )
        return Ω._.array
      }()
    )

    //==========================================================================
    // Ball is hovered
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
      Ω._.athleteColor = Ω.state.athlete[ Ω.state.hovered ][ 2 ]

      //........................................................................
      // Displayed and unmarked athlete is ready to play
      //
      if( Ω._.athleteColor === 'none' )
      {
        if( Ω.state.turn < 8 ) Ω.game.updZonCdn( 'stt', false )
        else                   Ω.game.updZonCdn( 'rep', false )
      }

      //........................................................................
      // Displayed and unmarked athlete is playing
      //
      else if( Ω._.athleteColor.substring( 3, 6 ) !== 'Blk' )
      {
        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        // Roundabouting
        //
        if( Ω.state.hovered === Ω.state.rounding[ 0 ] )
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
  // Updates the appearance of zones depending on the situation
  //
  updZon2: function()
  {
    //==========================================================================
    // Determining how are zones to be shown
    //
    Ω._.value = 1
    Ω._.key = true

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
        Ω._.value = 0.66
        Ω._.key = false
      }
    }

    //==========================================================================
    // Displayed athlete is unmarked
    //
    else if( Ω.state.displayed !== 'none'
    && Ω.info.marked.indexOf( Ω.state.displayed ) === -1 )
    {
      //........................................................................
      // If team-selection time is still going on
      // And displayed athlete is ready to play
      //
      if Ω.state.turn < 8
      && Ω.state.athlete[ Ω.state.displayed ][ 2 ] !== 'none'
      //
      // Or if team-selection time is over
      // And athlete isn't the same color as the turn
      //
      || Ω.state.turn > 7
      &&( Ω.state.athlete[ Ω.state.displayed ][ 2 ] !== Ω.state.currentPlayer
      //
      // Or if there is someone roundabouting
      // And the athlete isn't the one doing it
      //
      || Ω.state.rounding[ 0 ] !== 'none'
      && Ω.state.rounding[ 0 ] !== Ω.state.displayed )
      {
        Ω._.value = 0.66

        if( Ω.state.athlete[ Ω.state.hovered ][ 2 ] === 'none' ) Ω._.key = true
        else                                                     Ω._.key = false
      }
    }

    //==========================================================================
    // Finally apply the desired effects
    //
    Array.from( Ω.page.zone ).forEach( function( $1, $2 )
    {
      if( Ω.info.blocked.indexOf( $2 ) !== -1 ) Ω._.color = '0,0,0'
      else                                      Ω._.color = '255,255,255'

      $1.style.borderColor = 'rgba(' + Ω._.color + ',' + Ω._.value + ')'

      if( Ω._.key ) $1.style.boxShadow = '0 0 0 3px rgba(' + Ω._.color + ',0.5)'
      else          $1.style.boxShadow = ''
    } )
  },

  //////////////////////////////////////////////////////////////////////////////
  // Updating zones coordinates
  //
  updZonCdn: function( behavior, round )
  {
    if( round ) Ω._.origin = 18
    else        Ω._.origin = Ω.state.displayed

    //==========================================================================
    // Fill 'info.zone'
    //==========================================================================
    // By matrix
    //
    if( behavior === 'mtx' )
    {
      Ω._.counter = 0

      Ω._.athleteX = Ω.state.athlete[ Ω.state.displayed ][ 0 ]
      Ω._.athleteX = Ω.state.athlete[ Ω.state.displayed ][ 1 ]

      //........................................................................
      // Matrix 1
      //
      if( Ω.info.move[ Ω._.origin ][ 1 ] === 1 )
      {
        Ω._.x = Ω.tool.bend( Ω._.athleteX + 47, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 1, 'y' )
        Ω._.counter += Ω.tool.isZone(Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 49, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 1, 'y' )
        Ω._.counter += Ω.tool.isZone(Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 1, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 47, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 1, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 49, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )
      }

      //........................................................................
      // Matrix 2
      //
      if( Ω.info.move[ Ω._.origin ][ 2 ] === 1 )
      {
        Ω._.x = Ω.tool.bend( Ω._.athleteX + 95, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 1, 'y' )
        Ω._.counter += Ω.tool.isZone(Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 97, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 1, 'y' )
        Ω._.counter += Ω.tool.isZone(Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 1, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 95, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 1, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 97, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )
      }

      //........................................................................
      // Matrix 3
      //
      if( Ω.info.move[ Ω._.origin ][ 3 ] === 1 )
      {
        Ω._.x = Ω.tool.bend( Ω._.athleteX + 143, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 1, 'y' )
        Ω._.counter += Ω.tool.isZone(Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 145, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 1, 'y' )
        Ω._.counter += Ω.tool.isZone(Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 1, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 143, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 1, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 145, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )
      }

      //........................................................................
      // Matrix 4
      //
      if( Ω.info.move[ Ω._.origin ][ 4 ] === 1 )
      {
        Ω._.x = Ω.tool.bend( Ω._.athleteX + 47, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 47, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX + 47, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 49, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 49, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 49, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 49, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 47, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )
      }

      //........................................................................
      // Matrix 5
      //
      if( Ω.info.move[ Ω._.origin ][ 5 ] === 1 )
      {
        Ω._.x = Ω.tool.bend( Ω._.athleteX + 47, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 95, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 49, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 95, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 97, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 47, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 97, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 49, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 49, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 97, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX + 47, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 97, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX + 95, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 49, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX + 95, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 47, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )
      }

      //........................................................................
      // Matrix 6
      //
      if( Ω.info.move[ Ω._.origin ][ 6 ] === 1 )
      {
        Ω._.x = Ω.tool.bend( Ω._.athleteX + 47, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 143, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 49, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 143, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 145, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 47, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 145, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 49, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 49, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 145, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX + 47, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 145, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX + 143, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 49, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX + 143, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 47, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )
      }

      //........................................................................
      // Matrix 7
      //
      if( Ω.info.move[ Ω._.origin ][ 7 ] === 1 )
      {
        Ω._.x = Ω.tool.bend( Ω._.athleteX + 95, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 95, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX + 95, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 97, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 97, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 97, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 97, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 95, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )
      }

      //........................................................................
      // Matrix 8
      //
      if( Ω.info.move[ Ω._.origin ][ 8 ] === 1 )
      {
        Ω._.x = Ω.tool.bend( Ω._.athleteX + 95, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 143, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 97, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 143, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 145, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 95, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 145, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 97, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 97, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 145, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX + 95, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 145, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX + 143, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 97, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX + 143, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 95, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )
      }

      //........................................................................
      // Matrix 9
      //
      if( Ω.info.move[ Ω._.origin ][ 9 ] === 1 )
      {
        Ω._.x = Ω.tool.bend( Ω._.athleteX + 143, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 143, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX + 143, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 145, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 145, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY - 145, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )

        Ω._.x = Ω.tool.bend( Ω._.athleteX - 145, 'x' )
        Ω._.y = Ω.tool.bend( Ω._.athleteY + 143, 'y' )
        Ω._.counter += Ω.tool.isZone( Ω._.counter, Ω._.x, Ω._.y )
      }

      //........................................................................
      //
      Ω._.value = Ω._.counter
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
        for( Ω.$ = 0; Ω.$ < 8; Ω.$ ++ )
        {
          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // Show every green spawn point
          //
          if( Ω.$ < 4 )
          {
            Ω._.x = Ω.tool.convert( Ω.state.spawn.green[ Ω.$ ] )[ 0 ]
            Ω._.y = Ω.tool.convert( Ω.state.spawn.green[ Ω.$ ] )[ 1 ]
          }

          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // Show every blue spawn point
          //
          else
          {
            Ω._.x = Ω.tool.convert( Ω.state.spawn.blue[ Ω.$ - 4 ] )[ 0 ]
            Ω._.y = Ω.tool.convert( Ω.state.spawn.blue[ Ω.$ - 4 ] )[ 1 ]
          }

          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // Apply coordinates accordingly
          //
          Ω.info.zone[ Ω.$ ][ 0 ] = Ω._.x
          Ω.info.zone[ Ω.$ ][ 1 ] = Ω._.y
        }

        Ω._.value = 8 // always 8 zones in turn 0
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
        for( Ω.$ = 0; Ω.$ < Ω._.spawn.length; Ω.$ ++ )
        {
          Ω._.x = Ω.tool.convert( Ω._.spawn[ Ω.$ ] )[ 0 ]
          Ω._.y = Ω.tool.convert( Ω._.spawn[ Ω.$ ] )[ 1 ]

          Ω.info.zone[ Ω.$ ][ 0 ] = Ω._.x
          Ω.info.zone[ Ω.$ ][ 1 ] = Ω._.y
        }

        //......................................................................
        // The number decreases each at athlete selection (team related)
        //
        Ω._.value = Ω._.spawn.length
      }
    }

    //==========================================================================
    // By replacement
    //
    else if( behavior === 'rep' )
    {
      //........................................................................
      //
      if( Ω.state.currentPlayer === 'gre' ) Ω._.team = Ω.state.team.green
      else                                  Ω._.team = Ω.state.team.blue

      //........................................................................
      //
      for( Ω.$ = 0; Ω.$ < 4; Ω.$ ++ )
      {
        Ω._.playingAthlete = Ω.state.athlete[ Ω._.team[ Ω.$ ] ]

        Ω.info.zone[ Ω.$ ][ 0 ] = Ω._.playingAthlete[ 0 ] - 1
        Ω.info.zone[ Ω.$ ][ 1 ] = Ω._.playingAthlete[ 1 ] - 1
      }

      //........................................................................
      //
      Ω._.value = 4
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
        Ω._.coordinate = Ω.tool.convert( $1 )

        Ω.info.zone[ $2 ][ 0 ] = Ω._.coordinate[ 0 ]
        Ω.info.zone[ $2 ][ 1 ] = Ω._.coordinate[ 1 ]
      } )

      //........................................................................
      //
      Ω._.value = 4
    }

    //==========================================================================
    // Display zones accordingly
    //
    for( Ω.$ = 0; Ω.$ < 16; Ω.$ ++ )
    {
      if( Ω.$ < Ω._.value )
      {
        Ω._.x = Ω.info.zone[ Ω.$ ][ 0 ] + 3
        Ω._.y = Ω.info.zone[ Ω.$ ][ 1 ] + 3

        Ω.tool.translate( Ω.page.zone[ Ω.$ ], Ω._.x, Ω._.y )
        Ω.tool.rotate( Ω.page.zone[ Ω.$ ], 1 )

        Ω.page.zone[ Ω.$ ].style.display = 'flex'
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
    if( Ω.state.currentPlayer === 'gre' )
    {
      Ω._.hideText = Array.from( Ω.page.textBlue )
      Ω._.showText = Array.from( Ω.page.textGreen )
    }

    else if( Ω.state.currentPlayer === 'blu' )
    {
      Ω._.hideText = Array.from( Ω.page.textGreen )
      Ω._.showText = Array.from( Ω.page.textBlue )
    }

    //==========================================================================
    // Making the selected cells glow
    //
    if( Ω.state.turn !== 0 ) // except on turn 0
    {
      //........................................................................
      //
      Ω._.hideText.forEach( ( $ ) =>
      {
        $.style.color = 'rgba(255,255,255,0.25)'
        $.style.textShadow = ''
      } )

      //........................................................................
      //
      Ω._.showText.forEach( ( $ ) =>
      {
        Ω._.value = Ω.changer.glow[ 0 ]

        $.style.color = 'rgba(255,255,255,' + Ω._.value + ')'
        $.style.textShadow = '0 0 4px rgba(255,255,255,' + Ω._.value + ')'
      } )
    }

    //==========================================================================
    // Determining which athlete art is to be shown with glow effect
    //
    Ω._.hideGlow = 0
    Ω._.showGlow = 0

    if( Ω.state.currentPlayer === 'gre' )
    {
      Ω._.hideGlow = Ω.state.team.blue
      Ω._.showGlow = Ω.state.team.green
    }

    else if( Ω.state.currentPlayer === 'blu' )
    {
      Ω._.hideGlow = Ω.state.team.green
      Ω._.showGlow = Ω.state.team.blue
    }

    //==========================================================================
    // Making the selected arts glow
    //
    if( Ω._.hideGlow !== 0 )
    {
      //........................................................................
      //
      for( Ω.$ = 0; Ω.$ < Ω._.hideGlow.length; Ω.$ ++ )
      {
        Array.from( Ω.page.glow[ Ω._.hideGlow[ Ω.$ ] ] ).forEach( function( $ )
        {
          $.style.fill = 'rgba(255,255,255,0.75)'
        } )
      }

      //........................................................................
      //
      for( Ω.$ = 0; Ω.$ < Ω._.showGlow.length; Ω.$ ++ )
      {
        Array.from( Ω.page.glow[ Ω._.showGlow[ Ω.$ ] ] ).forEach( function( $ )
        {
          Ω._.value = ( Ω.changer.glow[ 0 ] - Ω.changer.glow[ 0 ] / 8 )

          $.style.fill = 'rgba(255,255,255,' + ( 1 - Ω._.value ) + ')'
        } )
      }
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // Updates an array containing currently targeted athletes
  //
  updTar: function()
  {
    Ω.info.target = [ [], [] ] // refresh the array (targets & zones)

    for( Ω.$1 = 0; Ω.$1 < 16; Ω.$1 ++ )
    {
      //========================================================================
      // Look for athletes
      //
      for( Ω.$2 = 0; Ω.$2 < 20; Ω.$2 ++ )
      {
        //......................................................................
        //
        if( Ω.state.athlete[ Ω.$2 ][ 0 ] - 1 === Ω.info.zone[ Ω.$1 ][ 0 ]
        && Ω.state.athlete[ Ω.$2 ][ 1 ] - 1 === Ω.info.zone[ Ω.$1 ][ 1 ] )
        {
          Ω.info.target[ 0 ].push( Ω.$2 ) // targets
          Ω.info.target[ 1 ].push( Ω.$1 ) // zones
        }
      }

      //========================================================================
      // Look for the ball
      //
      if( Ω.state.ball[ 0 ] - 1 === Ω.info.zone[ Ω.$1 ][ 0 ]
      && Ω.state.ball[ 1 ] - 1 === Ω.info.zone[ Ω.$1 ][ 1 ] )
      {
        Ω.info.target[ 0 ].push( 'ball' ) // ball
        Ω.info.target[ 1 ].push( Ω.$1 ) // zone
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
      for( Ω.$ = 0; Ω.$ < 4; Ω.$ ++ ) // test once per team athlete
      {
        //======================================================================
        // Test for green athletes
        //
        Ω._.x1 = Ω.state.athlete[ Ω.state.team.green[ Ω.$ ] ][ 0 ] - 1
        Ω._.y1 = Ω.state.athlete[ Ω.state.team.green[ Ω.$ ] ][ 1 ] - 1
        Ω._.coordinate1 = Ω.tool.convert( [ Ω._.x1, Ω._.y1 ] )

        //......................................................................
        //
        if( Ω.info.area.green.indexOf( Ω._.coordinate1 ) !== -1 )
        {
          Ω.state.keeper.green = Ω.state.team.green[ Ω.$ ]
        }

        //======================================================================
        // Test for blue athletes
        //
        Ω._.x2 = Ω.state.athlete[ Ω.state.team.blue[ Ω.$ ] ][ 0 ] - 1
        Ω._.y2 = Ω.state.athlete[ Ω.state.team.blue[ Ω.$ ] ][ 1 ] - 1
        Ω._.coordinate2 = Ω.tool.convert( [ Ω._.x2, Ω._.y2 ] )

        //......................................................................
        //
        if( Ω.info.area.blue.indexOf( Ω._.coordinate2 ) !== -1 )
        {
          Ω.state.keeper.blue = Ω.state.team.blue[ Ω.$ ]
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
    Ω.info.blocked = []

    //==========================================================================
    // If there are targets
    //
    Ω._.targetLength = Ω.info.target[ 0 ].length

    if( Ω._.targetLength !== 0 )
    {
      for( Ω._.$1 = 0; Ω._.$1 < Ω._.targetLength; Ω._.$1 ++ )
      {
        //......................................................................
        // How far the zone/target is from the aiming athlete
        //
        Ω._.aimed = Ω.info.target[ 0 ][ Ω._.$1 ]
        Ω._.zone = Ω.info.target[ 1 ][ Ω._.$1 ]

        Ω._.pusherX = Ω.state.athlete[ Ω.state.displayed ][ 0 ] - 1
        Ω._.pusherY = Ω.state.athlete[ Ω.state.displayed ][ 1 ] - 1

        Ω._.aimedX = Ω.state.athlete[ Ω._.aimed ][ 0 ] - 1
        Ω._.aimedY = Ω.state.athlete[ Ω._.aimed ][ 1 ] - 1

        Ω._.distanceX = Ω._.pusherX - Ω._.aimedX
        Ω._.distanceY = Ω._.pusherY - Ω._.aimedY

        Ω._.newX = Ω._.aimedX - Ω._.distanceX
        Ω._.newY = Ω._.aimedY - Ω._.distanceY

        Ω._.blockedX = Ω.tool.bend( Ω._.newX, 'x' )
        Ω._.blockedY = Ω.tool.bend( Ω._.newY, 'y' )

        Ω._.coordinate = Ω.tool.convert( [ Ω._.blockedX, Ω._.blockedY ] )

        //......................................................................
        // Testing if there are athletes impeding the push action
        //
        for( Ω._.$2 = 0; Ω._.$2 < 20; Ω._.$2 ++ )
        {
          Ω._.athleteX = Ω.state.athlete[ Ω._.$2 ][ 0 ]
          Ω._.athleteY = Ω.state.athlete[ Ω._.$2 ][ 1 ]

          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // Avoid athletes from being pushed to its opponent's area
          //
          if( Ω.state.athlete[ aimed ][ 2 ] === 'gre' )
          {
            Ω._.area = Ω.info.area.blue

            if( Ω.state.keeper.green !== 'none' )
            {
              Ω._.area += Ω.info.area.green
            }
          }

          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          //
          else
          {
            Ω._.area = Ω.info.area.green

            if( Ω.state.keeper.blue !== 'none' )
            {
              Ω._.area += Ω.info.area.blue
            }
          }

          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // If coordinate isn't in the athletes area
          // And if there isn't any athlete impeding the route completion
          //
          if( Ω._.area.indexOf( Ω._.coordinate ) === -1
          && Ω._.blockedX === Ω._.athleteX - 1
          && Ω._.blockedY === Ω._.athleteY - 1 )
          {
            Ω.info.blocked.push( Ω._.zone )
          }

          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // If zone is part of the opponent's area
          //
          else
          {
            Ω.info.blocked.push( Ω._.zone )
          }

          //////////////////////////////////////////////////////////////////////
          // UNRELATED TO ACTUAL BLOCKED-CELL TRACKING (code above)
          //////////////////////////////////////////////////////////////////////
          // Shows that is not possible to further replace athletes
          //
          Ω._.turnColor = Ω.state.currentPlayer
          Ω._.athleteColor = Ω.state.athlete[ Ω.state.displayed ][ 2 ]

          if( Ω._.turnColor === 'gre' ) Ω._.replacesLeft = Ω.state.reps.green
          else                          Ω._.replacesLeft = Ω.state.reps.blue

          if( Ω._.athleteColor === 'none'
          && Ω._.replacesLeft === 0 )
          {
            Ω.info.blocked.push( Ω._.zone )
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
      Ω._.value = '1'

      if( Ω.state.selected === $2 || Ω.state.pushed === $2 ) Ω._.value = '3'

      $1.style.zIndex = Ω._.value
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

    //..........................................................................
    // Ball is selected
    //
    if( Ω.state.selected === 'ball' )
    {
      Ω._.x = Ω.state.ball[ 0 ] + 2
      Ω._.y = Ω.state.ball[ 1 ] + 2
    }

    //..........................................................................
    // Athlete is selected
    //
    else
    {
      Ω._.x = Ω.state.athlete[ Ω.state.selected ][ 0 ] + 2
      Ω._.y = Ω.state.athlete[ Ω.state.selected ][ 1 ] + 2
    }

    //..........................................................................
    // Add a little delay so animation can begin again
    //
    setTimeout( function()
    {
      Ω.page.selection.style.display = 'flex'
      Ω.tool.translate( Ω.page.selection, Ω._.x, Ω._.y )
    }, 1 )
  },

  //////////////////////////////////////////////////////////////////////////////
  // Colorize replaced athletes
  //
  updRpl: function()
  {
    for( Ω.$1 = 0; Ω.$1 < 20; Ω.$1 ++ )
    {
      if( Ω.state.athlete[ Ω.$1 ][ 2 ].substring( 3, 6 ) === 'Blk' )
      {
        Ω.page.athlete[ Ω.$1 ].style.borderColor = 'black'

        Array.from( Ω.page.glow[ Ω.$1 ] ).forEach( function( $2 )
        {
          $2.style.fill = 'rgba(255,255,255,0.5)'
        } )
      }
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // Updates an array containing the numbers of the athletes in the roundabout
  //
  updRdb: function()
  {
    Ω.state.rounded = []

    for( Ω.$ = 0; Ω.$ < 20; Ω.$ ++ )
    {
      Ω._.athleteY = Ω.state.athlete[ Ω.$ ][ 1 ]

      if( Ω._.athleteY < 50 || Ω._.athleteY > 480 && Ω._.athleteY < 584)
      {
        Ω.state.rounded.push( Ω.$ )
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
      Ω._.athlete = Ω.state.athlete[ Ω.state.selected ]

      Ω.state.ball[ 0 ] = Ω._.athlete[ 0 ]
      Ω.state.ball[ 1 ] = Ω._.athlete[ 1 ]

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
    window.requestAnimationFrame( Ω.engine.update )
  },
}

////////////////////////////////////////////////////////////////////////////////
// Initializing the game
//
// Ω.engine.create()
// Ω.engine.update()
