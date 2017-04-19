
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
}
