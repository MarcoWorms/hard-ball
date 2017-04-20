
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
    else if( typeof( object ) === "number" ) // athlete
    {
      if( o.state.athlete[ object ].y === 586 ) // benched
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
      else // playing
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
  step_1:( alfa, beta, gama )=>
  {
    if( alfa === "center" )
    {
      // alfa = condition
      // beta = amount
      // gama = undefined

      for( let count = 0; count < beta; count ++ )
      {
        const coord = o.tool.convert( o.info.center[ count ] )
        o.state.zone[ count ] = { x:coord.x, y:coord.y }
      }
    }
    else if( alfa === "start" )
    {
      // alfa = condition
      // beta = amount
      // gama = undefined

      const spawn = o.state.spawn.green.concat( o.state.spawn.blue )

      for( let count = 0; count < beta; count ++ )
      {
        const coord = o.tool.convert( spawn[ count ] )
        o.state.zone[ count ] = { x:coord.x, y:coord.y }
      }
    }
    else if( alfa === "place" )
    {
      // alfa = condition
      // beta = amount
      // gama = now

      let spawn

      if( gama === "gre" ){ spawn = o.state.spawn.green }
      else if( gama === "blu" ){ spawn = o.state.spawn.blue }

      for( let count = 0; count < beta; count ++ )
      {
        const coord = o.tool.convert( spawn[ count ] )
        o.state.zone[ count ] = { x:coord.x, y:coord.y }
      }
    }
    else if( alfa === "matrix" )
    {
      // alfa = condition
      // beta = object
      // gama = undefined

      const matrix = o.info.matrix[ beta ]
      let count = 0

      if( matrix[ 1 ] )
      {
        o.zone.calculate( count, beta, 0, 48 )
        o.zone.calculate( count + 1, beta, 48, 0 )
        o.zone.calculate( count + 2, beta, 0, -48 )
        o.zone.calculate( count + 3, beta, -48, 0 )
        count += 4
      }
      if( matrix[ 2 ] )
      {
        o.zone.calculate( count, beta, 0, -96 )
        o.zone.calculate( count + 1, beta, 96, 0 )
        o.zone.calculate( count + 2, beta, 0, 96 )
        o.zone.calculate( count + 3, beta, -96, 0 )
        count += 4
      }
      if( matrix[ 3 ] )
      {
        o.zone.calculate( count, beta, 0, 144 )
        o.zone.calculate( count + 1, beta, 144, 0 )
        o.zone.calculate( count + 2, beta, 0, -144 )
        o.zone.calculate( count + 3, beta, -144, 0 )
        count += 4
      }
      if( matrix[ 4 ] )
      {
        o.zone.calculate( count, beta, -48, -48 )
        o.zone.calculate( count + 1, beta, 48, -48 )
        o.zone.calculate( count + 2, beta, 48, 48 )
        o.zone.calculate( count + 3, beta, -48, 48 )
        count += 4
      }
      if( matrix[ 5 ] )
      {
        o.zone.calculate( count, beta, -48, -96 )
        o.zone.calculate( count + 1, beta, 48, -96 )
        o.zone.calculate( count + 2, beta, 96, -48 )
        o.zone.calculate( count + 3, beta, 96, 48 )
        o.zone.calculate( count + 4, beta, 48, 96 )
        o.zone.calculate( count + 5, beta, -48, 96 )
        o.zone.calculate( count + 6, beta, -96, 48 )
        o.zone.calculate( count + 7, beta, -96, -48 )
        count += 8
      }
      if( matrix[ 6 ] )
      {
        o.zone.calculate( count, beta, -48, -144 )
        o.zone.calculate( count + 1, beta, 48, -144 )
        o.zone.calculate( count + 2, beta, 144, -48 )
        o.zone.calculate( count + 3, beta, 144, 48 )
        o.zone.calculate( count + 4, beta, 48, 144 )
        o.zone.calculate( count + 5, beta, -48, 144 )
        o.zone.calculate( count + 6, beta, -144, 48 )
        o.zone.calculate( count + 7, beta, -144, -48 )
        count += 8
      }
      if( matrix[ 7 ] )
      {
        o.zone.calculate( count, beta, -96, -96 )
        o.zone.calculate( count + 1, beta, 96, -96 )
        o.zone.calculate( count + 2, beta, 96, 96 )
        o.zone.calculate( count + 3, beta, -96, 96 )
        count += 4
      }
      if( matrix[ 8 ] )
      {
        o.zone.calculate( count, beta, -96, -144 )
        o.zone.calculate( count + 1, beta, 96, -144 )
        o.zone.calculate( count + 2, beta, 144, -96 )
        o.zone.calculate( count + 3, beta, 144, 96 )
        o.zone.calculate( count + 4, beta, 96, 144 )
        o.zone.calculate( count + 5, beta, -96, 144 )
        o.zone.calculate( count + 6, beta, -144, 96 )
        o.zone.calculate( count + 7, beta, -144, -96 )
        count += 8
      }
      if( matrix[ 9 ] )
      {
        o.zone.calculate( count, beta, -144, -144 )
        o.zone.calculate( count + 1, beta, 144, -144 )
        o.zone.calculate( count + 2, beta, 144, 144 )
        o.zone.calculate( count + 3, beta, -144, 144 )
        count += 4
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
  place:()=>
  {
    // tbd
  },
  calculate:( count, beta, x, y )=>
  {
    o.state.zone[ count ] =
    {
      x:o.tool.bend( o.state.athlete[ beta ].x + x, "hor" ),
      y:o.tool.bend( o.state.athlete[ beta ].y + y, "ver" ),
    }
  },
}
