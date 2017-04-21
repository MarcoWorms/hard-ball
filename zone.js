
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

      for( let $ = 0; $ < beta; $ ++ )
      {
        const coord = o.tool.convert( o.info.center[ $ ] )
        o.state.zone[ $ ] = { x:coord.x, y:coord.y }
      }
    }
    else if( alfa === "start" )
    {
      // alfa = condition
      // beta = amount
      // gama = undefined

      const spawn = o.state.spawn.green.concat( o.state.spawn.blue )

      for( let $ = 0; $ < beta; $ ++ )
      {
        const coord = o.tool.convert( spawn[ $ ] )
        o.state.zone[ $ ] = { x:coord.x, y:coord.y }
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

      for( let $ = 0; $ < beta; $ ++ )
      {
        const coord = o.tool.convert( spawn[ $ ] )
        o.state.zone[ $ ] = { x:coord.x, y:coord.y }
      }
    }
    else if( alfa === "matrix" )
    {
      // alfa = condition
      // beta = object
      // gama = undefined

      const matrix = o.info.matrix[ beta ]
      let $1 = 0

      for( let $2 = 1; $2 < 10; $2 ++ )
      {
        if( matrix[ $2 ] )
        {
          $1 += o.zone.adjust( $1, beta, o.info.guide[ $2 ] )
        }
      }
    }
  },
  step_2:( amount )=>
  {
    for( let $ = 0; $ < amount; $ ++ )
    {
      o.page.zone[ $ ].style.marginLeft = o.state.zone[ $ ].x + "px"
      o.page.zone[ $ ].style.marginTop = o.state.zone[ $ ].y + "px"
      o.page.zone[ $ ].style.display = "flex"
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
  adjust:( $, number, list )=>
  {
    return( list.map( ( object, index )=>
    {
      o.zone.place( $ + index, number, object[ 0 ] * 48, object[ 1 ] * 48 )
      if( index === list.length - 1 ){ return( index + 1 ) }
    } )[ list.length - 1 ] )
  },
  place:( $, number, x, y )=>
  {
    o.state.zone[ $ ] =
    {
      x:o.tool.bend( o.state.athlete[ number ].x + x, "hor" ),
      y:o.tool.bend( o.state.athlete[ number ].y + y, "ver" ),
    }
  },
}
