
'use strict'

o.zone_click =
{
  begin:( event )=>
  {
    const zon_num = Number( event.target.id.substring( 1, 3 ) )
    const zone = o.state.zone[ zon_num ]
    const zone_str = o.tool.convert( zone.x, zone.y )
    const selected = o.state.selected

    if( selected === 'ball' )
    {
      if( o.state.holder.now !== null )
      {
        // tbd
      }
      else
      {
        // tbd
      }
    }
    else if( typeof( selected ) === 'number' )
    {
      const athlete = o.state.athlete[ selected ]

      if( o.state.turn < 8
      && athlete.y === 586 )
      {
        o.state.pass.main = false
        o.finish.choose( zone_str, selected )
        o.finish.simple( zone, selected )
      }
      else if( o.state.now === athlete.color )
      {
        // tbd
      }
    }
  },
}
