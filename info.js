
'use strict'

o.info =
{
  center:[ 'F09', 'F10', 'G09', 'G10' ],
  area:
  {
    green:
    [
      'C00', 'C01', 'D00', 'D01', 'D02', 'E00', 'E01', 'E02', 'E03', 'F00',
      'F01', 'F02', 'F03', 'G00', 'G01', 'G02', 'G03', 'H00', 'H01', 'H02',
      'H03', 'I00', 'I01', 'I02', 'J00', 'J01'
    ],
    blue:
    [
      'C19', 'C18', 'D19', 'D18', 'D17', 'E19', 'E18', 'E17', 'E16', 'F19',
      'F18', 'F17', 'F16', 'G19', 'G18', 'G17', 'G16', 'H19', 'H18', 'H17',
      'H16', 'I19', 'I18', 'I17', 'J19', 'J18'
    ],
  },
  goal:
  {
    green:[ 'C00', 'D00', 'E00', 'F00', 'G00', 'H00', 'I00', 'J00' ],
    blue:[ 'C19', 'D19', 'E19', 'F19', 'G19', 'H19', 'I19', 'J19' ],
  },
  aToL:[ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L' ],
  cell:( ()=>
  {
    let arrayRows = []

    for( let $1 = 0; $1 < 13; $1 ++ )
    {
      let arrayCells = []

      for( let $2 = 0; $2 < 20; $2 ++ )
      {
        let x = $2 * 48
        let y = $1 * 48

        if( $1 === 12 ){ y += 10 } // correction for the bench

        arrayCells.push( { x:x, y:y } )
      }

      arrayRows.push( arrayCells )
    }

    return( arrayRows )
  } )(),
  matrix:
  [
    // X 0 1 2
    //   3 4 5
    //     6 7
    //       8
    //
    [ 1,0,0, 1,1,0, 0,0, 0 ], // T00

    [ 0,1,0, 0,1,0, 0,0, 0 ], // T01
    [ 0,1,0, 0,1,0, 0,0, 0 ], // T02

    [ 0,0,0, 0,1,0, 1,0, 0 ], // T03

    [ 1,1,0, 1,0,0, 0,0, 0 ], // T04

    [ 0,0,0, 0,1,0, 0,0, 0 ], // T05
    [ 0,0,0, 0,1,0, 0,0, 0 ], // T06

    [ 0,0,0, 0,0,1, 0,0, 0 ], // T07
    [ 0,0,0, 0,0,1, 0,0, 0 ], // T08
    [ 0,0,0, 0,0,1, 0,0, 0 ], // T09
    [ 0,0,0, 0,0,1, 0,0, 0 ], // T10

    [ 0,0,0, 0,0,0, 0,1, 0 ], // T11
    [ 0,0,0, 0,0,0, 0,1, 0 ], // T12

    [ 0,0,0, 0,0,0, 0,0, 1 ], // T13

    [ 0,0,1, 0,0,0, 0,0, 0 ], // T14
    [ 0,0,1, 0,0,0, 0,0, 0 ], // T15
    [ 0,0,1, 0,0,0, 0,0, 0 ], // T16

    [ 0,0,0, 0,0,0, 1,0, 0 ], // T17

    [ 1,0,0, 1,0,0, 0,0, 0 ], // T18 and BALL and ROUNDER

    [ 0,0,0, 1,0,0, 0,0, 0 ], // T19
  ],
  guide:
  [
    [[0,1],[1,0],[0,-1],[-1,0]],
    [[0,2],[2,0],[0,-2],[-2,0]],
    [[0,3],[3,0],[0,-3],[-3,0]],
    [[-1,-1],[1,1],[1,-1],[-1,1]],
    [[1,2],[1,-2],[2,1],[2,-1],[-1,2],[-1,-2],[-2,1],[-2,-1]],
    [[1,3],[1,-3],[3,1],[3,-1],[-1,3],[-1,-3],[-3,1],[-3,-1]],
    [[-2,-2],[2,2],[2,-2],[-2,2]],
    [[2,3],[2,-3],[3,2],[3,-2],[-2,3],[-2,-3],[-3,2],[-3,-2]],
    [[-3,-3],[3,3],[3,-3],[-3,3]],
  ],
  message: // ATTENTION to spaces!
  [
    // SAVE & LOAD
    //
    'RESET', // 0
    'REALLY', // 1
    'ARE YOU SURE ?!\n(unsaved progress will be lost)', // 2
    'USE NUMBERS TO SAVE OR LOAD', // 3
    'SAVE STATE ', // 4
    'LOAD STATE ', // 5
    'OVERWRITE STATE ', // 6
    'ERASE STATE ', // 7
    ' ?', // 8

    // CONSOLE
    //
    'CLICK any athlete', // 9
    'NOPE... This is the BALL', // 10
    'YES! This is nº', // 11
    'CLICK any yellow ZONE to place it', // 12
    '', // 13
    '', // 14
    '', // 15
    '', // 16
    '', // 17
    '', // 18
    '', // 19
    '', // 20
    '', // 21
  ],
}
