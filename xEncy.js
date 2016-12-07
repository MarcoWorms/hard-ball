
'use strict'

//////////////////////////////////////////////////////////////////////////////// GLOBALS
//
// GAME LISTEN TEXT PAGE ATOZ INFO TEXT EVENT CHANGE STATE ENGINE

//////////////////////////////////////////////////////////////////////////////// PAGE
//
const page =
{
  //////////////////////////////////////////////////////////////////////////////
  // Tests to see if browser is Chrome
  //
  chrome: !!window.chrome && !!window.chrome.webstore,

  //////////////////////////////////////////////////////////////////////////////
  // Get HTML elements
  //
  athlete:
  [
    document.getElementById( 'T00' ),
    document.getElementById( 'T01' ),
    document.getElementById( 'T02' ),
    document.getElementById( 'T03' ),
    document.getElementById( 'T04' ),
    document.getElementById( 'T05' ),
    document.getElementById( 'T06' ),
    document.getElementById( 'T07' ),
    document.getElementById( 'T08' ),
    document.getElementById( 'T09' ),
    document.getElementById( 'T10' ),
    document.getElementById( 'T11' ),
    document.getElementById( 'T12' ),
    document.getElementById( 'T13' ),
    document.getElementById( 'T14' ),
    document.getElementById( 'T15' ),
    document.getElementById( 'T16' ),
    document.getElementById( 'T17' ),
    document.getElementById( 'T18' ),
    document.getElementById( 'T19' ),
  ]
}

//////////////////////////////////////////////////////////////////////////////// ATOZ
// ez2uz alphabet
//
const aToZ =
[
  'A','B','C','D',
  'E','F','G','H',
  'I','J','K','L',
  'M','N','O','P',
  'Q','R','S','T',
  'U','V','W','X',
  'Y','Z',
]

//////////////////////////////////////////////////////////////////////////////// INFO
//
const info =
{
  //////////////////////////////////////////////////////////////////////////////
  //
  family:
  {},

  //////////////////////////////////////////////////////////////////////////////
  // GPS is an array containing 13 arrays (arena rows)
  // each of these arrays cointain 20 arrays (row cells coordinates)
  // each of these arrays cointain 1 string and 2 numbers (x, y, name)
  //
  gps:
  (
    function()
    {
      let array1 = []
      let array2 = []

      for( let $1 = 0; $1 < 13; $1 ++ ) // insert 13 rows into array1
      {
        for( let $2 = 0; $2 < 20; $2 ++ ) // insert 20 cells into array2
        {
          let x = $2 * 48
          let y = $1 * 48

          //--------------------------------------------------------------------
          // Corrects number appearance if necessary then writes name
          //
          let name = aToZ[ $1 ]
          if( $2 < 10 ) name += '0'
          name += $2

          //--------------------------------------------------------------------
          // Corrects vertical coordinate if necessary
          //
          if( $1 === 12 ) y += 7

          array2.push( [ x, y, name ] )
        }

        array1.push( array2 )
      }

      return array1
    }()
  ),
}
