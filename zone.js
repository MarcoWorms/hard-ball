
"use strict"

o.zone =
{
  origin:( object )=>
  {
    Array.from( o.page.zone ).map( ( z )=>{ z.style.display = "none" } )

    if( object === "ball" )
    {
      if( o.state.ball.x === 456 )
      {
        o.zone.step_1( "center" )
        o.zone.step_2( 4 )
        o.zone.step_3( "bold" )
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
  step_1:( condition )=>
  {
    if( condition === "center" )
    {
      for( let count = 0; count < 4; count ++ )
      {
        const coord = o.tool.convert( o.info.center[ count ] )
        o.state.zone[ count ] = { x:coord.x, y:coord.y }
      }
    }
    else( condition === "start" )
    {
      // tbd
    }
  },
  step_2:( amount )=>
  {
    for( let count = 0; count < amount; count ++ )
    {
      o.page.zone[ count ].style.marginLeft = o.state.zone[ count ].x + "px"
      o.page.zone[ count ].style.marginTop = o.state.zone[ count ].y + "px"
      o.page.zone[ count ].style.display = "flex"
    }
  },
  step_3:( condition )=>
  {
    if( condition === "bold" )
    {
      Array.from( o.page.zone ).map( ( zone )=>
      {
        zone.classList.remove( "thi" )
        zone.classList.add( "bld" )
      } )
    }
    else if( condition === "thin" )
    {
      Array.from( o.page.zone ).map( ( zone )=>
      {
        zone.classList.remove( "bld" )
        zone.classList.add( "thi" )
      } )
    }
  },
}
