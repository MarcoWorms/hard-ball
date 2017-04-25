
'use strict'

o.test =
{
  ball:()=>
  {
    const ballToken = o.page.ball.getBoundingClientRect()

    let dif = { x:0, y:0 }

    if( navigator.userAgent.indexOf( 'Safari' ) !== -1 )
    {
      dif = { x:-15, y:101.5 }
    }

    let a = ballToken.left + dif.x - o.state.screen.x
    let b = o.state.ball.x
    let c = ballToken.top + dif.y - o.state.screen.y
    let d = o.state.ball.y

    return( a === b && c === d )
  },
}
