
"use strict"

o.engine =
{
  create:()=>
  {
    // INITIAL POSITIONING
    //
    o.state.ball = { x:456, y:264 }

    for( let count = 0; count < 20; count ++ )
    {
      o.state.athlete[ count ].x = o.info.cell[ 12 ][ count ].x
      o.state.athlete[ count ].y = o.info.cell[ 12 ][ 0 ].y
    }

    // AVOID INITIAL DRAG & CLICK BUG
    //
    o.handle.list.push(
    {
      test:()=>
      {
        const ballToken = o.page.ball.getBoundingClientRect()

        const a = ballToken.x - o.state.screen.x
        const b = o.state.ball.x
        const c = ballToken.y - o.state.screen.y
        const d = o.state.ball.y

        return( a === b && c === d )
      },
      act:()=>
      {
        setTimeout( ()=>{ o.state.pass.main = true }, 100 )

        Array.from( o.page.athlete ).map( ( athlete )=>
        {
          athlete.classList.add( "tr1" )
        } )
      }
    } )

    // SAFARI FIXES
    //
    if( navigator.userAgent.indexOf( "Safari" ) !== -1
    && navigator.userAgent.indexOf( "Chrome" ) === -1 )
    {
      o.page.center.style.transform = "translate(461px,268px) rotate(270deg)"

      Array.from( o.page.safari_fix ).map( ( athlete_mask )=>
      {
        athlete_mask.style.margin = "-3px 0 0 -45px"
      } )
    }

    // INITIAL UPDATES
    //
    o.update.ball()
    o.update.trigger()
    o.update.athlete()
    o.update.index()
  },
  update:()=>
  {
    o.update.screen()
    o.handle.run()

    window.requestAnimationFrame( o.engine.update )
  },
}

o.engine.create()
o.engine.update()
