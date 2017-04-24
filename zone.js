
"use strict"

o.zone =
{
  origin:( object )=> // beginning of process + INDEX update
  {
    o.update.index( object )

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
        o.zone.step_1( "center" )
        o.zone.step_2( object )
        o.zone.step_3( "thin" )
      }
    }
    else if( typeof( object ) === "number" ) // athlete
    {
      const athlete = o.state.athlete[ object ]

      if( athlete.y === 586 ) // benched
      {
        if( o.state.turn < 8 )
        {
          if( o.state.turn === 0 )
          {
            o.zone.step_1( "start" )
            o.zone.step_2( object )
          }
          else
          {
            o.zone.step_1( "place", now )
            o.zone.step_2( object )
          }

          o.zone.step_3( "bold" )
        }
        else
        {
          o.zone.step_1( "replace", now )
          o.zone.step_2( object )
          o.zone.step_3( "bold", object )
        }
      }
      else // playing
      {
        o.zone.step_1( "matrix", object )
        o.zone.step_2( object )

        if( athlete.color === now
        && o.state.turn > 7 )
        {
          o.zone.step_3( "bold", object )
        }
        else
        {
          o.zone.step_3( "thin", object )
        }
      }
    }
  },
  step_1:( condition, now )=> // where are the zones
  {
    // For the condition "matrix", "now" is the ATHLETE number
    //
    if( condition === "center" )
    {
      for( let $ = 0; $ < 4; $ ++ )
      {
        const coord = o.tool.convert( o.info.center[ $ ] )
        o.state.zone[ $ ] = { x:coord.x, y:coord.y }
      }
    }
    else if( condition === "start" )
    {
      const spawn = o.state.spawn.green.concat( o.state.spawn.blue )

      for( let $ = 0; $ < 8; $ ++ )
      {
        const coord = o.tool.convert( spawn[ $ ] )
        o.state.zone[ $ ] = { x:coord.x, y:coord.y }
      }
    }
    else if( condition === "place" )
    {
      let spawn

      if( now === "gre" ){ spawn = o.state.spawn.green }
      else{ spawn = o.state.spawn.blue }

      for( let $ = 0; $ < spawn.length; $ ++ )
      {
        const coord = o.tool.convert( spawn[ $ ] )
        o.state.zone[ $ ] = { x:coord.x, y:coord.y }
      }
    }
    else if( condition === "replace" )
    {
      let team

      if( now === "gre" ){ team = o.state.team.green }
      else{ team = o.state.team.blue }

      for( let $ = 0; $ < 4; $ ++ )
      {
        const coord = o.state.athlete[ team[ $ ] ]
        o.state.zone[ $ ] = { x:coord.x, y:coord.y }
      }
    }
    else if( condition === "matrix" )
    {
      const athlete = now
      const matrix = o.info.matrix[ athlete ]
      let $1 = 0

      for( let $2 = 1; $2 < 10; $2 ++ )
      {
        if( matrix[ $2 ] )
        {
          $1 += o.zone.adjust( $1, athlete, o.info.guide[ $2 ] )
        }
      }
    }
  },
  step_2:( object )=> // which zones appear + AIM update
  {
    for( let $ = 0; $ < 16; $ ++ )
    {
      const x = o.state.zone[ $ ].x
      const y = o.state.zone[ $ ].y
      const coord = o.tool.convert( [ x, y ] )

      if( x === null ){ break }

      if( o.zone.ok( object, coord ) )
      {
        o.page.zone[ $ ].style.marginLeft = x + "px"
        o.page.zone[ $ ].style.marginTop = y + "px"
        o.page.zone[ $ ].style.display = "flex"
      }
    }

    o.update.aim()
  },
  step_3:( condition, object )=> // how the zones appear + BLOCKED update
  {
    const classes = "zon sqr abs box rn2 tr2"

    let non = classes
    let tgt = classes
    let blk = classes

    if( condition === "bold" )
    {
      non += " bld pnt"
      tgt += " btg pnt"
      blk += " bbl"
    }
    else if( condition === "thin" )
    {
      non += " thi"
      tgt += " ttg"
      blk += " tbl"
    }

    o.update.blocked( object )

    Array.from( o.page.zone ).map( ( zone, index )=>
    {
      if( o.state.aim.zone.indexOf( index ) !== -1 )
      {
        if( o.state.blocked.indexOf( index ) !== -1 ){ zone.classList = blk }
        else{ zone.classList = tgt }
      }
      else
      {
        zone.classList = non
      }
    } )
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
  ok:( object, coord )=>
  {
    if( object === "ball" )
    {
      return( true )
    }
    else // athlete
    {
      let own_area
      let opp_area
      let keeper

      if( o.state.athlete[ object ].color === "gre" )
      {
        own_area = o.info.area.green
        opp_area = o.info.area.blue
        keeper = o.state.keeper.green
      }
      else
      {
        own_area = o.info.area.blue
        opp_area = o.info.area.green
        keeper = o.state.keeper.blue
      }

      if( opp_area.indexOf( coord ) !== -1
      || own_area.indexOf( coord ) !== -1
      && keeper !== null
      && keeper !== object )
      {
        return( false )
      }
      else
      {
        return( true )
      }
    }
  },
}
