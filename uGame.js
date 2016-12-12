
'use strict'

//////////////////////////////////////////////////////////////////////////////// GLOBALS
//
// TOOL TIMER LISTEN GAME MESSAGE PAGE LTOA INFO TEXT EVENT CHANGE STATE ENGINE

//////////////////////////////////////////////////////////////////////////////// GAME
//
const game =
{
  ////////////////////////////////////////////////////////////////////////////// G.update
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
    for( let $ = 0; $ < 16; $ ++ )
    {
      let entity = page.zone[ $ ]

      if( change.hovered === 'none' && change.selected === 0 )
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

      let x = $ * 8
      let y = $ * 8

      tool.translate( entity, x, y )
      tool.rotate( entity, 1 )
    }
  },
}
