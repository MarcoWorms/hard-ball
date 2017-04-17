
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
    o.page.selection.style.zIndex = "20"
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
  },
  selection:( object )=>
  {
    if( object === "ball" )
    {
      o.page.selection.style.display = "none"
      setTimeout( ()=>
      {
        o.page.selection.style.display = "flex"
        const x = o.state.ball.x
        const y = o.state.ball.y
        o.tool.translate( o.page.selection, x, y )
      },
      0 )
    }
    else if( typeof( object ) === "number" )
    {
      o.page.selection.style.display = "none"
      setTimeout( ()=>
      {
        o.page.selection.style.display = "flex"
        const x = o.state.athlete[ object ].x
        const y = o.state.athlete[ object ].y
        o.tool.translate( o.page.selection, x, y )
      },
      0 )
    }
    else
    {
      o.page.selection.style.display = "none"
    }
  }
}
