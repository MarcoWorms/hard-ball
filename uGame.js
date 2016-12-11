
'use strict'

//////////////////////////////////////////////////////////////////////////////// GLOBALS
//
// TOOL LISTEN GAME MESSAGE PAGE LTOA INFO TEXT EVENT CHANGE STATE ENGINE

//////////////////////////////////////////////////////////////////////////////// GAME
//
const game =
{
  ////////////////////////////////////////////////////////////////////////////// G.create
  //
  create: function()
  {
    //==========================================================================
    // Checking if there is a save or not
    // 
    if( change.turn === 0 )
    {
      //========================================================================
      // Setting athletes' initial positions
      //
      for( let $ = 0; $ < 20; $ ++ )
      {
        change.athlete[ $ ][ 0 ] = info.cell[ 12 ][ $ ][ 0 ] + 1
        change.athlete[ $ ][ 1 ] = info.cell[ 12 ][ $ ][ 1 ] + 1
        change.athlete[ $ ][ 2 ] = info.cell[ 12 ][ $ ][ 2 ]
      }

      //========================================================================
      // Setting the ball's initial position
      //
      change.ball[ 0 ] = 457
      change.ball[ 1 ] = 265
    }
    else
    {
    }

    game.updAtl()
    game.updBal()
  },

  ////////////////////////////////////////////////////////////////////////////// G.updAtl
  //
  updAtl: function()
  {
    //==========================================================================
    // Updating athletes' positions
    //
    for( let $ = 0; $ < 20; $ ++ )
    {
      let x = change.athlete[ $ ][ 0 ]
      let y = change.athlete[ $ ][ 1 ]

      page.athlete[ $ ].style.transform = 'translate(' + x + 'px,' + y + 'px)'
    }
  },

  ////////////////////////////////////////////////////////////////////////////// G.updBal
  //
  updBal: function()
  {
    //==========================================================================
    // Updating the ball's position
    //
    let x = change.ball[ 0 ]
    let y = change.ball[ 1 ]

    page.ball.style.transform = 'translate(' + x + 'px,' + y + 'px)'
  },

  ////////////////////////////////////////////////////////////////////////////// G.updZon
  //
  updZon: function()
  {
    //==========================================================================
    // Updating the zones position and rotation
    //
    if( change.now === 'none' )
    {
      page.zone.forEach( function( $ ) $.style.display = 'none' )
    }
    else // DELETE to implement below // else if( change.turn > 7 && change.athlete[ change.now ][ 5 ] === 1 )
    {
      for( let $ = 0; $ < info.possible[ change.now ][ 0 ]; $ ++ )
      {
        let entity = page.zone[ $ ].style

        let x = 0 // Both have to come from a predetermined list of coordinates
        let y = 0 // ...

        entity.display = 'flex'
        entity.transform = 'translate(' + x + 'px,' + y + 'px)'
      }
    }
  },
}
