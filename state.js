
"use strict"

o.state =
{
  turn:0,
  first:null,
  holder:null,
  selected:null,
  lock:{ main:true },
  ball:{ x:0, y:0 },
  athlete:( ()=>
  {
    let array = []
    for( let count = 0; count < 20; count ++ ){ array.push( { x:0, y:0 } ) }
    return( array )
  } )(),
  zone:( ()=>
  {
    let array = []
    for( let count = 0; count < 16; count ++ ){ array.push( { x:0, y:0 } ) }
    return( array )
  } )(),
  spawn:
  {
    green:[ 'C02', 'D03', 'I03', 'J02' ],
    blue:[ 'J17', 'I16', 'D16', 'C17' ],
  },
}
