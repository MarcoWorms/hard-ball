
'use strict'

//////////////////////////////////////////////////////////////////////////////// GLOBALS
//
// TOOL TIMER LISTEN GAME MESSAGE PAGE LTOA INFO TEXT EVENT CHANGE STATE ENGINE

//////////////////////////////////////////////////////////////////////////////// CHANGE
//
let change =
{
  //============================================================================
  // Records how many moves went down so far
  //
  turn: 0,

  //============================================================================
  // This is a number from 0 to 19 or 'none' (athlete currently being hovered)
  //
  hovered: 'none',

  //============================================================================
  // This is a number from 0 to 19 or 'none' (athlete currently being selected)
  //
  selected: 'none',

  //============================================================================
  // Gives current coordinates to the ball
  //
  ball: [ 0, 0 ],

  //============================================================================
  // ATHLETE is an array containing 20 arrays
  // each of these arrays contain 1 athlete (x, y, cell, color, condition)
  //                                        num num str   str     str
  //
  athlete:
  (
    function()
    {
      let array = []
      for( let $ = 0; $ < 20; $ ++ ) array.push( [ 0, 0, '', 'none', 'ready' ] )
      return array
    }()
  ),
}
