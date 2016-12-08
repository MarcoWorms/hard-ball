
'use strict'

//////////////////////////////////////////////////////////////////////////////// GLOBALS
//
// GAME EXTRA LISTEN TEXT PAGE INFO TEXT EVENT CHANGE STATE ENGINE

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
  yes: document.getElementById( 'yes' ),
  reset: document.getElementById( 'reset' ),
  no: document.getElementById( 'no' ),

  //============================================================================
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
  ],
}

//////////////////////////////////////////////////////////////////////////////// INFO
//
const info =
{
  ////////////////////////////////////////////////////////////////////////////// I.lToA
  // Adapted alphabet
  //
  lToA:
  [
    'L', 'A', 'B', 'C', 'D', 'E', 'F',
    'G', 'H', 'I', 'J', 'K', 'L', 'A',
  ],

  ////////////////////////////////////////////////////////////////////////////// I.possible
  // Matrix of how each athlete moves
  //
  // 00 01 02 03
  // 04 05 06 07
  // 08 09 10 11
  // 12 13 14 15
  //
  // 00 is the athlete's position
  //
  possible:
  [
    [ 0,1,0,0, 1,1,1,0, 0,1,0,0, 0,0,0,0 ], // T00
    [ 0,0,1,0, 0,0,1,0, 1,1,0,0, 0,0,0,0 ], // T01 T02
    [ 0,0,0,0, 0,0,1,0, 0,1,1,0, 0,0,0,0 ], // T03
    [ 0,1,1,0, 1,1,0,0, 1,0,0,0, 0,0,0,0 ], // T04
    [ 0,0,0,0, 0,0,1,0, 0,1,0,0, 0,0,0,0 ], // T05 T06
    [ 0,0,0,0, 0,0,0,1, 0,0,0,0, 0,1,0,0 ], // T07 T08 T09 T10
    [ 0,0,0,0, 0,0,0,0, 0,0,0,1, 0,0,1,0 ], // T11 T12
    [ 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,1 ], // T13
    [ 0,0,0,1, 0,0,0,0, 0,0,0,0, 1,0,0,0 ], // T14 T15 T16
    [ 0,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0 ], // T17
    [ 0,1,0,0, 1,1,0,0, 0,0,0,0, 0,0,0,0 ], // T18
    [ 0,0,0,0, 0,1,0,0, 0,0,0,0, 0,0,0,0 ], // T19
  ],

  ////////////////////////////////////////////////////////////////////////////// I.gps
  // GPS is an array containing 13 arrays (arena rows)
  // each of these arrays contain 20 arrays (row cells coordinates)
  // each of these arrays contain 2 numbers and 1 string (x, y, name)
  //
  gps:
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
          let name = info.lToA[ $1 + 1 ]
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

  ////////////////////////////////////////////////////////////////////////////// I.family
  // FAMILY is an array containing 12 arrays (arena rows)
  // (not 13 because row 'M' doesn't have use for relatives)
  // each of these arrays contain 20 arrays (row cells relatives)
  // each of these arrays contain 8 strings (name, rel1, rel2, ... )
  //
  family:
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
          // Starts writing name
          //
          // rel1 rel2 rel3
          // rel4 name rel5
          // rel6 rel7 rel8
          //
          let rel1 = info.lToA[ $1 ]
          let rel2 = info.lToA[ $1 ]
          let rel3 = info.lToA[ $1 ]
          let rel4 = info.lToA[ $1 + 1 ]
          let name = info.lToA[ $1 + 1 ]
          let rel5 = info.lToA[ $1 + 1 ]
          let rel6 = info.lToA[ $1 + 2 ]
          let rel7 = info.lToA[ $1 + 2 ]
          let rel8 = info.lToA[ $1 + 2 ]

          //--------------------------------------------------------------------
          // This is here because so far it has no global usefulness
          //
          let array =
          [
            '19', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
            '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '00',
          ]

          //--------------------------------------------------------------------
          // Finishing naming each element
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
          // NAME is the array's element 0
          //
          array2.push( [ name,rel1,rel2,rel3,rel4,rel5,rel6,rel7,rel8 ] )
        }

        array1.push( array2 )
      }

      return array1
    }()
  ),
}
