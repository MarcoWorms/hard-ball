
"use strict"

o.zone =
{
  origin:( object )=>
  {
    Array.from( o.page.zone ).map( ( zone, index )=>
    {
      zone.style.display = "none"
      o.state.zone[ index ] = { x:null, y:null }
    } )

    if( object === "ball" )
    {
      if( o.state.ball.x === 456 )
      {
        o.zone.step_1( "center", 4, null )
        o.zone.step_2( 4 )
        o.zone.step_3( "thin" )
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
        if( o.state.turn < 8 )
        {
          if( o.state.turn === 0 )
          {
            o.zone.step_1( "start", 8, null )
            o.zone.step_2( 8 )
            o.zone.step_3( "bold" )
          }
          else
          {
            const now = o.update.now()
            let amount

            if( now === "gre" ){ amount = o.state.spawn.green.length }
            else if( now === "blu" ){ amount = o.state.spawn.blue.length }

            o.zone.step_1( "place", amount, now )
            o.zone.step_2( amount )
            o.zone.step_3( "bold" )
          }
        }
        else
        {
          // replace
        }
      }
      else
      {
        // playing
      }
    }
  },
  step_1:( condition, amount, now )=>
  {
    if( condition === "center" )
    {
      for( let count = 0; count < amount; count ++ )
      {
        const coord = o.tool.convert( o.info.center[ count ] )
        o.state.zone[ count ] = { x:coord.x, y:coord.y }
      }
    }
    else if( condition === "start" )
    {
      const spawn = o.state.spawn.green.concat( o.state.spawn.blue )

      for( let count = 0; count < amount; count ++ )
      {
        const coord = o.tool.convert( spawn[ count ] )
        o.state.zone[ count ] = { x:coord.x, y:coord.y }
      }

      console.log( o.state.zone )
    }
    else if( condition === "place" )
    {
      let spawn

      if( now === "gre" ){ spawn = o.state.spawn.green }
      else if( now === "blu" ){ spawn = o.state.spawn.blue }

      for( let count = 0; count < amount; count ++ )
      {
        const coord = o.tool.convert( spawn[ count ] )
        o.state.zone[ count ] = { x:coord.x, y:coord.y }
      }
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
        zone.classList.add( "pnt" )
      } )
    }
    else if( condition === "thin" )
    {
      Array.from( o.page.zone ).map( ( zone )=>
      {
        zone.classList.remove( "bld" )
        zone.classList.remove( "pnt" )
        zone.classList.add( "thi" )
      } )
    }
  },
}
