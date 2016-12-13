
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
  },

  ////////////////////////////////////////////////////////////////////////////// G.update
  //
  update: function()
  {
    game.updZon()
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
  updZon: function()
  {
    //==========================================================================
    // Updating every other zone
    //
    for( let $ = 0; $ < 16; $ ++ )
    {
      let entity = page.zone[ $ ]

      if( change.hovered === 'none' )
      {
         entity.style.display = 'none'
      }
      else if( change.athlete[ change.hovered ][ 2 ].substring( 0, 1 ) !== 'M' )
      {
        if( $ < info.possible[ change.hovered ][ 0 ] )
        {
          entity.style.display = 'flex'
        }
        else
        {
          entity.style.display = 'none'
        }
      }

      let x = info.zone[ $ ][ 0 ]
      let y = info.zone[ $ ][ 1 ]

      tool.translate( entity, x, y )
      tool.rotate( entity, 1 )
    }
  },

  ////////////////////////////////////////////////////////////////////////////// G.updZonCdn
  // Activated on 'listen.hoverer'
  //
  updZonCdn: function()
  {
    //==========================================================================
    // Clean 'info.zone'
    //
    info.zone =
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
    if( info.possible[ change.hovered ][ 1 ] === 1 )
    {
      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 47, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 1, 'y' ) + 3
      info.zone[ counter ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 49, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 1, 'y' ) + 3
      info.zone[ counter + 1 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 1, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 47, 'y' ) + 3
      info.zone[ counter + 2 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 1, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 49, 'y' ) + 3
      info.zone[ counter + 3 ] = [ x, y ]

      counter += 4
    }

    //==========================================================================
    // Matrix 2
    //
    if( info.possible[ change.hovered ][ 2 ] === 1 )
    {
      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 95, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 1, 'y' ) + 3
      info.zone[ counter ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 97, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 1, 'y' ) + 3
      info.zone[ counter + 1 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 1, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 95, 'y' ) + 3
      info.zone[ counter + 2 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 1, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 97, 'y' ) + 3
      info.zone[ counter + 3 ] = [ x, y ]

      counter += 4
    }

    //==========================================================================
    // Matrix 3
    //
    if( info.possible[ change.hovered ][ 3 ] === 1 )
    {
      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 143, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 1, 'y' ) + 3
      info.zone[ counter ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 145, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 1, 'y' ) + 3
      info.zone[ counter + 1 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 1, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 143, 'y' ) + 3
      info.zone[ counter + 2 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 1, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 145, 'y' ) + 3
      info.zone[ counter + 3 ] = [ x, y ]

      counter += 4
    }

    //==========================================================================
    // Matrix 4
    //
    if( info.possible[ change.hovered ][ 4 ] === 1 )
    {
      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 47, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 47, 'y' ) + 3
      info.zone[ counter ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 47, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 49, 'y' ) + 3
      info.zone[ counter + 1 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 49, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 49, 'y' ) + 3
      info.zone[ counter + 2 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 49, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 47, 'y' ) + 3
      info.zone[ counter + 3 ] = [ x, y ]

      counter += 4
    }

    //==========================================================================
    // Matrix 5
    //
    if( info.possible[ change.hovered ][ 5 ] === 1 )
    {
      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 47, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 95, 'y' ) + 3
      info.zone[ counter ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 49, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 95, 'y' ) + 3
      info.zone[ counter + 1 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 97, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 47, 'y' ) + 3
      info.zone[ counter + 2 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 97, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 49, 'y' ) + 3
      info.zone[ counter + 3 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 49, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 97, 'y' ) + 3
      info.zone[ counter + 4 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 47, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 97, 'y' ) + 3
      info.zone[ counter + 5 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 95, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 49, 'y' ) + 3
      info.zone[ counter + 6 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 95, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 47, 'y' ) + 3
      info.zone[ counter + 7 ] = [ x, y ]

      counter += 8
    }

    //==========================================================================
    // Matrix 6
    //
    if( info.possible[ change.hovered ][ 6 ] === 1 )
    {
      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 47, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 143, 'y' ) + 3
      info.zone[ counter ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 49, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 143, 'y' ) + 3
      info.zone[ counter + 1 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 145, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 47, 'y' ) + 3
      info.zone[ counter + 2 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 145, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 49, 'y' ) + 3
      info.zone[ counter + 3 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 49, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 145, 'y' ) + 3
      info.zone[ counter + 4 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 47, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 145, 'y' ) + 3
      info.zone[ counter + 5 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 143, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 49, 'y' ) + 3
      info.zone[ counter + 6 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 143, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 47, 'y' ) + 3
      info.zone[ counter + 7 ] = [ x, y ]

      counter += 8
    }

    //==========================================================================
    // Matrix 7
    //
    if( info.possible[ change.hovered ][ 7 ] === 1 )
    {
      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 95, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 95, 'y' ) + 3
      info.zone[ counter ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 95, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 97, 'y' ) + 3
      info.zone[ counter + 1 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 97, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 97, 'y' ) + 3
      info.zone[ counter + 2 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 97, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 95, 'y' ) + 3
      info.zone[ counter + 3 ] = [ x, y ]

      counter += 4
    }

    //==========================================================================
    // Matrix 8
    //
    if( info.possible[ change.hovered ][ 8 ] === 1 )
    {
      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 95, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 143, 'y' ) + 3
      info.zone[ counter ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 97, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 143, 'y' ) + 3
      info.zone[ counter + 1 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 145, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 95, 'y' ) + 3
      info.zone[ counter + 2 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 145, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 97, 'y' ) + 3
      info.zone[ counter + 3 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 97, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 145, 'y' ) + 3
      info.zone[ counter + 4 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 95, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 145, 'y' ) + 3
      info.zone[ counter + 5 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 143, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 97, 'y' ) + 3
      info.zone[ counter + 6 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 143, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 95, 'y' ) + 3
      info.zone[ counter + 7 ] = [ x, y ]

      counter += 8
    }

    //==========================================================================
    // Matrix 9
    //
    if( info.possible[ change.hovered ][ 9 ] === 1 )
    {
      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 143, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 143, 'y' ) + 3
      info.zone[ counter ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] + 143, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 145, 'y' ) + 3
      info.zone[ counter + 1 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 145, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] - 145, 'y' ) + 3
      info.zone[ counter + 2 ] = [ x, y ]

      x = tool.bender( change.athlete[ change.hovered ][ 0 ] - 145, 'x' ) + 3
      y = tool.bender( change.athlete[ change.hovered ][ 1 ] + 143, 'y' ) + 3
      info.zone[ counter + 3 ] = [ x, y ]

      counter += 4
    }
  },
}
