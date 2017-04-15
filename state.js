
"use strict"

o.state =
{
  ball:{ x:0, y:0 },

  athlete:( ()=>
  {
    let array = []
    for( let count = 0; count < 20; count ++ ){ array.push( { x:0, y:0 } ) }
    return( array )
  } )(),

  lock:
  {
    game:true,
  },
}
