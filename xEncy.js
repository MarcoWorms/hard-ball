
'use strict'

//////////////////////////////////////////////////////////////////////////////// GLOBALS
//
// TOOL TIMER LISTEN GAME MESSAGE PAGE LTOA INFO TEXT EVENT CHANGE STATE ENGINE

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
  notation: document.getElementById( 'notation' ),
  console: document.getElementById( 'console' ),

  yes: document.getElementById( 'yes' ),
  reset: document.getElementById( 'reset' ),
  no: document.getElementById( 'no' ),

  ball: document.getElementById( 'ball' ),

  selected: document.getElementById( 'selected' ),

  //============================================================================
  //
  hoverZone: // 16 zones
  [
    document.getElementById( 'hov00' ),
    document.getElementById( 'hov01' ),
    document.getElementById( 'hov02' ),
    document.getElementById( 'hov03' ),
    document.getElementById( 'hov04' ),
    document.getElementById( 'hov05' ),
    document.getElementById( 'hov06' ),
    document.getElementById( 'hov07' ),
    document.getElementById( 'hov08' ),
    document.getElementById( 'hov09' ),
    document.getElementById( 'hov10' ),
    document.getElementById( 'hov11' ),
    document.getElementById( 'hov12' ),
    document.getElementById( 'hov13' ),
    document.getElementById( 'hov14' ),
    document.getElementById( 'hov15' ),
  ],

  //============================================================================
  //
  selectZone: // 16 zones
  [
    document.getElementById( 'sel00' ),
    document.getElementById( 'sel01' ),
    document.getElementById( 'sel02' ),
    document.getElementById( 'sel03' ),
    document.getElementById( 'sel04' ),
    document.getElementById( 'sel05' ),
    document.getElementById( 'sel06' ),
    document.getElementById( 'sel07' ),
    document.getElementById( 'sel08' ),
    document.getElementById( 'sel09' ),
    document.getElementById( 'sel10' ),
    document.getElementById( 'sel11' ),
    document.getElementById( 'sel12' ),
    document.getElementById( 'sel13' ),
    document.getElementById( 'sel14' ),
    document.getElementById( 'sel15' ),
  ],

  //============================================================================
  //
  athlete: // 20 athletes
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
  ],
}

//////////////////////////////////////////////////////////////////////////////// LTOA
// Adapted alphabet
//
const lToA = [ 'L','A','B','C','D','E','F','G','H','I','J','K','L','A' ]

