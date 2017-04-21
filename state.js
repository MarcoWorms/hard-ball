
"use strict"

o.state =
{
  turn:0,
  first:null,
  holder:null,
  selected:null,
  pass:{ main:false },
  screen:{ x:0, y:0 },
  ball:{ x:0, y:0 },
  team:{ green:[], blue:[] },
  athlete:( ()=>
  {
    let array = []
    for( let $ = 0; $ < 20; $ ++ ){ array.push( { x:0, y:0 } ) }
    return( array )
  } )(),
  zone:( ()=>
  {
    let array = []
    for( let $ = 0; $ < 16; $ ++ ){ array.push( { x:0, y:0 } ) }
    return( array )
  } )(),
  spawn:
  {
    green:[ "C02", "D03", "I03", "J02" ],
    blue:[ "J17", "I16", "D16", "C17" ],
  },
}
