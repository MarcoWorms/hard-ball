
"use strict"

o.finish =
{
  regular:( zone_coo )=>
  {
    o.state.pass.main = false
    o.state.athlete[ o.state.selected ].x = zone_coo.x
    o.state.athlete[ o.state.selected ].y = zone_coo.y
    o.update.athlete()

    const index = o.state.selected

    o.handle.list.push(
    {
      test:()=>
      {
        const athleteToken = o.page.athlete[ index ].getBoundingClientRect()

        let dif = { x:0, y:0 }

        if( navigator.userAgent.indexOf( "Safari" ) !== -1 )
        {
          dif = { x:-15, y:101.5 }
        }

        const a = athleteToken.left + dif.x - o.state.screen.x
        const b = o.state.athlete[ index ].x
        const c = athleteToken.top + dif.y - o.state.screen.y
        const d = o.state.athlete[ index ].y

        return( a === b && c === d )
      },
      act:()=>
      {
        o.state.selected = null
        o.update.selection()
        o.update.athlete()
        o.zone.origin()
        o.state.turn ++
        localStorage.setItem( "HB_auto", JSON.stringify( o.state ) )
        o.state.pass.main = true
      }
    } )
  },
}
