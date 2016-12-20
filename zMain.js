
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
    Ω.game.updTar()
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
    else if( Ω.now.hovered !== 'none'
    && Ω.info.target.indexOf( Ω.now.hovered ) === -1 )
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
    else if( Ω.now.selected !== 'none'
    && Ω.info.target.indexOf( Ω.now.selected ) === -1 )
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
    else
    {
      //========================================================================
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
    }
  },

  ////////////////////////////////////////////////////////////////////////////// G.updZonCdn
  // Updating zones coordinates
  //
  updZonCdn: function( behavior, guide )
  {
    let digit

    if( guide === 'hover' )       digit = Ω.now.hovered
    else if( guide === 'select' ) digit = Ω.now.selected

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
      if( Ω.info.move[ digit ][ 1 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 1, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 1, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )
      }

      //==========================================================================
      // Matrix 2
      //
      if( Ω.info.move[ digit ][ 2 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 1, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 1, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )
      }

      //==========================================================================
      // Matrix 3
      //
      if( Ω.info.move[ digit ][ 3 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 1, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 1, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )
      }

      //==========================================================================
      // Matrix 4
      //
      if( Ω.info.move[ digit ][ 4 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )
      }

      //==========================================================================
      // Matrix 5
      //
      if( Ω.info.move[ digit ][ 5 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )
      }

      //==========================================================================
      // Matrix 6
      //
      if( Ω.info.move[ digit ][ 6 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )
      }

      //==========================================================================
      // Matrix 7
      //
      if( Ω.info.move[ digit ][ 7 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )
      }

      //==========================================================================
      // Matrix 8
      //
      if( Ω.info.move[ digit ][ 8 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )
      }

      //==========================================================================
      // Matrix 9
      //
      if( Ω.info.move[ digit ][ 9 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( Ω.now.athlete[ digit ][ 2 ], counter, x, y )
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
    let hideText
    let showText

    if( Ω.now.currentPlayer === 'green' )
    {
      hideText = Array.from( Ω.page.textBlue )
      showText = Array.from( Ω.page.textGreen )
    }

    else if( Ω.now.currentPlayer === 'blue' )
    {
      hideText = Array.from( Ω.page.textGreen )
      showText = Array.from( Ω.page.textBlue )
    }

    ////////////////////////////////////////////////////////////////////////////
    // Step 3
    //
    if( Ω.now.currentPlayer !== '' )
    {
      hideText.forEach( ( $ ) =>
      {
        $.style.color = 'rgba(255,255,255,0.25)'
        $.style.textShadow = ''
      } )

      showText.forEach( ( $ ) =>
      {
        let value = Ω.changer.glow[ 0 ]

        $.style.color = 'rgba(255,255,255,' + value + ')'
        $.style.textShadow = '0 0 4px rgba(255,255,255,' + value + ')'
      } )
    }

    ////////////////////////////////////////////////////////////////////////////
    // Step 4
    //
    let hideGlow = 0
    let showGlow = 0

    if( Ω.now.currentPlayer === 'green' )
    {
      hideGlow = Ω.now.team.blue
      showGlow = Ω.now.team.green
    }
    else if( Ω.now.currentPlayer === 'blue' )
    {
      hideGlow = Ω.now.team.green
      showGlow = Ω.now.team.blue
    }

    ////////////////////////////////////////////////////////////////////////////
    // Step 5
    //
    if( hideGlow !== 0 )
    {
      for( let $ = 0; $ < hideGlow.length; $ ++ )
      {
        Array.from( Ω.page.glow[ hideGlow[ $ ] ] ).forEach( function( $ )
        {
          $.style.fill = 'rgba(255,255,255,0.75)'
        } )
      }

      for( let $ = 0; $ < showGlow.length; $ ++ )
      {
        Array.from( Ω.page.glow[ showGlow[ $ ] ] ).forEach( function( $ )
        {
          let value = ( Ω.changer.glow[ 0 ] - Ω.changer.glow[ 0 ] / 8 )

          $.style.fill = 'rgba(255,255,255,' + ( 1 - value ) + ')'
        } )
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Step 6
    //
    let key = true
    let value = 1
    let entity =  Ω.now.currentPlayer.substring( 0, 3 )

    if( Ω.now.turn !== 0 )
    {
      //========================================================================
      // Athlete is hovered
      //
      if( Ω.now.hovered !== 'none' && Ω.now.hovered !== 'ball' )
      {
        //......................................................................
        // Hovered athlete is playing and is not a target
        //
        if( Ω.now.athlete[ Ω.now.hovered ][ 2 ] !== 'none'
        && Ω.info.target.indexOf( Ω.now.hovered ) === -1 )
        {
          //....................................................................
          // Athlete is the same color as the turn AND turn is higher than 7
          //
          if( Ω.now.athlete[ Ω.now.hovered ][ 2 ] === entity
          && Ω.now.turn > 7 )
          {
            value = 1
          }
          else
          {
            value = 0.66
            key = false
          }
        }
      }

      //========================================================================
      // Athlete is selected
      //
      else if( Ω.now.selected !== 'none' && Ω.now.selected !== 'ball' )
      {
        //......................................................................
        // Selected athlete is playing
        //
        if( Ω.now.athlete[ Ω.now.selected ][ 2 ] !== 'none' )
        {
          //....................................................................
          // Athlete is the same color as the turn AND turn is higher than 7
          //
          if( Ω.now.athlete[ Ω.now.selected ][ 2 ] === entity
          && Ω.now.turn > 7 )
          {
            value = 1
          }
          else
          {
            value = 0.66
            key = false
          }
        }
      }
    }

    Array.from( Ω.page.zone ).forEach( function( $ )
    {
      $.style.borderColor = 'rgba(255,255,255,' + value + ')'

      if( key ) $.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.5)'
      else      $.style.boxShadow = ''
    } )
  },

  ////////////////////////////////////////////////////////////////////////////// G.updTar
  // Updates an array containing currently targeted athletes
  //
  updTar: function()
  {
    Ω.info.target = []

    for( let $1 = 0; $1 < 20; $1 ++ )
    {
      for( let $2 = 0; $2 < 16; $2 ++ )
      {
        if( Ω.now.athlete[ $1 ][ 0 ] - 1 === Ω.info.zone[ $2 ][ 0 ]
        && Ω.now.athlete[ $1 ][ 1 ] - 1 === Ω.info.zone[ $2 ][ 1 ] )
        {
          Ω.info.target.push( $1 )
        }
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
