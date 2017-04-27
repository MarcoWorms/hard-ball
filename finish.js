
'use strict'

o.finish =
{
  choose:( zone_str, selected )=>
  {
    if( o.state.spawn.green.indexOf( zone_str ) !== -1 )
    {
      if( o.state.turn === 0 ){ o.state.now = o.state.first = 'gre' }

      const index = o.state.spawn.green.indexOf( zone_str )
      o.state.spawn.green.splice( index, 1 )
      o.state.team.green.push( selected )
    }
    else
    {
      if( o.state.turn === 0 ){ o.state.now = o.state.first = 'blu' }

      const index = o.state.spawn.blue.indexOf( zone_str )
      o.state.spawn.blue.splice( index, 1 )
      o.state.team.blue.push( selected )
    }

    o.page.athlete[ selected ].classList.remove( 'btn' )
    o.page.athlete[ selected ].classList.add( o.state.now )
  },
  simple:( zone, selected )=>
  {
    o.state.athlete[ selected ].x = zone.x
    o.state.athlete[ selected ].y = zone.y

    o.update.athlete()

    o.handle.list.push( { test:o.test.selected, act:()=>
    {
      o.state.turn ++
      o.state.selected = null
      o.update.selection()
      o.zone_show.begin()
      o.state.pass.main = true

      // localStorage.setItem( "HB_auto", JSON.stringify( o.state ) )
    } } )
  },
}
