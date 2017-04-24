
"use strict"

o.update =
{
  cluster:()=>
  {
    o.update.ball()
    o.update.trigger()
    o.update.athlete()
    o.update.team()
    o.update.index()
    o.update.selection()
  },
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
  team:()=>
  {
    for( let $ = 0; $ < 20; $ ++ )
    {
      if( o.state.team.green.indexOf( $ ) !== -1 )
      {
        o.page.athlete[ $ ].classList = "ath sqr rn2 bd3 box abs cnt gre"
      }
      else if( o.state.team.blue.indexOf( $ ) !== -1 )
      {
        o.page.athlete[ $ ].classList = "ath sqr rn2 bd3 box abs cnt blu"
      }
      else
      {
        o.page.athlete[ $ ].classList = "ath sqr rn2 bd3 box abs cnt btn"
      }
    }
  },
  index:()=>
  {
    o.page.ball.style.zIndex = "2"
    o.page.selection.style.zIndex = "3"

    Array.from( o.page.zone ).map( ( zone )=>{ zone.style.zIndex = "1" } )
  },
  selection:()=>
  {
    o.page.selection.style.display = "none"

    if( o.state.selected === "ball" )
    {
      setTimeout( ()=>
      {
        o.page.selection.style.display = "flex"
        const x = o.state.ball.x
        const y = o.state.ball.y
        o.tool.translate( o.page.selection, x, y )
      } )
    }
    else if( typeof( o.state.selected ) === "number" )
    {
      setTimeout( ()=>
      {
        o.page.selection.style.display = "flex"
        const x = o.state.athlete[ o.state.selected ].x
        const y = o.state.athlete[ o.state.selected ].y
        o.tool.translate( o.page.selection, x, y )
      } )
    }
  },
  now:()=>
  {
    if( o.state.turn % 2 === 0 )
    {
      if( o.state.first === "gre" ){ return( "gre" ) }
      else if( o.state.first === "blu" ){ return( "blu" ) }
    }
    else
    {
      if( o.state.first === "gre" ){ return( "blu" ) }
      else if( o.state.first === "blu" ){ return( "gre" ) }
    }
  },
  screen:()=>
  {
    const firstCell = document.querySelector( ".cll" ).getBoundingClientRect()

    let dif = { x:0, y:0 }

    if( navigator.userAgent.indexOf( "Safari" ) !== -1 )
    {
      dif = { x:-15, y:101.5 }
    }

    o.state.screen.x = firstCell.left + dif.x
    o.state.screen.y = firstCell.top + dif.y
  },
  aim:()=>
  {
    o.state.aim = { zone:[], target:[] }

    for( let $1 = 0; $1 < 16; $1 ++ )
    {
      const zone = o.state.zone[ $1 ]
      const ball = o.state.ball

      if( zone.x === ball.x
      && zone.y === ball.y )
      {
        o.state.aim.zone.push( $1 )
        o.state.aim.target.push( "ball" )
      }

      for( let $2 = 0; $2 < 20; $2 ++ )
      {
        const athlete = o.state.athlete[ $2 ]

        if( zone.x === athlete.x
        && zone.y === athlete.y )
        {
          o.state.aim.zone.push( $1 )
          o.state.aim.target.push( $2 )
        }
      }
    }
  },
  blocked:( object )=>
  {
    o.state.blocked = []

    if( object === "ball" )
    {
      // tbd
    }
    else if( typeof( object ) === "number" // athlete
    && o.state.turn > 7 )
    {
      const athlete = o.state.athlete[ object ]

      if( athlete.y === 586 ) // benched
      {
        let replaced
        let team

        if( athlete.color === "gre" )
        {
          replaced = o.state.replaced.green
          team = o.state.team.green
        }
        else
        {
          replaced = o.state.replaced.blue
          team = o.state.team.blue
        }

        if( replaced.length === 2 ){ o.state.blocked = team }
      }
      else // playing
      {
        Array.from( o.state.aim.target ).map( ( target_num, index )=>
        {
          if( target_num !== "ball" )
          {
            // STEP 1
            //
            const zone_num = o.state.aim.zone[ index ]
            const zone = o.state.zone[ zone_num ]
            const dif =
            {
              x:zone.x - athlete.x,
              y:zone.y - athlete.y,
            }
            const future =
            {
              x:o.tool.bend( zone.x + dif.x, "x" ),
              y:o.tool.bend( zone.y + dif.y, "y" ),
            }
            const future_str = o.tool.convert( [ future.x, future.y ] )

            // STEP 2
            //
            const target = o.state.athlete[ target_num ]
            const target_str = o.tool.convert( [ target.x, target.y ] )

            let tgt_opp_area
            let tgt_own_area
            let keeper

            if( target.color === "gre" )
            {
              tgt_opp_area = o.info.area.blue
              tgt_own_area = o.info.area.green
              keeper = o.state.keeper.green
            }
            else
            {
              tgt_opp_area = o.info.area.green
              tgt_own_area = o.info.area.blue
              keeper = o.state.keeper.blue
            }

            // STEP 3
            //
            if( future_str === target_str
            || tgt_opp_area.indexOf( future_str ) !== -1
            || tgt_own_area.indexOf( future_str ) !== -1
            && keeper !== null )
            {
              o.state.blocked.push( zone_num )
            }
          }
        } )
      }
    }
  },
  roundabout:()=>
  {
    o.state.roundabout = []

    for( let $ = 0; $ < 20; $ ++ )
    {
      const athlete = o.state.athlete[ $ ]
      const coord = o.tool.convert( [ athlete.x, athlete.y ] )

      if( coord !== undefined )
      {
        if( coord.substring( 0, 1 ) === "A"
        || coord.substring( 0, 1 ) === "B"
        || coord.substring( 0, 1 ) === "K"
        || coord.substring( 0, 1 ) === "L" )
        {
          o.state.roundabout.push( $ )
        }
      }
    }
  },
  keeper:( zone_str )=>
  {
    const both_areas = o.info.area.green.concat( o.info.area.blue )
    const selected = o.state.selected

    if( both_areas.indexOf( zone_str ) !== -1 )
    {
      const green = o.state.team.green

      if( green.indexOf( selected ) !== -1 ){ o.state.keeper.green = selected }
      else{ o.state.keeper.blue = selected }
    }
    else
    {
      if( selected === o.state.keeper.green ){ o.state.keeper.green = null }
      else if( selected === o.state.keeper.blue ){ o.state.keeper.blue = null }
    }
  },
}
