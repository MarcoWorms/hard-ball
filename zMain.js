
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

  ////////////////////////////////////////////////////////////////////////////// G.updSel
  // Cannot be update every tick! It's updated at 'listen.clicker'
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
    for( let $ = 0; $ < 16; $ ++ )
    {
      Ω.page.zone[ $ ].style.display = 'none'

      //////////////////////////////////////////////////////////////////////////
      // Ball is hovered
      //
      if( Ω.now.hovered === 'ball' )
      {
        // tbd
      }

      //////////////////////////////////////////////////////////////////////////
      // Athlete is hovered
      //
      else if( Ω.now.hovered !== 'none' )
      {
        ////////////////////////////////////////////////////////////////////////
        // Athlete is ready
        //
        if( Ω.now.athlete[ Ω.now.hovered ][ 1 ] > 555 
          && Ω.now.athlete[ Ω.now.hovered ][ 3 ] === 'ready' )
        {

          //====================================================================
          // TURN 0
          //
          if( Ω.now.turn === 0 )
          {
            if( $ < 8 )
            {
              Ω.page.zone[ $ ].style.display = 'flex'
              Ω.info.zone[ $ ][ 0 ] = Ω.info.spawn[ $ ][ 0 ] + 1
              Ω.info.zone[ $ ][ 1 ] = Ω.info.spawn[ $ ][ 1 ] + 1
            }
          }
        }

        ////////////////////////////////////////////////////////////////////////
        // Athlete is playing
        //
        else
        {
          if( $ < Ω.info.move[ Ω.now.hovered ][ 0 ] )
          {
            Ω.game.updZonCdn( 'hover' ) // This is so far the best place for it

            Ω.page.zone[ $ ].style.display = 'flex'
          }
        }
      }

      //////////////////////////////////////////////////////////////////////////
      // Ball is selected
      //
      else if( Ω.now.selected === 'ball' )
      {
        // tbd
      }

      //////////////////////////////////////////////////////////////////////////
      // Athlete is selected
      //
      else if( Ω.now.selected !== 'none' )
      {
        ////////////////////////////////////////////////////////////////////////
        // Athlete is ready
        //
        if( Ω.now.athlete[ Ω.now.selected ][ 1 ] > 555
          && Ω.now.athlete[ Ω.now.selected ][ 3 ] === 'ready' )
        {

          //====================================================================
          // TURN 0
          //
          if( Ω.now.turn === 0 )
          {
            if( $ < 8 )
            {
              Ω.page.zone[ $ ].style.display = 'flex'
              Ω.info.zone[ $ ][ 0 ] = Ω.info.spawn[ $ ][ 0 ] + 1
              Ω.info.zone[ $ ][ 1 ] = Ω.info.spawn[ $ ][ 1 ] + 1
            }
          }
        }

        ////////////////////////////////////////////////////////////////////////
        // Athlete is playing
        //
        else
        {
          if( $ < Ω.info.move[ Ω.now.selected ][ 0 ] )
          {
            Ω.game.updZonCdn( 'select' ) // This is so far the best place for it

            Ω.page.zone[ $ ].style.display = 'flex'
          }
        }
      }

      let x = Ω.info.zone[ $ ][ 0 ] + 3
      let y = Ω.info.zone[ $ ][ 1 ] + 3

      Ω.tool.translate( Ω.page.zone[ $ ], x, y )
      Ω.tool.rotate( Ω.page.zone[ $ ], 1 )
    }
  },

  ////////////////////////////////////////////////////////////////////////////// G.updZonCdn
  //
  updZonCdn: function( guide )
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
