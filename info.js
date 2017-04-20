
"use strict"

o.info =
{
  center:[ "F09", "F10", "G09", "G10" ],
  aToL:[ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L" ],
  cell:( ()=>
  {
    let arrayRows = []

    for( let count_1 = 0; count_1 < 13; count_1 ++ )
    {
      let arrayCells = []

      for( let count_2 = 0; count_2 < 20; count_2 ++ )
      {
        let x = count_2 * 48
        let y = count_1 * 48

        if( count_1 === 12 ){ y += 10 } // correction for the bench
        arrayCells.push( { x:x, y:y } )
      }

      arrayRows.push( arrayCells )
    }

    return( arrayRows )
  } )(),
  matrix:
  [
    // 0 1 2 3
    //   4 5 6
    //     7 8
    //       9
    //
    // 0 is how many zones the athlete needs, but also cosmetically represents
    // the athlete's position in the matrix
    //
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

    [ 4, 0,0,1, 0,0,0, 0,0, 0 ], // T14
    [ 4, 0,0,1, 0,0,0, 0,0, 0 ], // T15
    [ 4, 0,0,1, 0,0,0, 0,0, 0 ], // T16

    [ 4, 0,0,0, 0,0,0, 1,0, 0 ], // T17

    [ 8, 1,0,0, 1,0,0, 0,0, 0 ], // T18

    [ 4, 0,0,0, 1,0,0, 0,0, 0 ], // T19
  ],
}
