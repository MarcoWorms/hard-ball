
'use strict'

////////////////////////////////////////////////////////////////////////////////
// Every mutable data pertinent to gameplay
//
Ω.state =
{
  //============================================================================
  // Prevents fast click exploit
  //
  lock: false,

  //............................................................................
  // Shows how many plays have happened
  //
  turn: 0,

  //============================================================================
  // Shows which players are in which team
  //
  team: { green: [], blue: [] },

  //............................................................................
  // Which, if any, is the current goalkeeper of each team
  //
  keeper: { green: 'none', blue: 'none' },

  //============================================================================
  // How many replacements each player still has
  //
  reps: { green: 2, blue: 2 },

  //............................................................................
  // Shows which athletes have been replaced
  //
  outed: [],

  //============================================================================
  // Shows which athletes are in the roundabout and which is currently moving
  //
  rounded: [],
  rounding: [ 'none', 0 ],

  //============================================================================
  // Which player played first and which is to play now
  //
  firstPlayer: '', // 'gre' or 'blu'
  currentPlayer: '', // 'gre' or 'blu'

  //============================================================================
  // Shows which athlete is being displayed
  //
  selected: 'none', // 'none', 'ball' or 0 to 19
  hovered: 'none', // 'none', 'ball' or 0 to 19

  displayed: 'none', // 'none', 'ball' or 0 to 19

  //============================================================================
  // Shows which athlete is being pushed
  //
  pushed: 'none', // 'none' or 0 to 19

  //============================================================================
  // Shows which athlete is holding the ball, and if there is someone taking it
  //
  holder: 'none', // 'none' or 0 to 19
  newHolder: 'none', // 'none' or 0 to 19

  //============================================================================
  // Shows which zones are not pushable
  //
  blocked: [],

  //============================================================================
  // Shows which athletes may not be selected
  //
  marked: [],

  //============================================================================
  // Defines which athletes (and/or the ball), if any, is under a zone
  //
  // [ [ zones ], [ athletes ] ]
  //
  target: [ [], [] ],

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

////////////////////////////////////////////////////////////////////////////////
// Every immutable data and every mutable data non-pertinent to gameplay
//
Ω.info =
{
  //============================================================================
  //
  aToL: [ 'A','B','C','D','E','F','G','H','I','J','K','L' ],

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
  // The 4 cells that make up the arena's center
  //
  arenaCenter: [ 'F09', 'F10', 'G09', 'G10' ],

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
        let array = []

        for( let $ = 0; $ < Ω.page.areaGreen.length; $ ++ )
        {
          array.push( Ω.page.areaGreen[ $ ].id )
        }

        return array
      }()
    ),

    //..........................................................................
    //
    blue:
    (
      function()
      {
        let array = []

        for( let $ = 0; $ < Ω.page.areaBlue.length; $ ++ )
        {
          array.push( Ω.page.areaBlue[ $ ].id )
        }

        return array
      }()
    ),
  },

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
      //========================================================================
      // Insert 13 rows into arrayRows
      //
      let arrayRows = []

      for( let $1 = 0; $1 < 13; $1 ++ )
      {
        //......................................................................
        // Insert 20 cells into arrayCells
        //
        let arrayCells = []

        for( let $2 = 0; $2 < 20; $2 ++ )
        {
          let x = $2 * 48
          let y = $1 * 48

          if( $1 === 12 ) y += 7 // correction for the bench

          arrayCells.push( [ x, y ] )
        }

        arrayRows.push( arrayCells )
      }

      //========================================================================
      //
      return arrayRows
    }()
  ),
}
