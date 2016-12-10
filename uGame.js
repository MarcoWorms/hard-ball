
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
  create: () =>
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
        change.athlete[ $ ][ 0 ] = info.gps[ 12 ][ $ ][ 0 ] + 1
        change.athlete[ $ ][ 1 ] = info.gps[ 12 ][ $ ][ 1 ] + 1
        change.athlete[ $ ][ 2 ] = info.gps[ 12 ][ $ ][ 2 ]
      }

      //========================================================================
      // Setting the ball's initial position
      //
      page.ball.style.transform = 'translate(457px,265px)'
    }
  },

  ////////////////////////////////////////////////////////////////////////////// G.update
  //
  update: () =>
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
}
