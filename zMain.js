
'use strict'

//////////////////////////////////////////////////////////////////////////////// SAVE
// Keeps the game saved in the browser's LOCAL STORAGE
//
Ω.save =
{
  ////////////////////////////////////////////////////////////////////////////// S.create
  //
  create: function()
  {
    localStorage.setItem( 'first', JSON.stringify( Ω.now ) ) // create backup

    if( 'last' in localStorage ) // if there is a saved file
    {
      Ω.now = JSON.parse( localStorage.getItem( 'last' ) ) // load it
    }
  },

  ////////////////////////////////////////////////////////////////////////////// S.update
  //
  update: function()
  {
    localStorage.setItem( 'last', JSON.stringify( Ω.now ) ) // save file
  },
}

//////////////////////////////////////////////////////////////////////////////// GAME
// Gameplay functions
//
Ω.game =
{
  ////////////////////////////////////////////////////////////////////////////// G.create
  //
  create: function()
  {
    if( Ω.now.turn === 0 )
    {
      //========================================================================
      // Ball initial position
      //
      Ω.now.ball[ 0 ] = 457
      Ω.now.ball[ 1 ] = 265

      //========================================================================
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
    // Avoids 'fast-hover' bug right after reloading with a selected athlete
    //
    Ω.now.marked = Ω.info.target[ 0 ]

    //==========================================================================
    // Preserving the selection zone's appearance on loads
    //
    Ω.game.updSel()

    //==========================================================================
    // Avoiding unwanted parts of animations during first load and resets
    //
    setTimeout( function()
    {
      Array.from( Ω.page.animate1 ).forEach( function( $ )
      {
        $.style.transition = 'all 0.25s ease-in-out'
      } )
    }, 9 ) // beyond this value, animation on reset and reload is lost

    Ω.game.updRpl()
  },

  ////////////////////////////////////////////////////////////////////////////// G.update
  //
  update: function()
  {
    Ω.game.updAtl()
    Ω.game.updBal()

    Ω.game.updZon1()
    Ω.game.updZon2()

    Ω.game.updCur()
    Ω.game.updTar()
    Ω.game.updKee()
    Ω.game.updBlk()
    Ω.game.updInd()

    // having both 'game.updZon1' and 'game.updZon2' after 'game.updInd' makes
    // the hover effect non-existant after any athlete gets selected
  },

  ////////////////////////////////////////////////////////////////////////////// G.updAtl
  //
  updAtl: function()
  {
    for( let $ = 0; $ < 20; $ ++ )
    {
      let x = Ω.now.athlete[ $ ][ 0 ]
      let y = Ω.now.athlete[ $ ][ 1 ]

      Ω.tool.translate( Ω.page.athlete[ $ ], x, y )
    }
  },

  ////////////////////////////////////////////////////////////////////////////// G.updBal
  //
  updBal: function()
  {
    let x = Ω.now.ball[ 0 ]
    let y = Ω.now.ball[ 1 ]

    Ω.tool.translate( Ω.page.ball, x, y )
  },

  ////////////////////////////////////////////////////////////////////////////// G.updZon1
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
    Ω.info.zone =
    (
      function()
      {
        let array = []
        for( let $ = 0; $ < 16; $ ++ ) array.push( [ 'none', 'none' ] )
        return array
      }()
    )

    //==========================================================================
    // Ball is hovered
    //
    if( Ω.now.hovered === 'ball' )
    {
      // tbd
    }

    //==========================================================================
    // Athlete is hovered and is not a target and is not marked
    //
    else if( Ω.now.hovered !== 'none'
    && Ω.info.target[ 0 ].indexOf( Ω.now.hovered ) === -1
    && Ω.info.marked.indexOf( Ω.now.hovered ) === -1 )
    {
      let athleteColor = Ω.now.athlete[ Ω.now.hovered ][ 2 ]

      //........................................................................
      // Hovered and non-targeted athlete is ready to play
      //
      if( athleteColor === 'none' )
      {
        if( Ω.now.turn < 8 ) Ω.game.updZonCdn( 'stt', 'select' )
        else                 Ω.game.updZonCdn( 'rep', 'select' )
      }

      //........................................................................
      // Hovered and non-targeted athlete is playing
      //
      else if( athleteColor.substring( 3, 6 ) !== 'Blk' )
      {
        Ω.game.updZonCdn( 'mtx', 'hover' )
      }
    }

    //==========================================================================
    // Ball is selected
    //
    else if( Ω.now.selected === 'ball' )
    {
      // tbd
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
        if( Ω.now.turn < 8 ) Ω.game.updZonCdn( 'stt', 'select' )
        else                 Ω.game.updZonCdn( 'rep', 'select' )
      }

      //........................................................................
      // Selected and non-targeted athlete is playing
      //
      else if( athleteColor.substring( 3, 6 ) !== 'Blk' )
      {
        Ω.game.updZonCdn( 'mtx', 'select' )
      }
    }
  },

  ////////////////////////////////////////////////////////////////////////////// G.updZon2
  // Updates the appearance of zones depending on the situation
  //
  updZon2: function()
  {
    //==========================================================================
    // Determining how are zones to be shown
    //
    let current = Ω.now.currentPlayer // 'gre' or 'blu' turn

    let key = true
    let value = 1

    //==========================================================================
    // Ball is hovered
    //
    if( Ω.now.hovered === 'ball' )
    {
      // tbd
    }

    //==========================================================================
    // Athlete is hovered and is not a target
    //
    else if( Ω.now.hovered !== 'none'
    && Ω.info.target[ 0 ].indexOf( Ω.now.hovered ) === -1 )
    {
      //........................................................................
      // Hovered and non-targeted athlete is ready to play
      //
      if( Ω.now.athlete[ Ω.now.hovered ][ 2 ] === 'none' )
      {
        // tbd
      }

      //........................................................................
      // Hovered and non-targeted athlete is playing
      //
      else
      {
        //......................................................................
        // Athlete is the same color as the turn AND turn is higher than 7
        //
        if( Ω.now.athlete[ Ω.now.hovered ][ 2 ] !== current
        //
        || Ω.now.turn < 8 )
        {
          value = 0.66
          key = false
        }
      }
    }

    //==========================================================================
    // Ball is selected
    //
    else if( Ω.now.selected === 'ball' )
    {
      // tbd
    }

    //==========================================================================
    // Athlete is selected and is not a targeted
    //
    else if( Ω.now.selected !== 'none'
    && Ω.info.target[ 0 ].indexOf( Ω.now.selected ) === -1 )
    {
      //........................................................................
      // Selected and non-targeted athlete is ready to play
      //
      if( Ω.now.athlete[ Ω.now.selected ][ 2 ] === 'none' )
      {
      }

      //........................................................................
      // Selected and non-targeted athlete is playing
      //
      else
      {
        //......................................................................
        // Athlete is the same color as the turn AND turn is higher than 7
        //
        if( Ω.now.athlete[ Ω.now.selected ][ 2 ] !== current
        //
        || Ω.now.turn < 8 )
        {
          value = 0.66
          key = false
        }
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

  ////////////////////////////////////////////////////////////////////////////// G.updZonCdn
  // Updating zones coordinates
  //
  updZonCdn: function( behavior, guide )
  {
    let displayed

    if( guide === 'hover' )       displayed = Ω.now.hovered
    else if( guide === 'select' ) displayed = Ω.now.selected

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
      if( Ω.info.move[ displayed ][ 1 ] === 1 )
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
      if( Ω.info.move[ displayed ][ 2 ] === 1 )
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
      if( Ω.info.move[ displayed ][ 3 ] === 1 )
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
      if( Ω.info.move[ displayed ][ 4 ] === 1 )
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
      if( Ω.info.move[ displayed ][ 5 ] === 1 )
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
      if( Ω.info.move[ displayed ][ 6 ] === 1 )
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
      if( Ω.info.move[ displayed ][ 7 ] === 1 )
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
      if( Ω.info.move[ displayed ][ 8 ] === 1 )
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
      if( Ω.info.move[ displayed ][ 9 ] === 1 )
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
      if( reps > 0 )
      {
        for( let $ = 0; $ < 4; $ ++ )
        {
          let entity = Ω.now.athlete[ team[ $ ] ]

          Ω.info.zone[ $ ][ 0 ] = entity[ 0 ] - 1
          Ω.info.zone[ $ ][ 1 ] = entity[ 1 ] - 1
        }

        value = 4
      }
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

  ////////////////////////////////////////////////////////////////////////////// G.updCur
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

  ////////////////////////////////////////////////////////////////////////////// G.updTar
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

          else // part of opponent's area
          {
            Ω.info.blocked.push( zone )
          }
        }
      }
    }
  },

  ////////////////////////////////////////////////////////////////////////////// G.updInd
  // Display moving objects above everything else in the arena
  //
  updInd: function()
  {
    Array.from( Ω.page.athlete ).forEach( function( $1, $2 )
    {
      let value = 1

      if( Ω.now.selected === $2 || Ω.now.pushed === $2 ) value = 3

      $1.style.zIndex = String( value )
    } )
  },

  ////////////////////////////////////////////////////////////////////////////// G.updSel
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

  ////////////////////////////////////////////////////////////////////////////// G.updRpl
  //
  updRpl: function()
  {
    //==========================================================================
    // Colorize replaced athletes
    //
    for( let $1 = 0; $1 < 20; $1 ++ )
    {
      if( Ω.now.athlete[ $1 ][ 2 ].substring( 3, 6 ) === 'Blk' )
      {
        Ω.page.athlete[ $1 ].style.borderColor = 'black'

        Array.from( Ω.page.glow[ $1 ] ).forEach( function( $2, $3 )
        {
          $2.style.fill = 'rgba(255,255,255,0.5)'
        } )
      }
    }
  },
}

//////////////////////////////////////////////////////////////////////////////// ENGINE
// Takes care of initializing and updating the game
//
Ω.engine =
{
  ////////////////////////////////////////////////////////////////////////////// E.create
  //
  create: function()
  {
    Ω.save.create()
    Ω.game.create()
  },

  ////////////////////////////////////////////////////////////////////////////// E.update
  //
  update: function()
  {
    Ω.save.update()
    Ω.game.update()

    window.requestAnimationFrame( Ω.engine.update )
  },
}

//////////////////////////////////////////////////////////////////////////////// CALL
// Initializing the game
//
Ω.engine.create()
Ω.engine.update()
