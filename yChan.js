
'use strict'

//////////////////////////////////////////////////////////////////////////////// GLOBALS
//
// GAME EXTRA LISTEN TEXT PAGE LTOA INFO TEXT EVENT CHANGE STATE ENGINE

//////////////////////////////////////////////////////////////////////////////// CHANGE
//
let change =
{
  //============================================================================
  //
  turn: 0,

  //============================================================================
  // ATHLETE is an array containing 20 arrays
  // each of these arrays contain 1 athlete (x, y, cell, color, condition)
  //
  athlete:
  (
    function()
    {
      let array = []
      for( let $ = 0; $ < 20; $ ++ ) array.push( [ 0, 0, '', 0, 0 ] )
      return array
    }()
  ),
}
