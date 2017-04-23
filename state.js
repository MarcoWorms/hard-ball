
"use strict"

o.state =
{
  turn:0,
  first:null, // "gre" or "blu"
  pass:{ main:false },

  selected:null, // athlete nº or ball
  team:{ green:[], blue:[] }, // athlete nº
  keeper:{ green:null, blue:null }, // athlete nº

  blocked:[], // zone nº
  roundabout:[], // athlete nº
  aim:{ zone:[], target:[] },

  screen:{ x:0, y:0 },
  ball:{ x:0, y:0 },
  athlete:( ()=>
  {
    let array = []
    for( let $ = 0; $ < 20; $ ++ ){ array.push( { x:0, y:0, color:null } ) }
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
