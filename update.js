
"use strict"

o.update =
{
  ball:()=>
  {
    o.tool.translate( o.page.ball, o.state.ball.x, o.state.ball.y )
  },
  trigger:()=>
  {
    o.tool.translate( o.page.trigger, o.state.ball.x, o.state.ball.y )
  },
  athlete:()=>
  {
    Array.from( o.page.athlete ).forEach( ( object, index )=>
    {
      const athlete = o.state.athlete[ index ]
      o.tool.translate( object, athlete.x, athlete.y )
    } )
  },
  index:()=>
  {
    o.page.ball.style.zIndex = "1"
  },
  zone:( object )=>
  {
    if( object === "ball" )
    {
      Array.from( o.page.zone ).map( ( z )=>{ z.style.display = "flex" } )
    }
    else if( typeof( object ) === "number" )
    {
      Array.from( o.page.zone ).map( ( z )=>{ z.style.display = "flex" } )
    }
    else
    {
      Array.from( o.page.zone ).map( ( z )=>{ z.style.display = "none" } )
    }
  }
}