//////////////////////////////////////////////////////////////////////////////// INFO
//
const info =
{
  ////////////////////////////////////////////////////////////////////////////// I.target
  // Shows what are the athletes currently under another's aim
  //
  target: [],

  ////////////////////////////////////////////////////////////////////////////// I.athlete
  // Shows what are the acceptable HTML IDs to be declared an athlete
  //
  athlete:
  [
    'minT00', 'minT01', 'minT02', 'minT03', 'minT04',
    'minT05', 'minT06', 'minT07', 'minT08', 'minT09',
    'minT10', 'minT11', 'minT12', 'minT13', 'minT14',
    'minT15', 'minT16', 'minT17', 'minT18', 'minT19',
  ],

  ////////////////////////////////////////////////////////////////////////////// I.zone
  // ZONES are each an array containing 16 arrays (zone coordinates)
  // each of these arrays contain 2 numbers (x, y )
  //
  hoverZone:
  (
    function()
    {
      let array = []
      for( let $ = 0; $ < 16; $ ++ ) array.push( [ 0, 0 ] )
      return array
    }()
  ),

  //----------------------------------------------------------------------------
  //
  selectZone:
  (
    function()
    {
      let array = []
      for( let $ = 0; $ < 16; $ ++ ) array.push( [ 0, 0 ] )
      return array
    }()
  ),

  ////////////////////////////////////////////////////////////////////////////// I.possible
  // Matrix of how each athlete moves
  //
  // 00 01 02 03
  //    04 05 06
  //       07 08
  //          09
  //
  // 00 is how many zones the athlete needs
  // It also represents the athlete's position in relation to the matrix
  //
  possible:
  [
    [ 16, 1,0,0, 1,1,0, 0,0, 0 ], // T00

    [ 12, 0,1,0, 0,1,0, 0,0, 0 ], // T01
    [ 12, 0,1,0, 0,1,0, 0,0, 0 ], // T02

    [ 12, 0,0,0, 0,1,0, 1,0, 0 ], // T03

    [ 12, 1,1,0, 1,0,0, 0,0, 0 ], // T04

    [ 8, 0,0,0, 0,1,0, 0,0, 0 ], // T05
    [ 8, 0,0,0, 0,1,0, 0,0, 0 ], // T06

    [ 8, 0,0,0, 0,0,1, 0,0, 0 ], // T07
    [ 8, 0,0,0, 0,0,1, 0,0, 0 ], // T08
    [ 8, 0,0,0, 0,0,1, 0,0, 0 ], // T09
    [ 8, 0,0,0, 0,0,1, 0,0, 0 ], // T10

    [ 8, 0,0,0, 0,0,0, 0,1, 0 ], // T11
    [ 8, 0,0,0, 0,0,0, 0,1, 0 ], // T12

    [ 4, 0,0,0, 0,0,0, 0,0, 1 ], // T13

    [ 4,0,0,1, 0,0,0, 0,0, 0 ], // T14
    [ 4,0,0,1, 0,0,0, 0,0, 0 ], // T15
    [ 4,0,0,1, 0,0,0, 0,0, 0 ], // T16

    [ 4,0,0,0, 0,0,0, 1,0, 0 ], // T17

    [ 8,1,0,0, 1,0,0, 0,0, 0 ], // T18

    [ 4,0,0,0, 1,0,0, 0,0, 0 ], // T19
  ],

  ////////////////////////////////////////////////////////////////////////////// I.cell
  // CELL is an array containing 13 arrays (arena rows)
  // each of these arrays contain 20 arrays (row cells coordinates)
  // each of these arrays contain 2 numbers and 1 string (x, y, name)
  //
  cell:
  (
    function()
    {
      let array1 = []

      for( let $1 = 0; $1 < 13; $1 ++ ) // insert 13 rows into array1
      {
        let array2 = []

        for( let $2 = 0; $2 < 20; $2 ++ ) // insert 20 cells into array2
        {
          let x = $2 * 48
          let y = $1 * 48

          //--------------------------------------------------------------------
          // Corrects number appearance if necessary then writes name
          //
          let name

          if( $1 < 11 ) name = lToA[ $1 + 1 ]
          else          name = 'M'

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

  ////////////////////////////////////////////////////////////////////////////// I.sibling
  // SIBLING is an array containing 12 arrays (arena rows)
  // (not 13 because row 'M' doesn't have use for relatives)
  // each of these arrays contain 20 arrays (row cells relatives)
  // each of these arrays contain 8 strings (name, rel1, rel2, ... )
  //
  sibling:
  (
    function()
    {
      let array1 = []

      for( let $1 = 0; $1 < 12; $1 ++ ) // insert 12 rows into array1
      {
        let array2 = []

        for( let $2 = 0; $2 < 20; $2 ++ ) // insert 20 cells into array2
        {
          //--------------------------------------------------------------------
          // Starting names
          //
          // rel1 rel2 rel3
          // rel4 name rel5
          // rel6 rel7 rel8
          //
          let rel1 = lToA[ $1 ]
          let rel2 = lToA[ $1 ]
          let rel3 = lToA[ $1 ]
          let rel4 = lToA[ $1 + 1 ]
          let name = lToA[ $1 + 1 ]
          let rel5 = lToA[ $1 + 1 ]
          let rel6 = lToA[ $1 + 2 ]
          let rel7 = lToA[ $1 + 2 ]
          let rel8 = lToA[ $1 + 2 ]

          //--------------------------------------------------------------------
          // This is here because so far it has no global usefulness
          //
          let array =
          [
            '19', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
            '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '00',
          ]

          //--------------------------------------------------------------------
          // Finishing names
          //
          rel1 += array[ $2 ]
          rel2 += array[ $2 + 1 ]
          rel3 += array[ $2 + 2 ]
          rel4 += array[ $2 ]
          name += array[ $2 + 1 ]
          rel5 += array[ $2 + 2 ]
          rel6 += array[ $2 ]
          rel7 += array[ $2 + 1 ]
          rel8 += array[ $2 + 2 ]

          //--------------------------------------------------------------------
          // IMPORTANT!
          //
          // NAME is the array's element 0, it's been shown before in the middle
          // of 'rel's for the sake of clarity in displaying the logic
          //
          array2.push( [ name,rel1,rel2,rel3,rel4,rel5,rel6,rel7,rel8 ] )
        }

        array1.push( array2 )
      }

      return array1
    }()
  ),
}
