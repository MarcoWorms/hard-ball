
'use strict'

//////////////////////////////////////////////////////////////////////////////// GLOBALS
//
// TOOL TIMER LISTEN GAME MESSAGE PAGE LTOA INFO TEXT EVENT CHANGE STATE ENGINE

//////////////////////////////////////////////////////////////////////////////// GAME
//
const game =
{
  ////////////////////////////////////////////////////////////////////////////// G.create
  //
  create: function()
  {
    if( change.turn === 0 )
    {
      change.ball = [ 457, 265 ]

      for( let $ = 0; $ < 20; $ ++ )
      {
        //----------------------------------------------------------------------
        // Initial positions
        //
        change.athlete[ $ ][ 0 ] = info.cell[ 12 ][ $ ][ 0 ] + 1
        change.athlete[ $ ][ 1 ] = info.cell[ 12 ][ $ ][ 1 ] + 1

        //----------------------------------------------------------------------
        // Initial cells
        //
        let number = ''
        if( $ < 10 ) number = '0'
        number += $

        change.athlete[ $ ][ 2 ] = 'M' + number
      }
    }

    game.updAtl()
    game.updBal()

    if( change.hovered !== 'none' )game.updZonCdn( 'hover' )
    if( change.selected !== 'none' )game.updZonCdn( 'select' )

    game.updZon( 'hover' )
    game.updZon( 'select' )

    game.updSel()
    game.updTgt()

    page.selectZone.forEach( function( $ ) $.style.display = 'none' )
  },

  ////////////////////////////////////////////////////////////////////////////// G.update
  //
  update: function()
  {
    game.updZon( 'hover' )
    game.updZon( 'select' )
  },

  ////////////////////////////////////////////////////////////////////////////// G.updAtl
  //
  updAtl: function()
  {
    for( let $1 = 0; $1 < 20; $1 ++ )
    {
      //------------------------------------------------------------------------
      // Position
      //
      let x = change.athlete[ $1 ][ 0 ]
      let y = change.athlete[ $1 ][ 1 ]

      tool.translate( page.athlete[ $1 ], x, y )

      //------------------------------------------------------------------------
      // Cell letter
      //
      let name = ''

      for( let $2 = 0; $2 < 13; $2 ++ )
      {
        if( change.athlete[ $1 ][ 1 ] - 1 === info.cell[ $2 ][ 0 ][ 1 ] )
        {
          if( $2 === 12 ) name = 'M'
          else            name = lToA[ $2 + 1 ]
          break
        }
      }

      //------------------------------------------------------------------------
      // Cell number
      //
      for( let $3 = 0; $3 < 20; $3 ++ ) // '$3' could've been '$2' just as well
      {
        if( change.athlete[ $1 ][ 0 ] - 1 === info.cell[ 0 ][ $3 ][ 0 ] )
        {
          if( $3 < 10 ) name += '0'
          name += $3
          break
        }
      }

      change.athlete[ $1 ][ 2 ] = name
    }
  },

  ////////////////////////////////////////////////////////////////////////////// G.updBal
  //
  updBal: function()
  {
    let x = change.ball[ 0 ]
    let y = change.ball[ 1 ]

    tool.translate( page.ball, x, y )
  },

  ////////////////////////////////////////////////////////////////////////////// G.updZon
  //
  updZon: function( guide )
  {
    let target1
    let target2
    let target3

    if( guide === 'hover' )
    {
      target1 = page.hoverZone
      target2 = info.hoverZone
      target3 = change.hovered
    }
    else if( guide === 'select' )
    {
      target1 = page.selectZone
      target2 = info.selectZone
      target3 = change.selected
    }

    //==========================================================================
    // Updating every other zone
    //
    for( let $ = 0; $ < 16; $ ++ )
    {
      let entity = target1[ $ ]

      if( target3 === 'none' )
      {
         entity.style.display = 'none'
      }
      else if( change.athlete[ target3 ][ 2 ].substring( 0, 1 ) !== 'M' )
      {
        if( $ < info.possible[ target3 ][ 0 ] )
        {
          entity.style.display = 'flex'
        }
        else
        {
          entity.style.display = 'none'
        }
      }

      let x = target2[ $ ][ 0 ]
      let y = target2[ $ ][ 1 ]

      tool.translate( entity, x, y )
      tool.rotate( entity, 1 )
    }
  },

  ////////////////////////////////////////////////////////////////////////////// G.updZonCdn
  // Activated on 'listen.hoverer'
  //
  updZonCdn: function( guide )
  {
    let target1
    let target2

    if( guide === 'hover' )
    {
      target1 = info.hoverZone
      target2 = change.hovered
    }
    else if( guide === 'select' )
    {
      target1 = info.selectZone
      target2 = change.selected
    }

    //==========================================================================
    // Clean 'info.zone'
    //
    target1 =
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
    if( info.possible[ target2 ][ 1 ] === 1 )
    {
      x = tool.bender( change.athlete[ target2 ][ 0 ] + 47, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 1, 'y' ) + 3
      target1[ counter ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 49, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 1, 'y' ) + 3
      target1[ counter + 1 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 1, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 47, 'y' ) + 3
      target1[ counter + 2 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 1, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 49, 'y' ) + 3
      target1[ counter + 3 ] = [ x, y ]

      counter += 4
    }

    //==========================================================================
    // Matrix 2
    //
    if( info.possible[ target2 ][ 2 ] === 1 )
    {
      x = tool.bender( change.athlete[ target2 ][ 0 ] + 95, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 1, 'y' ) + 3
      target1[ counter ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 97, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 1, 'y' ) + 3
      target1[ counter + 1 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 1, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 95, 'y' ) + 3
      target1[ counter + 2 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 1, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 97, 'y' ) + 3
      target1[ counter + 3 ] = [ x, y ]

      counter += 4
    }

    //==========================================================================
    // Matrix 3
    //
    if( info.possible[ target2 ][ 3 ] === 1 )
    {
      x = tool.bender( change.athlete[ target2 ][ 0 ] + 143, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 1, 'y' ) + 3
      target1[ counter ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 145, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 1, 'y' ) + 3
      target1[ counter + 1 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 1, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 143, 'y' ) + 3
      target1[ counter + 2 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 1, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 145, 'y' ) + 3
      target1[ counter + 3 ] = [ x, y ]

      counter += 4
    }

    //==========================================================================
    // Matrix 4
    //
    if( info.possible[ target2 ][ 4 ] === 1 )
    {
      x = tool.bender( change.athlete[ target2 ][ 0 ] + 47, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 47, 'y' ) + 3
      target1[ counter ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] + 47, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 49, 'y' ) + 3
      target1[ counter + 1 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 49, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 49, 'y' ) + 3
      target1[ counter + 2 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 49, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 47, 'y' ) + 3
      target1[ counter + 3 ] = [ x, y ]

      counter += 4
    }

    //==========================================================================
    // Matrix 5
    //
    if( info.possible[ target2 ][ 5 ] === 1 )
    {
      x = tool.bender( change.athlete[ target2 ][ 0 ] + 47, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 95, 'y' ) + 3
      target1[ counter ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 49, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 95, 'y' ) + 3
      target1[ counter + 1 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 97, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 47, 'y' ) + 3
      target1[ counter + 2 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 97, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 49, 'y' ) + 3
      target1[ counter + 3 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 49, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 97, 'y' ) + 3
      target1[ counter + 4 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] + 47, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 97, 'y' ) + 3
      target1[ counter + 5 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] + 95, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 49, 'y' ) + 3
      target1[ counter + 6 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] + 95, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 47, 'y' ) + 3
      target1[ counter + 7 ] = [ x, y ]

      counter += 8
    }

    //==========================================================================
    // Matrix 6
    //
    if( info.possible[ target2 ][ 6 ] === 1 )
    {
      x = tool.bender( change.athlete[ target2 ][ 0 ] + 47, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 143, 'y' ) + 3
      target1[ counter ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 49, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 143, 'y' ) + 3
      target1[ counter + 1 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 145, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 47, 'y' ) + 3
      target1[ counter + 2 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 145, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 49, 'y' ) + 3
      target1[ counter + 3 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 49, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 145, 'y' ) + 3
      target1[ counter + 4 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] + 47, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 145, 'y' ) + 3
      target1[ counter + 5 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] + 143, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 49, 'y' ) + 3
      target1[ counter + 6 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] + 143, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 47, 'y' ) + 3
      target1[ counter + 7 ] = [ x, y ]

      counter += 8
    }

    //==========================================================================
    // Matrix 7
    //
    if( info.possible[ target2 ][ 7 ] === 1 )
    {
      x = tool.bender( change.athlete[ target2 ][ 0 ] + 95, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 95, 'y' ) + 3
      target1[ counter ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] + 95, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 97, 'y' ) + 3
      target1[ counter + 1 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 97, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 97, 'y' ) + 3
      target1[ counter + 2 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 97, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 95, 'y' ) + 3
      target1[ counter + 3 ] = [ x, y ]

      counter += 4
    }

    //==========================================================================
    // Matrix 8
    //
    if( info.possible[ target2 ][ 8 ] === 1 )
    {
      x = tool.bender( change.athlete[ target2 ][ 0 ] + 95, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 143, 'y' ) + 3
      target1[ counter ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 97, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 143, 'y' ) + 3
      target1[ counter + 1 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 145, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 95, 'y' ) + 3
      target1[ counter + 2 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 145, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 97, 'y' ) + 3
      target1[ counter + 3 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 97, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 145, 'y' ) + 3
      target1[ counter + 4 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] + 95, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 145, 'y' ) + 3
      target1[ counter + 5 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] + 143, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 97, 'y' ) + 3
      target1[ counter + 6 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] + 143, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 95, 'y' ) + 3
      target1[ counter + 7 ] = [ x, y ]

      counter += 8
    }

    //==========================================================================
    // Matrix 9
    //
    if( info.possible[ target2 ][ 9 ] === 1 )
    {
      x = tool.bender( change.athlete[ target2 ][ 0 ] + 143, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 143, 'y' ) + 3
      target1[ counter ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] + 143, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 145, 'y' ) + 3
      target1[ counter + 1 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 145, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] - 145, 'y' ) + 3
      target1[ counter + 2 ] = [ x, y ]

      x = tool.bender( change.athlete[ target2 ][ 0 ] - 145, 'x' ) + 3
      y = tool.bender( change.athlete[ target2 ][ 1 ] + 143, 'y' ) + 3
      target1[ counter + 3 ] = [ x, y ]

      counter += 4
    }

    //==========================================================================
    // Updating the calculated coordinates
    //
    if( guide === 'hover' ) info.hoverZone = target1
    else if( guide === 'select' ) info.selectZone = target1
  },

  ////////////////////////////////////////////////////////////////////////////// G.updSel
  // Activated on 'listen.clicker'
  //
  updSel: function()
  {
    if( change.selected !== 'none' )
    {
      page.selected.style.display = 'none'

      setTimeout( function()
      {
        page.selected.style.display = 'flex'

        let x = change.athlete[ change.selected ][ 0 ] + 2
        let y = change.athlete[ change.selected ][ 1 ] + 2

        tool.translate( page.selected, x, y )
      }, 1 )
    }
    else
    {
      page.selected.style.display = 'none'
    }
  },

  ////////////////////////////////////////////////////////////////////////////// G.updTgt
  // Activated on 'listen.clicker'
  //
  updTgt: function()
  {
    let array = []

    for( let $1 = 0; $1 < 20; $1 ++ )
    {
      for( let $2 = 0; $2 < 16; $2 ++ )
      {
        if( change.athlete[ $1 ][ 0 ] - 1 === info.selectZone[ $2 ][ 0 ] - 3 )
        {
          if( change.athlete[ $1 ][ 1 ] - 1 === info.selectZone[ $2 ][ 1 ] - 3 )
          {
            info.target.push( $1 )
          }
        }
      }
    }
  },
}
