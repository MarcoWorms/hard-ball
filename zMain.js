
'use strict'

//////////////////////////////////////////////////////////////////////////////// SAVE
// Keeps the game saved in the browser's LOCAL STORAGE
//
Ω.save =
{
  ////////////////////////////////////////////////////////////////////////////// S.create
  // USED: engine.create
  //
  create: function()
  {
    localStorage.setItem( 'first', JSON.stringify( Ω.now ) )

    if( 'last' in localStorage )
    {
      Ω.now = JSON.parse( localStorage.getItem( 'last' ) )
    }
  },

  ////////////////////////////////////////////////////////////////////////////// S.update
  // USED: engine.update
  //
  update: function()
  {
    localStorage.setItem( 'last', JSON.stringify( Ω.now ) )
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
      //////////////////////////////////////////////////////////////////////////
      // Ball initial position
      //
      Ω.now.ball[ 0 ] = 457
      Ω.now.ball[ 1 ] = 265

      //////////////////////////////////////////////////////////////////////////
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

    ////////////////////////////////////////////////////////////////////////////
    // Preserving the selected zone's appearance on loads
    //
    Ω.game.updSel()
  },

  ////////////////////////////////////////////////////////////////////////////// G.update
  //
  update: function()
  {
    Ω.game.updAtl()
    Ω.game.updBal()
    Ω.game.updZon()
    Ω.game.updCur()
  },

  ////////////////////////////////////////////////////////////////////////////// G.updAtl
  //
  updAtl: function()
  {
    for( let $ = 0; $ < 20; $ ++ )
    {
      //////////////////////////////////////////////////////////////////////////
      // Position
      //
      let x = Ω.now.athlete[ $ ][ 0 ]
      let y = Ω.now.athlete[ $ ][ 1 ]

      Ω.tool.translate( Ω.page.athlete[ $ ], x, y )

      //////////////////////////////////////////////////////////////////////////
      // Color
      //
      Ω.tool.chgCls( Ω.page.athlete[ $ ], '-', 'btn' )
      Ω.tool.chgCls( Ω.page.athlete[ $ ], '-', 'red' )
      Ω.tool.chgCls( Ω.page.athlete[ $ ], '-', 'gre' )
      Ω.tool.chgCls( Ω.page.athlete[ $ ], '-', 'blu' )

      let toAdd

      if( Ω.now.athlete[ $ ][ 2 ] === 'none' ) toAdd = 'btn'
      else if( Ω.now.athlete[ $ ][ 2 ] === 'red' ) toAdd = 'red'
      else if( Ω.now.athlete[ $ ][ 2 ] === 'gre' ) toAdd = 'gre'
      else if( Ω.now.athlete[ $ ][ 2 ] === 'blu' ) toAdd = 'blu'

      Ω.tool.chgCls( Ω.page.athlete[ $ ], '+', toAdd )
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

  ////////////////////////////////////////////////////////////////////////////// G.updSel
  // Cannot be updated every tick! It's updated at 'listen.clicker'
  //
  updSel: function()
  {
    Ω.page.selected.style.display = 'none' // So animation can begin again

    if( Ω.now.selected !== 'none' )
    {
      let x
      let y

      //========================================================================
      // Determining what is selected, an athlete or the ball
      //
      if( Ω.now.selected === 'ball' )
      {
        x = Ω.now.ball[ 0 ] + 2
        y = Ω.now.ball[ 1 ] + 2
      }
      else if( typeof( Ω.now.selected ) === 'number' )
      {
        x = Ω.now.athlete[ Ω.now.selected ][ 0 ] + 2
        y = Ω.now.athlete[ Ω.now.selected ][ 1 ] + 2
      }

      //========================================================================
      // Add a little delay so animation can begin again
      //
      setTimeout( function()
      {
        Ω.page.selected.style.display = 'flex'
        Ω.tool.translate( Ω.page.selected, x, y )
      }, 1 )
    }
    else
    {
      Ω.page.selected.style.display = 'none'
    }
  },

  ////////////////////////////////////////////////////////////////////////////// G.updZon
  //
  updZon: function()
  {
    for( let $ = 0; $ < 16; $ ++ ) Ω.page.zone[ $ ].style.display = 'none'

    ////////////////////////////////////////////////////////////////////////////
    // Ball is hovered
    //
    if( Ω.now.hovered === 'ball' )
    {
      // tbd
    }

    ////////////////////////////////////////////////////////////////////////////
    // Athlete is hovered
    //
    else if( Ω.now.hovered !== 'none' )
    {

      //////////////////////////////////////////////////////////////////////////
      // Hovered athlete is ready to play
      //
      if( Ω.now.athlete[ Ω.now.hovered ][ 2 ] === 'none' )
      {
        if( Ω.now.turn < 8 ) Ω.game.updZonCdn( 'stt', 'select' )
        else                 Ω.game.updZonCdn( 'rep', 'select' )
      }

      //////////////////////////////////////////////////////////////////////////
      // Hovered athlete is playing
      //
      else if( Ω.now.athlete[ Ω.now.hovered ][ 2 ] !== 'red' )
      {
        Ω.game.updZonCdn( 'mtx', 'hover' )
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Ball is selected
    //
    else if( Ω.now.selected === 'ball' )
    {
      // tbd
    }

    ////////////////////////////////////////////////////////////////////////////
    // Athlete is selected
    //
    else if( Ω.now.selected !== 'none' )
    {

      //////////////////////////////////////////////////////////////////////////
      // Selected athlete is ready to play
      //
      if( Ω.now.athlete[ Ω.now.selected ][ 2 ] === 'none' )
      {
        if( Ω.now.turn < 8 ) Ω.game.updZonCdn( 'stt', 'select' )
        else                 Ω.game.updZonCdn( 'rep', 'select' )
      }

      //////////////////////////////////////////////////////////////////////////
      // Selected athlete is playing
      //
      else if( Ω.now.athlete[ Ω.now.selected ][ 2 ] !== 'red' )
      {
        Ω.game.updZonCdn( 'mtx', 'select' )
      }
    }
  },

  ////////////////////////////////////////////////////////////////////////////// G.updZonCdn
  // Updating zones coordinates
  //
  updZonCdn: function( behavior, guide )
  {
    let target

    if( guide === 'hover' )       target = Ω.now.hovered
    else if( guide === 'select' ) target = Ω.now.selected

    //==========================================================================
    // Clean 'info.zone'
    //
    Ω.info.zone =
    (
      function()
      {
        let array = []
        for( let $ = 0; $ < 16; $ ++ ) array.push( [ 0, 0 ] )
        return array
      }()
    )

    //==========================================================================
    // Fill 'info.zone'
    //
    let value

    //..........................................................................
    // By matrix
    //
    if( behavior === 'mtx' )
    {
      let counter = 0
      let x
      let y

      //==========================================================================
      // Matrix 1
      //
      if( Ω.info.move[ target ][ 1 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 1, 'y' )
        Ω.info.zone[ counter ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 1, 'y' )
        Ω.info.zone[ counter + 1 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 47, 'y' )
        Ω.info.zone[ counter + 2 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 49, 'y' )
        Ω.info.zone[ counter + 3 ] = [ x, y ]

        counter += 4
      }

      //==========================================================================
      // Matrix 2
      //
      if( Ω.info.move[ target ][ 2 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 1, 'y' )
        Ω.info.zone[ counter ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 1, 'y' )
        Ω.info.zone[ counter + 1 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 95, 'y' )
        Ω.info.zone[ counter + 2 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 97, 'y' )
        Ω.info.zone[ counter + 3 ] = [ x, y ]

        counter += 4
      }

      //==========================================================================
      // Matrix 3
      //
      if( Ω.info.move[ target ][ 3 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 1, 'y' )
        Ω.info.zone[ counter ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 1, 'y' )
        Ω.info.zone[ counter + 1 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 143, 'y' )
        Ω.info.zone[ counter + 2 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 145, 'y' )
        Ω.info.zone[ counter + 3 ] = [ x, y ]

        counter += 4
      }

      //==========================================================================
      // Matrix 4
      //
      if( Ω.info.move[ target ][ 4 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 47, 'y' )
        Ω.info.zone[ counter ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 49, 'y' )
        Ω.info.zone[ counter + 1 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 49, 'y' )
        Ω.info.zone[ counter + 2 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 47, 'y' )
        Ω.info.zone[ counter + 3 ] = [ x, y ]

        counter += 4
      }

      //==========================================================================
      // Matrix 5
      //
      if( Ω.info.move[ target ][ 5 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 95, 'y' )
        Ω.info.zone[ counter ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 95, 'y' )
        Ω.info.zone[ counter + 1 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 47, 'y' )
        Ω.info.zone[ counter + 2 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 49, 'y' )
        Ω.info.zone[ counter + 3 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 97, 'y' )
        Ω.info.zone[ counter + 4 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 97, 'y' )
        Ω.info.zone[ counter + 5 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 49, 'y' )
        Ω.info.zone[ counter + 6 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 47, 'y' )
        Ω.info.zone[ counter + 7 ] = [ x, y ]

        counter += 8
      }

      //==========================================================================
      // Matrix 6
      //
      if( Ω.info.move[ target ][ 6 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 143, 'y' )
        Ω.info.zone[ counter ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 143, 'y' )
        Ω.info.zone[ counter + 1 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 47, 'y' )
        Ω.info.zone[ counter + 2 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 49, 'y' )
        Ω.info.zone[ counter + 3 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 145, 'y' )
        Ω.info.zone[ counter + 4 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 145, 'y' )
        Ω.info.zone[ counter + 5 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 49, 'y' )
        Ω.info.zone[ counter + 6 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 47, 'y' )
        Ω.info.zone[ counter + 7 ] = [ x, y ]

        counter += 8
      }

      //==========================================================================
      // Matrix 7
      //
      if( Ω.info.move[ target ][ 7 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 95, 'y' )
        Ω.info.zone[ counter ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 97, 'y' )
        Ω.info.zone[ counter + 1 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 97, 'y' )
        Ω.info.zone[ counter + 2 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 95, 'y' )
        Ω.info.zone[ counter + 3 ] = [ x, y ]

        counter += 4
      }

      //==========================================================================
      // Matrix 8
      //
      if( Ω.info.move[ target ][ 8 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 143, 'y' )
        Ω.info.zone[ counter ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 143, 'y' )
        Ω.info.zone[ counter + 1 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 95, 'y' )
        Ω.info.zone[ counter + 2 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 97, 'y' )
        Ω.info.zone[ counter + 3 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 145, 'y' )
        Ω.info.zone[ counter + 4 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 145, 'y' )
        Ω.info.zone[ counter + 5 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 97, 'y' )
        Ω.info.zone[ counter + 6 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 95, 'y' )
        Ω.info.zone[ counter + 7 ] = [ x, y ]

        counter += 8
      }

      //==========================================================================
      // Matrix 9
      //
      if( Ω.info.move[ target ][ 9 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 143, 'y' )
        Ω.info.zone[ counter ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 145, 'y' )
        Ω.info.zone[ counter + 1 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] - 145, 'y' )
        Ω.info.zone[ counter + 2 ] = [ x, y ]

        x = Ω.tool.bend( Ω.now.athlete[ target ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ target ][ 1 ] + 143, 'y' )
        Ω.info.zone[ counter + 3 ] = [ x, y ]

        counter += 4
      }

      value = counter
    }

    //..........................................................................
    // By start
    //
    else if( behavior === 'stt' )
    {

      //////////////////////////////////////////////////////////////////////////
      // Turn 0
      //
      if( Ω.now.turn === 0 )
      {
        for( let $ = 0; $ < 8; $ ++ )
        {
          let digit
          let x
          let y

          if( $ < 4 )
          {
            digit = $

            x = Ω.tool.convert( Ω.now.spawn.green[ digit ] )[ 0 ]
            y = Ω.tool.convert( Ω.now.spawn.green[ digit ] )[ 1 ]
          }
          else
          {
            digit = $ - 4

            x = Ω.tool.convert( Ω.now.spawn.blue[ digit ] )[ 0 ]
            y = Ω.tool.convert( Ω.now.spawn.blue[ digit ] )[ 1 ]
          }

          Ω.info.zone[ $ ][ 0 ] = x
          Ω.info.zone[ $ ][ 1 ] = y
        }

        value = 8
      }

      //////////////////////////////////////////////////////////////////////////
      // Turn 1 to 7
      //
      else
      {
        let entity

        if( Ω.now.currentPlayer === 'green' ) entity = Ω.now.spawn.green
        else if( Ω.now.currentPlayer === 'blue' ) entity = Ω.now.spawn.blue

        for( let $ = 0; $ < entity.length; $ ++ )
        {
          let x = Ω.tool.convert( entity[ $ ] )[ 0 ]
          let y = Ω.tool.convert( entity[ $ ] )[ 1 ]

          Ω.info.zone[ $ ][ 0 ] = x
          Ω.info.zone[ $ ][ 1 ] = y
        }

        value = entity.length
      }
    }

    //..........................................................................
    // By replacement
    //
    else if( behavior === 'rep' )
    {
      value = 4
    }

    //==========================================================================
    // Actually display zones
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
      else
      {
        Ω.page.zone[ $ ].style.display = 'none'
      }
    }
  },

  ////////////////////////////////////////////////////////////////////////////// G.updCur
  // Updates whose turn is it
  //
  updCur: function()
  {
    let array1 = Array.from( Ω.page.areaGreen )
    let array2 = Array.from( Ω.page.areaGreen )

    array1.forEach( ( $ ) => { $.style.color = 'rgba(255,255,255,0.25)' } )
    array2.forEach( ( $ ) => { $.style.color = 'rgba(255,255,255,0.25)' } )

    ////////////////////////////////////////////////////////////////////////////
    // Step 1
    //
    if( Ω.now.firstPlayer === 'green' )
    {
      if( Ω.now.turn % 2 === 0 ) Ω.now.currentPlayer = 'green'
      else                       Ω.now.currentPlayer = 'blue'
    }

    else if( Ω.now.firstPlayer === 'blue' )
    {
      if( Ω.now.turn % 2 === 0 ) Ω.now.currentPlayer = 'blue'
      else                       Ω.now.currentPlayer = 'green'
    }

    ////////////////////////////////////////////////////////////////////////////
    // Step 2
    //
    let hide
    let show

    if( Ω.now.currentPlayer === 'green' )
    {
      hide = Array.from( Ω.page.areaBlue )
      show = Array.from( Ω.page.areaGreen )
    }

    else if( Ω.now.currentPlayer === 'blue' )
    {
      hide = Array.from( Ω.page.areaGreen )
      show = Array.from( Ω.page.areaBlue )
    }

    ////////////////////////////////////////////////////////////////////////////
    // Step 3
    //
    if( Ω.now.currentPlayer !== '' )
    {
      hide.forEach( ( $ ) =>
      {
        $.style.color = 'rgba(255,255,255,0.25)'
        $.style.textShadow = ''
      } )

      show.forEach( ( $ ) =>
      {
        let entity = Ω.changer.glow[ 0 ]

        $.style.color = 'rgba(255,255,255,' + entity + ')'
        $.style.textShadow = '0 0 4px rgba(255,255,255,' + entity + ')'
      } )
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
