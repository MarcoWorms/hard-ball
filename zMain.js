
'use strict'

////////////////////////////////////////////////////////////////////////////////
// Gameplay functions
//
Ω.game =
{
  //////////////////////////////////////////////////////////////////////////////
  //
  create: function()
  {
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
  updAtl: function()
  {
    //==========================================================================
    // First round
    //
    if( Ω.now.turn === 0 )
    {
      //........................................................................
      // Athletes' initial positions
      //
      for( let $ = 0; $ < 20; $ ++ )
      {
        if( Ω.now.turn === 0 )
        {
          Ω.now.athlete[ $ ][ 0 ] = Ω.info.cell[ 12 ][ $ ][ 0 ] + 1
          Ω.now.athlete[ $ ][ 1 ] = Ω.info.cell[ 12 ][ 0 ][ 1 ] + 1
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
        Ω._.x = Ω.now.athlete[ $ ][ 0 ]
        Ω._.y = Ω.now.athlete[ $ ][ 1 ]

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
    if( Ω.now.turn === 0 )
    {
      //........................................................................
      // Ball initial position
      //
      Ω.now.ball[ 0 ] = 457
      Ω.now.ball[ 1 ] = 265
    }

    //==========================================================================
    // Every other round
    //
    else Ω.tool.translate( Ω.page.ball, Ω.now.ball[ 0 ], Ω.now.ball[ 1 ] )
  },

  //////////////////////////////////////////////////////////////////////////////
  // Calls 'game.updZonCdn' differently depending on the situation
  //
  updZon1: function()
  {
    //==========================================================================
    // Undisplay every zone and refresh 'info.zone'
    //
    for( let $ = 0; $ < 16; $ ++ ) Ω.page.zone[ $ ].style.display = 'none'

    //..........................................................................
    //
    Ω.now.zone =
    (
      function()
      {
        Ω._.array = []
        for( let $ = 0; $ < 16; $ ++ ) Ω._.array.push( [ 'none', 'none' ] )
        return Ω._.array
      }()
    )

    //==========================================================================
    // If ball is hovered
    //
    if( Ω.now.hovered === 'ball' )
    {
      //........................................................................
      // Ball's initial state
      //
      if( Ω.now.ball[ 0 ] === 457 ) Ω.game.updZonCdn( 'cnt', 'hover', false )
    }

    //==========================================================================
    // If an athlete is hovered and it is unmarked
    //
    else if( Ω.now.hovered !== 'none'
    && Ω.now.marked.indexOf( Ω.now.hovered ) === -1 )
    {
      Ω._.athleteColor = Ω.now.athlete[ Ω.now.hovered ][ 2 ]

      //........................................................................
      // Hovered and unmarked athlete is ready to play
      //
      if( Ω._.athleteColor === 'none' )
      {
        if( Ω.now.turn < 8 ) Ω.game.updZonCdn( 'stt', 'select', false )
        else                 Ω.game.updZonCdn( 'rep', 'select', false )
      }

      //........................................................................
      // Hovered and unmarked athlete is playing
      //
      else if( Ω._.athleteColor.substring( 3, 6 ) !== 'Blk' )
      {
        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        // Roundabouting
        //
        if( Ω.now.hovered === Ω.now.rounding[ 0 ] )
        {
          Ω.game.updZonCdn( 'mtx', 'hover', true )
        }

        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        // Not roundabouting
        //
        else Ω.game.updZonCdn( 'mtx', 'hover', false )
      }
    }

    //==========================================================================
    // Ball is selected
    //
    else if( Ω.now.selected === 'ball' )
    {
      //........................................................................
      // Ball's initial state
      //
      if( Ω.now.ball[ 0 ] === 457 ) Ω.game.updZonCdn( 'cnt', 'hover', false )
    }

    //==========================================================================
    // Athlete is selected and is not a targeted
    //
    else if( Ω.now.selected !== 'none'
    && Ω.info.target[ 0 ].indexOf( Ω.now.selected ) === -1 )
    {
      let athleteColor = Ω.now.athlete[ Ω.now.selected ][ 2 ]

      //........................................................................
      // Selected and non-targeted athlete is ready to play
      //
      if( athleteColor === 'none' )
      {
        if( Ω.now.turn < 8 ) Ω.game.updZonCdn( 'stt', 'select', false )
        else                 Ω.game.updZonCdn( 'rep', 'select', false )
      }

      //........................................................................
      // Selected and non-targeted athlete is playing
      //
      else if( athleteColor.substring( 3, 6 ) !== 'Blk' )
      {
        if( Ω.now.selected !== 'none'
        && Ω.now.selected === Ω.now.rounding[ 0 ] )
        {
          Ω.game.updZonCdn( 'mtx', 'select', true )
        }

        else
        {
          Ω.game.updZonCdn( 'mtx', 'select', false )
        }
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
    let value = 1
    let key = true

    //==========================================================================
    // Ball is hovered
    //
    if( Ω.now.hovered === 'ball' )
    {
      //........................................................................
      // The ball hasn't moved yet
      //
      if( Ω.now.ball[ 0 ] === 457 )
      {
        value = 0.66
        key = false
      }
    }

    //==========================================================================
    // Athlete is hovered and is not a target
    //
    else if( Ω.now.hovered !== 'none'
    && Ω.info.target[ 0 ].indexOf( Ω.now.hovered ) === -1 )
    {
      //......................................................................
      // Athlete is the same color as the turn AND turn is higher than 7
      //
      if( Ω.now.athlete[ Ω.now.hovered ][ 2 ] !== Ω.now.currentPlayer
      && Ω.now.turn > 7
      //
      || Ω.now.athlete[ Ω.now.hovered ][ 2 ] !== 'none'
      && Ω.now.turn < 8
      //
      || Ω.now.rounding[ 0 ] !== 'none'
      && Ω.now.rounding[ 0 ] !== Ω.now.hovered )
      {
        value = 0.66

        if( Ω.now.athlete[ Ω.now.hovered ][ 2 ] === 'none' ) key = true
        else                                                 key = false
      }
    }

    //==========================================================================
    // Ball is selected
    //
    else if( Ω.now.selected === 'ball' )
    {
      //........................................................................
      // The ball hasn't moved yet
      //
      if( Ω.now.ball[ 0 ] === 457 )
      {
        value = 0.66
        key = false
      }
    }

    //==========================================================================
    // Athlete is selected and is not a targeted
    //
    else if( Ω.now.selected !== 'none'
    && Ω.info.target[ 0 ].indexOf( Ω.now.selected ) === -1 )
    {
      //......................................................................
      // Athlete is the same color as the turn AND turn is higher than 7
      //
      if( Ω.now.athlete[ Ω.now.selected ][ 2 ] !== Ω.now.currentPlayer
      && Ω.now.turn > 7
      //
      || Ω.now.athlete[ Ω.now.selected ][ 2 ] !== 'none'
      && Ω.now.turn < 8
      //
      || Ω.now.rounding[ 0 ] !== 'none'
      && Ω.now.rounding[ 0 ] !== Ω.now.selected )
      {
        value = 0.66

        if( Ω.now.athlete[ Ω.now.selected ][ 2 ] === 'none' ) key = true
        else                                                  key = false
      }
    }

    //==========================================================================
    // Finally apply the desired effects
    //
    Array.from( Ω.page.zone ).forEach( function( $1, $2 )
    {
      let color

      if( Ω.info.blocked.indexOf( $2 ) !== -1 ) color = '0,0,0'
      else                                      color = '255,255,255'

      $1.style.borderColor = 'rgba(' + color + ',' + value + ')'

      if( key ) $1.style.boxShadow = '0 0 0 3px rgba(' + color + ',0.5)'
      else      $1.style.boxShadow = ''
    } )
  },

  //////////////////////////////////////////////////////////////////////////////
  // Updating zones coordinates
  //
  updZonCdn: function( behavior, guide, round )
  {
    let origin
    let displayed

    if( guide === 'hover' )       origin = displayed = Ω.now.hovered
    else if( guide === 'select' ) origin = displayed = Ω.now.selected

    if( round ) origin = 18

    //==========================================================================
    // Fill 'info.zone'
    //
    let value = 0

    //==========================================================================
    // By matrix
    //
    if( behavior === 'mtx' )
    {
      let counter = 0
      let x
      let y

      //........................................................................
      // Matrix 1
      //
      if( Ω.info.move[ origin ][ 1 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 1, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 1, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )
      }

      //........................................................................
      // Matrix 2
      //
      if( Ω.info.move[ origin ][ 2 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 1, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 1, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )
      }

      //........................................................................
      // Matrix 3
      //
      if( Ω.info.move[ origin ][ 3 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 1, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 1, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )
      }

      //........................................................................
      // Matrix 4
      //
      if( Ω.info.move[ origin ][ 4 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )
      }

      //........................................................................
      // Matrix 5
      //
      if( Ω.info.move[ origin ][ 5 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )
      }

      //........................................................................
      // Matrix 6
      //
      if( Ω.info.move[ origin ][ 6 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )
      }

      //........................................................................
      // Matrix 7
      //
      if( Ω.info.move[ origin ][ 7 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )
      }

      //........................................................................
      // Matrix 8
      //
      if( Ω.info.move[ origin ][ 8 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )
      }

      //........................................................................
      // Matrix 9
      //
      if( Ω.info.move[ origin ][ 9 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ displayed ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ displayed ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( displayed, counter, x, y )
      }

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
      if( Ω.now.turn === 0 )
      {
        for( let $ = 0; $ < 8; $ ++ )
        {
          let digit
          let x
          let y

          //....................................................................
          // Show every green spawn point
          //
          if( $ < 4 )
          {
            digit = $

            x = Ω.tool.convert( Ω.now.spawn.green[ digit ] )[ 0 ]
            y = Ω.tool.convert( Ω.now.spawn.green[ digit ] )[ 1 ]
          }

          //....................................................................
          // Show every blue spawn point
          //
          else
          {
            digit = $ - 4

            x = Ω.tool.convert( Ω.now.spawn.blue[ digit ] )[ 0 ]
            y = Ω.tool.convert( Ω.now.spawn.blue[ digit ] )[ 1 ]
          }

          //....................................................................
          // Apply coordinates accordingly
          //
          Ω.info.zone[ $ ][ 0 ] = x
          Ω.info.zone[ $ ][ 1 ] = y
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
        let entity

        if( Ω.now.currentPlayer === 'gre' ) entity = Ω.now.spawn.green
        else if( Ω.now.currentPlayer === 'blu' ) entity = Ω.now.spawn.blue

        //......................................................................
        // And only as many as there are
        //
        for( let $ = 0; $ < entity.length; $ ++ )
        {
          let x = Ω.tool.convert( entity[ $ ] )[ 0 ]
          let y = Ω.tool.convert( entity[ $ ] )[ 1 ]

          //....................................................................
          // Apply coordinates accordingly
          //
          Ω.info.zone[ $ ][ 0 ] = x
          Ω.info.zone[ $ ][ 1 ] = y
        }

        value = entity.length // decreases each athlete selection (team related)
      }
    }

    //==========================================================================
    // By replacement
    //
    else if( behavior === 'rep' )
    {
      let team
      let reps

      //........................................................................
      //
      if( Ω.now.currentPlayer === 'gre' )
      {
        team = Ω.now.team.green
        reps = Ω.now.reps.green
      }
      else
      {
        team = Ω.now.team.blue
        reps = Ω.now.reps.blue
      }

      //........................................................................
      //
      for( let $ = 0; $ < 4; $ ++ )
      {
        let entity = Ω.now.athlete[ team[ $ ] ]

        Ω.info.zone[ $ ][ 0 ] = entity[ 0 ] - 1
        Ω.info.zone[ $ ][ 1 ] = entity[ 1 ] - 1
      }

      value = 4
    }

    //==========================================================================
    // By center (ball's initial state only)
    //
    else if( behavior === 'cnt' )
    {
      Ω.info.arenaCenter.forEach( function( $1, $2 )
      {
        let coordinate = Ω.tool.convert( $1 )

        Ω.info.zone[ $2 ][ 0 ] = coordinate[ 0 ]
        Ω.info.zone[ $2 ][ 1 ] = coordinate[ 1 ]
      } )

      value = 4
    }

    //==========================================================================
    // Display zones accordingly
    //
    for( let $ = 0; $ < 16; $ ++ )
    {
      if( $ < value )
      {
        let x = Ω.info.zone[ $ ][ 0 ] + 3
        let y = Ω.info.zone[ $ ][ 1 ] + 3

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
    // Defining who is to play now
    //
    if( Ω.now.firstPlayer === 'gre' )
    {
      if( Ω.now.turn % 2 === 0 ) Ω.now.currentPlayer = 'gre' // odd turn
      else                       Ω.now.currentPlayer = 'blu' // even turn
    }

    else if( Ω.now.firstPlayer === 'blu' )
    {
      if( Ω.now.turn % 2 === 0 ) Ω.now.currentPlayer = 'blu' // odd turn
      else                       Ω.now.currentPlayer = 'gre' // even turn
    }

    //==========================================================================
    // Determining which cell text is to be shown with glow effect
    //
    let hideText
    let showText

    if( Ω.now.currentPlayer === 'gre' )
    {
      hideText = Array.from( Ω.page.textBlue )
      showText = Array.from( Ω.page.textGreen )
    }

    else if( Ω.now.currentPlayer === 'blu' )
    {
      hideText = Array.from( Ω.page.textGreen )
      showText = Array.from( Ω.page.textBlue )
    }

    //==========================================================================
    // Making the selected cells glow
    //
    if( Ω.now.turn !== 0 ) // except on turn 0
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
    let hideGlow = 0
    let showGlow = 0

    if( Ω.now.currentPlayer === 'gre' )
    {
      hideGlow = Ω.now.team.blue
      showGlow = Ω.now.team.green
    }

    else if( Ω.now.currentPlayer === 'blu' )
    {
      hideGlow = Ω.now.team.green
      showGlow = Ω.now.team.blue
    }

    //==========================================================================
    // Making the selected arts glow
    //
    if( hideGlow !== 0 )
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
    Ω.info.target = [ [], [] ] // refresh the array (targets & zones)

    for( let $1 = 0; $1 < 16; $1 ++ )
    {
      //======================================================================
      // Look for athletes
      //
      for( let $2 = 0; $2 < 20; $2 ++ )
      {
        //....................................................................
        // If any athlete's X is equal to any zone's X and
        // If any athlete's Y is equal to any zone's Y
        //
        if( Ω.now.athlete[ $2 ][ 0 ] - 1 === Ω.info.zone[ $1 ][ 0 ]
        && Ω.now.athlete[ $2 ][ 1 ] - 1 === Ω.info.zone[ $1 ][ 1 ] )
        {
          Ω.info.target[ 0 ].push( $2 ) // targets
          Ω.info.target[ 1 ].push( $1 ) // zones
        }
      }

      //======================================================================
      // Look for the ball
      //
      if( Ω.now.ball[ 0 ] - 1 === Ω.info.zone[ $1 ][ 0 ]
      && Ω.now.ball[ 1 ] - 1 === Ω.info.zone[ $1 ][ 1 ] )
      {
        Ω.info.target[ 0 ].push( 'ball' ) // ball
        Ω.info.target[ 1 ].push( $1 ) // zone
      }
    }
  },

  ////////////////////////////////////////////////////////////////////////////// G.updKee
  // Updating if there's any athlete currently inside its area (goalkeeper)
  //
  updKee: function()
  {
    //==========================================================================
    //
    let x1
    let y1
    let coordinate1

    let x2
    let y2
    let coordinate2

    Ω.now.keeper.green = 'none'
    Ω.now.keeper.blue = 'none'

    //==========================================================================
    //
    if( Ω.now.turn > 7 ) // turns 8+ (so that each team is complete)
    {
      for( let $ = 0; $ < 4; $ ++ ) // test once per team athlete
      {
        //======================================================================
        // Test for green athletes
        //
        x1 = Ω.now.athlete[ Ω.now.team.green[ $ ] ][ 0 ] - 1
        y1 = Ω.now.athlete[ Ω.now.team.green[ $ ] ][ 1 ] - 1
        coordinate1 = Ω.tool.convert( [ x1, y1 ] )

        //......................................................................
        //
        if( Ω.info.area.green.indexOf( coordinate1 ) !== -1 )
        {
          Ω.now.keeper.green = Ω.now.team.green[ $ ]
        }

        //======================================================================
        // Test for blue athletes
        //
        x2 = Ω.now.athlete[ Ω.now.team.blue[ $ ] ][ 0 ] - 1
        y2 = Ω.now.athlete[ Ω.now.team.blue[ $ ] ][ 1 ] - 1
        coordinate2 = Ω.tool.convert( [ x2, y2 ] )

        //......................................................................
        //
        if( Ω.info.area.blue.indexOf( coordinate2 ) !== -1 )
        {
          Ω.now.keeper.blue = Ω.now.team.blue[ $ ]
        }
      }
    }
  },

  ////////////////////////////////////////////////////////////////////////////// G.updBlk
  // Changes the color of a zone to red if targeted athlete cannot be pushed
  //
  updBlk: function()
  {
    // Refreshes which cell is blocked
    //
    Ω.info.blocked = []

    // Full process
    //
    let targetLength = Ω.info.target[ 0 ].length

    if( targetLength !== 0
    && Ω.now.displayed !== 'none'
    && Ω.now.displayed !== 'ball' )
    {
      for( let $1 = 0; $1 < targetLength; $1 ++ )
      {
        // How far the zone/target is from the aiming athlete
        //
        let aimed = Ω.info.target[ 0 ][ $1 ]
        let zone = Ω.info.target[ 1 ][ $1 ]

        let pusherX = Ω.now.athlete[ Ω.now.displayed ][ 0 ] - 1
        let pusherY = Ω.now.athlete[ Ω.now.displayed ][ 1 ] - 1

        let aimedX = Ω.now.athlete[ aimed ][ 0 ] - 1
        let aimedY = Ω.now.athlete[ aimed ][ 1 ] - 1

        let distanceX = pusherX - aimedX
        let distanceY = pusherY - aimedY

        let newX = aimedX - distanceX
        let newY = aimedY - distanceY

        let blockedX = Ω.tool.bend( newX, 'x' )
        let blockedY = Ω.tool.bend( newY, 'y' )

        let coordinate = Ω.tool.convert( [ blockedX, blockedY ] )

        // Testing if there are athletes impeding the push action
        //
        for( let $2 = 0; $2 < 20; $2 ++ )
        {
          let athleteX = Ω.now.athlete[ $2 ][ 0 ]
          let athleteY = Ω.now.athlete[ $2 ][ 1 ]

          let area

          // Avoid athletes from being pushed to its opponent's area
          //
          if( Ω.now.athlete[ aimed ][ 2 ] === 'gre' )
          {
            area = Ω.info.area.blue
            if( Ω.now.keeper.green !== 'none' ) area += Ω.info.area.green
          }

          else
          {
            area = Ω.info.area.green
            if( Ω.now.keeper.blue !== 'none' ) area += Ω.info.area.blue
          }

          // Checking if it's possible to push or not
          //
          if( area.indexOf( coordinate ) === -1 )
          {
            if( blockedX === athleteX - 1 )
            {
              if( blockedY === athleteY - 1 )
              {
                Ω.info.blocked.push( zone )
              }
            }
          }

          // Part of opponent's area
          //
          else
          {
            Ω.info.blocked.push( zone )
          }

          //====================================================================
          // UNRELATED TO ACTUAL BLOCKED-CELL TRACKING (code above)
          //
          // Shows that is not possible to further replace athletes
          //
          let turnColor = Ω.now.currentPlayer
          let athleteColor = Ω.now.athlete[ Ω.now.displayed ][ 2 ]
          let replacementsLeft

          if( turnColor === 'gre' ) replacementsLeft = Ω.now.reps.green
          else                      replacementsLeft = Ω.now.reps.blue

          if( athleteColor === 'none'
          && replacementsLeft === 0 )
          {
            Ω.info.blocked.push( zone )
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

      if( Ω.now.selected === $2 || Ω.now.pushed === $2 ) value = '3'

      $1.style.zIndex = value
    } )

    //==========================================================================
    // Update the ball's index
    //
    if( Ω.now.ball[ 0 ] === 457 ) Ω.page.ball.style.zIndex = '3'
    else                          Ω.page.ball.style.zIndex = '1'
  },

  //////////////////////////////////////////////////////////////////////////////
  // Cannot update selection zone every tick! It's updated at 'listen.clicker'
  //
  updSel: function()
  {
    Ω.page.selection.style.display = 'none' // So animation can begin again

    if( Ω.now.selected !== 'none' ) // if there is anything selected
    {
      let x
      let y

      //========================================================================
      // Determining wheter an athlete or the ball is selected and changing the
      // selection zone's position to its
      //
      if( Ω.now.selected === 'ball' )
      {
        x = Ω.now.ball[ 0 ] + 2
        y = Ω.now.ball[ 1 ] + 2
      }

      else
      {
        x = Ω.now.athlete[ Ω.now.selected ][ 0 ] + 2
        y = Ω.now.athlete[ Ω.now.selected ][ 1 ] + 2
      }

      //========================================================================
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
    for( let $1 = 0; $1 < 20; $1 ++ )
    {
      if( Ω.now.athlete[ $1 ][ 2 ].substring( 3, 6 ) === 'Blk' )
      {
        Ω.page.athlete[ $1 ].style.borderColor = 'black'

        Array.from( Ω.page.glow[ $1 ] ).forEach( function( $2 )
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
    Ω.now.rounded = []

    for( let $ = 0; $ < 20; $ ++ )
    {
      let athleteY = Ω.now.athlete[ $ ][ 1 ]

      if( athleteY < 50
      //
      || athleteY > 480
      && athleteY < 584)
      {
        Ω.now.rounded.push( $ )
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
    if( Ω.now.newHolder !== 'none' )
    {
      //........................................................................
      //
      let athlete = Ω.now.athlete[ Ω.now.selected ]

      Ω.now.ball[ 0 ] = athlete[ 0 ]
      Ω.now.ball[ 1 ] = athlete[ 1 ]

      Ω.now.selected = 'ball'
      Ω.now.displayed = Ω.now.selected
    }
  },
}

////////////////////////////////////////////////////////////////////////////////
// Initializing the game
//
// Ω.game.create()
