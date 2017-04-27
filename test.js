
'use strict'

o.test =
{
  ball:()=>
  {
    const ballToken = o.page.ball.getBoundingClientRect()

    const dif = navigator.userAgent.indexOf( 'Safari' ) !== -1
    ? { x:-15, y:101.5 }
    : { x:0, y:0 }

    const a = ballToken.left + dif.x - o.state.screen.x
    const b = o.state.ball.x
    const c = ballToken.top + dif.y - o.state.screen.y
    const d = o.state.ball.y

    return( a === b && c === d )
  },
  selected:()=>
  {
    const selected = o.state.selected
    const athleteToken = o.page.athlete[ selected ].getBoundingClientRect()

    const dif = navigator.userAgent.indexOf( 'Safari' ) !== -1
    ? { x:-15, y:101.5 }
    : { x:0, y:0 }

    const a = athleteToken.left + dif.x - o.state.screen.x
    const b = o.state.athlete[ selected ].x
    const c = athleteToken.top + dif.y - o.state.screen.y
    const d = o.state.athlete[ selected ].y

    return( a === b && c === d )
  },
}
