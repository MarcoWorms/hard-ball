
"use strict"

o.state =
{
  selected:null,
  lock:{ main:true },
  ball:{ x:0, y:0 },
  athlete:( ()=>
  {
    let array = []
    for( let count = 0; count < 20; count ++ ){ array.push( { x:0, y:0 } ) }
    return( array )
  } )(),
}
