
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
    o.handle.run()

    window.requestAnimationFrame( o.engine.update )
  },
}

o.engine.create()
o.engine.update()
