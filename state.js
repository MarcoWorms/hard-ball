
'use strict'

o.state =
{
  //////////////////////////////////////////////////////////////////////////////
  // MASTERS
  //
  turn:0,
  pass:{ main:false },
  first:null, // 'gre' or 'blu'
  now:null, // 'gre' or 'blu'

  //////////////////////////////////////////////////////////////////////////////
  // ATHLETE Nº
  //
  rounder:null, // lock
  grabber:null, // lock

  hovered:null, // or ball
  selected:null, // or ball
  displayed:null, // or ball

  roundabout:[],
  team:{ green:[], blue:[] },
  replaced:{ green:[], blue:[] },
  keeper:{ green:null, blue:null },
  holder:{ now:null, future:null },

  //////////////////////////////////////////////////////////////////////////////
  // ZONE Nº
  //
  blocked:[],
  aim:{ zone:[], target:[] },

  //////////////////////////////////////////////////////////////////////////////
  // POSITIONING
  //
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
    for( let $ = 0; $ < 16; $ ++ ){ array.push( { x:null, y:null } ) }
    return( array )
  } )(),
  spawn:
  {
    green:[ 'C02', 'D03', 'I03', 'J02' ],
    blue:[ 'J17', 'I16', 'D16', 'C17' ],
  },
}
