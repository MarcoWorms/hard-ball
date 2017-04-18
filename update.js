
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
    o.page.selection.style.zIndex = "2"
  },
  coord:( condition )=>
  {
    if( condition === "center" )
    {
      for( let count = 0; count < 4; count ++ )
      {
        const coord = o.tool.convert( o.info.center[ count ] )
        o.state.zone[ count ] = { x:coord.x, y:coord.y }
      }

      o.update.zone( 4 )
    }
    else( condition === "start" )
    {
      // tbd
    }
  },
  zone:( amount )=>
  {
    for( let count = 0; count < amount; count ++ )
    {
      o.page.zone[ count ].style.marginLeft = o.state.zone[ count ].x + "px"
      o.page.zone[ count ].style.marginTop = o.state.zone[ count ].y + "px"
      o.page.zone[ count ].style.display = "flex"
    }
  },
  origin:( object )=>
  {
    Array.from( o.page.zone ).map( ( z )=>{ z.style.display = "none" } )

    if( object === "ball" )
    {
      if( o.state.ball.x === 456 )
      {
        o.update.coord( "center" )
      }
      else if( o.state.holder )
      {
        // tbd
      }
    }
    else if( typeof( object ) === "number" )
    {
      if( o.state.athlete[ object ].y === 586 )
      {
        // tbd
      }
      else
      {
        // tbd
      }
    }
  },
  selection:( object )=>
  {
    o.page.selection.style.display = "none"

    if( object === "ball" )
    {
      setTimeout( ()=>
      {
        o.page.selection.style.display = "flex"
        const x = o.state.ball.x
        const y = o.state.ball.y
        o.tool.translate( o.page.selection, x, y )
      } )
    }
    else if( typeof( object ) === "number" )
    {
      setTimeout( ()=>
      {
        o.page.selection.style.display = "flex"
        const x = o.state.athlete[ object ].x
        const y = o.state.athlete[ object ].y
        o.tool.translate( o.page.selection, x, y )
      } )
    }
  }
}
