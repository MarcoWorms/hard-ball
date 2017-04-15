
"use strict"

o.engine =
{
  create:()=>
  {
    o.state.ball = { x:456, y:263 }

    for( let count = 0; count < 20; count ++ )
    {
      o.state.athlete[ count ].x = o.info.cell[ 12 ][ count ].x
      o.state.athlete[ count ].y = o.info.cell[ 12 ][ 0 ].y
    }
  },
  update:()=>
  {
    if( o.state.lock.game )
    {
      o.update.ball()
      o.update.trigger()
      o.update.athlete()
    }

    window.requestAnimationFrame( o.engine.update )
  },
}

o.engine.create()
o.engine.update()
