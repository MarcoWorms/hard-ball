
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
    localStorage.setItem( 'first', JSON.stringify( Ω.now ) ) // create backup

    if( 'last' in localStorage ) // if there is a saved file
    {
      Ω.now = JSON.parse( localStorage.getItem( 'last' ) ) // load it
    }
  },

  ////////////////////////////////////////////////////////////////////////////// S.update
  // USED: engine.update
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
    // Preserving the selection zone's appearance on loads
    //
    Ω.game.updSel()
  },

  ////////////////////////////////////////////////////////////////////////////// G.update
  //
  update: function()
  {
    Ω.game.updAtl()
    Ω.game.updBal()

    Ω.game.updCur()
    Ω.game.updTar()
    Ω.game.updKee()

    Ω.game.updZon1()
    Ω.game.updZon2()
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

  ////////////////////////////////////////////////////////////////////////////// G.updCur
  // Updates whose turn it is (plus athlete's art and area cell's name glow)
  //
  updCur: function()
  {
    ////////////////////////////////////////////////////////////////////////////
    // Defining who is to play now
    //
    if( Ω.now.firstPlayer === 'green' )
    {
      if( Ω.now.turn % 2 === 0 ) Ω.now.currentPlayer = 'green' // odd turn
      else                       Ω.now.currentPlayer = 'blue' // even turn
    }

    else if( Ω.now.firstPlayer === 'blue' )
    {
      if( Ω.now.turn % 2 === 0 ) Ω.now.currentPlayer = 'blue' // odd turn
      else                       Ω.now.currentPlayer = 'green' // even turn
    }

    ////////////////////////////////////////////////////////////////////////////
    // Determining which cell text is to be shown with glow effect
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

    ////////////////////////////////////////////////////////////////////////////
    // Determining which athlete art is to be shown with glow effect
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
    Ω.info.target = [] // refresh the array

    for( let $1 = 0; $1 < 20; $1 ++ )
    {
      for( let $2 = 0; $2 < 16; $2 ++ )
      {
        //======================================================================
        // If any athlete's X is equal to any zone's X and
        // If any athlete's Y is equal to any zone's Y
        //
        if( Ω.now.athlete[ $1 ][ 0 ] - 1 === Ω.info.zone[ $2 ][ 0 ]
        && Ω.now.athlete[ $1 ][ 1 ] - 1 === Ω.info.zone[ $2 ][ 1 ] )
        {
          Ω.info.target.push( $1 ) // such athletes are an array of targets
        }
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

    Ω.info.keeper.green = 'none'
    Ω.info.keeper.blue = 'none'

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
          Ω.info.keeper.green = Ω.now.team.green[ $ ]
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
          Ω.info.keeper.blue = Ω.now.team.blue[ $ ]
        }
      }
    }
  },

  ////////////////////////////////////////////////////////////////////////////// G.updZon1
  // Calls 'game.updZonCdn' differently depending on the moment
  //
  updZon1: function()
  {
    for( let $ = 0; $ < 16; $ ++ ) Ω.page.zone[ $ ].style.display = 'none'

    ////////////////////////////////////////////////////////////////////////////
    // Clean 'info.zone'
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

    ////////////////////////////////////////////////////////////////////////////
    // Ball is hovered
    //
    if( Ω.now.hovered === 'ball' )
    {
      // tbd
    }

    ////////////////////////////////////////////////////////////////////////////
    // Athlete is hovered and is not a target
    //
    else if( Ω.now.hovered !== 'none'
    && Ω.info.target.indexOf( Ω.now.hovered ) === -1 )
    {
      //////////////////////////////////////////////////////////////////////////
      // Hovered and non-targeted athlete is ready to play
      //
      if( Ω.now.athlete[ Ω.now.hovered ][ 2 ] === 'none' )
      {
        if( Ω.now.turn < 8 ) Ω.game.updZonCdn( 'stt', 'select' )
        else                 Ω.game.updZonCdn( 'rep', 'select' )
      }

      //////////////////////////////////////////////////////////////////////////
      // Hovered and non-targeted athlete is playing
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
    // Athlete is selected and is not a targeted
    //
    else if( Ω.now.selected !== 'none'
    && Ω.info.target.indexOf( Ω.now.selected ) === -1 )
    {

      //////////////////////////////////////////////////////////////////////////
      // Selected and non-targeted athlete is ready to play
      //
      if( Ω.now.athlete[ Ω.now.selected ][ 2 ] === 'none' )
      {
        if( Ω.now.turn < 8 ) Ω.game.updZonCdn( 'stt', 'select' )
        else                 Ω.game.updZonCdn( 'rep', 'select' )
      }

      //////////////////////////////////////////////////////////////////////////
      // Selected and non-targeted athlete is playing
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
          for( let $ = 0; $ < 16; $ ++ ) array.push( [ 'none', 'none' ] )
          return array
        }()
      )
    }
  },

  ////////////////////////////////////////////////////////////////////////////// G.updZon2
  // Updates the appearance of zones depending on the situation
  //
  updZon2: function()
  {
    ////////////////////////////////////////////////////////////////////////////
    // Determining how are zones to be shown
    //
    let current =  Ω.now.currentPlayer.substring( 0, 3 ) // 'gre' or 'blu' turn

    let key = true
    let value = 1

    if( Ω.now.turn !== 0 ) // except on turn 0
    {
      //========================================================================
      // If athlete is hovered
      //
      if( Ω.now.hovered !== 'none'
      && Ω.now.hovered !== 'ball' )
      {
        //......................................................................
        // And hovered athlete is playing and is not a target
        //
        if( Ω.now.athlete[ Ω.now.hovered ][ 2 ] !== 'none'
        && Ω.info.target.indexOf( Ω.now.hovered ) === -1 )
        {
          //....................................................................
          // Athlete is the same color as the turn AND turn is higher than 7
          //
          if( Ω.now.athlete[ Ω.now.hovered ][ 2 ] === current
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

        //......................................................................
        //
        else if( Ω.now.athlete[ Ω.now.hovered ][ 2 ] === 'none'
        && Ω.now.turn < 8 )
        {
          value = 1
        }

        //......................................................................
        // Athlete isn't the same color as the turn AND turn isn't higher than 7
        //
        // It means it should already be 'value = 0.66' and 'key = false', but
        // there is an exception...
        //
        else
        {
          let A = 0
          let B = 1

          //....................................................................
          // The exception is some selected athlete having the same color as the
          // current turn player's color
          //
          if( Ω.now.selected !== 'none' && Ω.now.selected !== 'ball' )
          {
            A = Ω.now.athlete[ Ω.now.selected ][ 2 ]
            B = Ω.now.currentPlayer.substring( 0, 3 )
          }

          //....................................................................
          // If there was in fact the exception, aknowledge it
          //
          if( A === B )
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
          if( Ω.now.athlete[ Ω.now.selected ][ 2 ] === current
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

  ////////////////////////////////////////////////////////////////////////////// G.updZonCdn
  // Updating zones coordinates
  //
  updZonCdn: function( behavior, guide )
  {
    let digit

    if( guide === 'hover' )       digit = Ω.now.hovered
    else if( guide === 'select' ) digit = Ω.now.selected

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
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 1, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )
      }

      //==========================================================================
      // Matrix 2
      //
      if( Ω.info.move[ digit ][ 2 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 1, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 1, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )
      }

      //==========================================================================
      // Matrix 3
      //
      if( Ω.info.move[ digit ][ 3 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 1, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 1, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 1, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )
      }

      //==========================================================================
      // Matrix 4
      //
      if( Ω.info.move[ digit ][ 4 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )
      }

      //==========================================================================
      // Matrix 5
      //
      if( Ω.info.move[ digit ][ 5 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )
      }

      //==========================================================================
      // Matrix 6
      //
      if( Ω.info.move[ digit ][ 6 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 49, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 47, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 49, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 47, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )
      }

      //==========================================================================
      // Matrix 7
      //
      if( Ω.info.move[ digit ][ 7 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )
      }

      //==========================================================================
      // Matrix 8
      //
      if( Ω.info.move[ digit ][ 8 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 97, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 95, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 97, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 95, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )
      }

      //==========================================================================
      // Matrix 9
      //
      if( Ω.info.move[ digit ][ 9 ] === 1 )
      {
        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] + 143, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] - 145, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )

        x = Ω.tool.bend( Ω.now.athlete[ digit ][ 0 ] - 145, 'x' )
        y = Ω.tool.bend( Ω.now.athlete[ digit ][ 1 ] + 143, 'y' )
        counter += Ω.tool.isZone( digit, counter, x, y )
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
      value = 0
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
