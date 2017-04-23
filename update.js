
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
  roundabout:()=>
  {
    o.state.roundabout = []

    for( let $ = 0; $ < 20; $ ++ )
    {
      const athlete = o.state.athlete[ $ ]
      const coord = o.tool.convert( [ athlete.x, athlete.y ] )

      if( coord.length === 3 )
      {
        if( coord.substring( 0, 1 ) === "A"
        && coord.substring( 0, 1 ) === "B"
        && coord.substring( 0, 1 ) === "K"
        && coord.substring( 0, 1 ) === "L" )
        {
          o.state.roundabout.push( $ )
        }
      }
    }
  },
}
