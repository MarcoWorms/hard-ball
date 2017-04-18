
"use strict"

o.state =
{
  turn:0,
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
}
