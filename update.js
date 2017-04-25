
'use strict'

o.update =
{
  cluster:()=> // on engine CREATE and LOAD
  {
    o.update.screen()
    o.update.ball()
    o.update.trigger()
    o.update.athlete()
    o.update.z_index()
  },
  screen:()=>
  {
    const firstCell = document.querySelector( '.cll' ).getBoundingClientRect()

    let dif = { x:0, y:0 }

    if( navigator.userAgent.indexOf( 'Safari' ) !== -1 )
    {
      dif = { x:-15, y:101.5 }
    }

    o.state.screen.x = firstCell.left + dif.x
    o.state.screen.y = firstCell.top + dif.y
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
    Array.from( o.page.athlete ).map( ( athlete, index )=>
    {
      const coord = o.state.athlete[ index ]
      o.tool.translate( athlete, coord.x, coord.y )
    } )
  },
  z_index:()=>
  {
    const value =
    {
      ball:'3',
      trigger:'2',
    }

    // tbd

    o.page.ball.style.zIndex = value.ball
    o.page.trigger.style.zIndex = value.trigger
  },
  console:()=>
  {
    document.getElementById( 'console' ).innerHTML = ''
  },
}
