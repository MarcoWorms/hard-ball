
"use strict"

o.info =
{
  center:[ "F09", "F10", "G09", "G10" ],
  aToL:[ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L" ],
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

    [ 8, 1,0,0, 1,0,0, 0,0, 0 ], // T18 and BALL

    [ 4, 0,0,0, 1,0,0, 0,0, 0 ], // T19
  ],
  guide:
  [
    null, // to work more fluidly with the matrix
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
}
