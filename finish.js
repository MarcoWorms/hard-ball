
"use strict"

o.finish=( condition, zone_coo )=>
{
  if( condition === "regular" )
  {
    o.state.athlete[  o.state.selected ] = { x:zone_coo.x, y:zone_coo.y }
    o.state.selected = null
    o.update.selection()
    o.update.athlete()
    o.zone.origin()
    o.state.turn ++
  }
}
