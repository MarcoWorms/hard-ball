
"use strict"

o.zone =
{
  origin:( object )=>
  {
    const now = o.update.now()

    Array.from( o.page.zone ).map( ( zone, index )=>
    {
      zone.style.display = "none"
      o.state.zone[ index ] = { x:null, y:null }
    } )

    if( object === "ball" )
    {
      if( o.state.ball.x === 456 )
      {
        o.zone.step_1( "center", 4 )
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
            o.zone.step_1( "start", 8 )
            o.zone.step_2( 8 )
          }
          else
          {
            let amount

            if( now === "gre" ){ amount = o.state.spawn.green.length }
            else if( now === "blu" ){ amount = o.state.spawn.blue.length }

            o.zone.step_1( "place", amount, now )
            o.zone.step_2( amount )
          }

          o.zone.step_3( "bold" )
        }
        else
        {
          // replace
        }
      }
      else
      {
        o.zone.step_1( "matrix", object )
        o.zone.step_2( o.info.matrix[ object ][ 0 ] )

        const token_list = o.page.athlete[ object ].classList
        const list = Array.from( token_list )

        if( list.indexOf( now ) !== -1
        && o.state.turn > 7 )
        {
          o.zone.step_3( "bold" )
        }
        else
        {
          o.zone.step_3( "thin" )
        }
      }
    }
  },
  step_1:( a, b, c )=>
  {
    if( a === "center" )
    {
      for( let count = 0; count < b; count ++ )
      {
        const coord = o.tool.convert( o.info.center[ count ] )
        o.state.zone[ count ] = { x:coord.x, y:coord.y }
      }
    }
    else if( a === "start" )
    {
      const spawn = o.state.spawn.green.concat( o.state.spawn.blue )

      for( let count = 0; count < b; count ++ )
      {
        const coord = o.tool.convert( spawn[ count ] )
        o.state.zone[ count ] = { x:coord.x, y:coord.y }
      }
    }
    else if( a === "place" )
    {
      let spawn

      if( c === "gre" ){ spawn = o.state.spawn.green }
      else if( c === "blu" ){ spawn = o.state.spawn.blue }

      for( let count = 0; count < b; count ++ )
      {
        const coord = o.tool.convert( spawn[ count ] )
        o.state.zone[ count ] = { x:coord.x, y:coord.y }
      }
    }
    else if( a === "matrix" )
    {
      const matrix = o.info.matrix[ b ]

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
        zone.classList = "zon sqr abs box rn2 tr2 bld pnt"
      } )
    }
    else if( condition === "thin" )
    {
      Array.from( o.page.zone ).map( ( zone )=>
      {
        zone.classList = "zon sqr abs box rn2 tr2 thi"
      } )
    }
  },
}
