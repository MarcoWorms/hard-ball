
'use strict'

//////////////////////////////////////////////////////////////////////////////// INFO
// Every immutable data and every mutable data non-pertinent to gameplay
//
Ω.info =
{
  //============================================================================
  // Shows which athletes cannot be hovered
  //
  marked: [],

  //============================================================================
  // Shows which zones are not pushable
  //
  blocked: [],

  //============================================================================
  // Defines which athletes (and/or the ball), if any, is under a zone
  //
  // [ [ targets ], [ zones ] ]
  //
  target: [ [], [] ],

  //============================================================================
  // Which, if any, is the current goalkeeper of each team
  //
  keeper: { green: 'none', blue: 'none' },

  //============================================================================
  // 'info.cell' is an array containing 13 arrays (arena rows)
  // Each of these arrays contain 20 arrays (row's cells coordinates)
  // Each of these arrays contain 1 cell's information as follows
  //
  // [ numX, numY ]
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

          if( $1 === 12 ) y += 7 // correction for the bench

          array2.push( [ x, y ] )
        }

        array1.push( array2 )
      }

      return array1
    }()
  ),

  //============================================================================
  // 'info.zone' is an array containing 16 arrays (zone coordinates)
  // each of these arrays contain 1 zone's coordinates as follows
  //
  // [ numX, numY ]
  //
  zone:
  (
    function()
    {
      let array = []
      for( let $ = 0; $ < 16; $ ++ ) array.push( [ 'none', 'none' ] )
      return array
    }()
  ),

  //============================================================================
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
  move:
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

  //============================================================================
  // Each is an array of cell names relative to the area
  //
  area:
  {
    //..........................................................................
    //
    green:
    (
      function()
      {
        let entity = Ω.page.areaGreen
        let array = []
        for( let $ = 0; $ < entity.length; $ ++ ) array.push( entity[ $ ].id )
        return array
      }()
    ),

    //..........................................................................
    //
    blue:
    (
      function()
      {
        let entity = Ω.page.areaBlue
        let array = []
        for( let $ = 0; $ < entity.length; $ ++ ) array.push( entity[ $ ].id )
        return array
      }()
    ),
  },
}

//////////////////////////////////////////////////////////////////////////////// NOW
// Every mutable data pertinent to gameplay
//
Ω.now =
{
  //============================================================================
  // Shows how many plays have happened
  //
  turn: 0,

  //============================================================================
  // Shows which players are in which team,
  //
  team: { green: [], blue: [] },

  //============================================================================
  // Which player played first and which is to play now
  //
  firstPlayer: '',
  currentPlayer: '',

  //============================================================================
  // Shows which athlete is being displayed
  //
  selected: 'none', // 'none', 'ball' or 0 to 19
  hovered: 'none', // 'none', 'ball' or 0 to 19

  displayed: 'none', // 'none', 'ball' or 0 to 19

  //============================================================================
  // Shows which athlete is being pushed
  //
  pushed: 'none',

  //============================================================================
  // Position of the ball as follows
  //
  // [ numX, numY ]
  //
  ball: [ 0, 0 ],

  //============================================================================
  // 'now.athlete' is an array containing 20 arrays
  // Each of these arrays is 1 athlete's information as follows
  //
  // [ numX, numY, strColor ]
  //
  athlete:
  (
    function()
    {
      let array = []
      for( let $ = 0; $ < 20; $ ++ ) array.push( [ 0, 0, 'none' ] )
      return array
    }()
  ),

  //============================================================================
  // 'now.spawn' sets which cells are the initials as follows
  //
  // [ strYX ]
  //
  spawn:
  {
    green: [ 'C02', 'D03', 'I03', 'J02' ],
    blue: [ 'J17', 'I16', 'D16', 'C17' ],
  },
}
