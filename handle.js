
"use strict"

o.handle =
{
  list:[],
  run:()=>
  {
    o.handle.list.map( ( event, index )=>
    {
      if( event.test() )
      {
        o.handle.list.splice( index, 1 )
        event.act()
      }
    } )
  }
}
