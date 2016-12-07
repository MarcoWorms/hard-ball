
'use strict'

//////////////////////////////////////////////////////////////////////////////// GLOBALS
//
// GAME LISTEN TEXT PAGE ATOZ INFO TEXT EVENT CHANGE STATE ENGINE

//////////////////////////////////////////////////////////////////////////////// CHANGE
//
let change =
{
  //============================================================================
  //
  turn: 0,

  //============================================================================
  // ATHLETE is an array containing 20 arrays
  // each of these arrays contain 3 numbers (x, y, color)
  //
  athlete:
  (
    function()
    {
      let array = []

      for( let $ = 0; $ < 20; $ ++ ) array.push( [ 0, 0, 0 ] )

      return array
    }()
  ),
}
