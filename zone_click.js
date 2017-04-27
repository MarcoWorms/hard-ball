
'use strict'

o.zone_click =
{
  begin:( event )=>
  {
    const zone_num = Number( event.target.id.substring( 1, 3 ) )
    const zone = o.state.zone[ zone_num ]
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

      if( athlete.y === 586 )
      {
        if( o.state.turn < 8 )
        {
          o.state.pass.main = false
          o.finish.choose( zone_str, selected )
          o.finish.simple( zone, selected, false )
        }
        else
        {
          // replace
        }
      }
      else if( athlete.color === o.state.now )// playing
      {
        ////////////////////////////////////////////////////////////////////////
        // ROUNDABOUTING
        //
        if( o.state.roundabout.indexOf( selected ) !== -1 )
        {
          if( o.state.aim.zone.indexOf( zone_num ) !== -1 ) // has target
          {
            // tbd
          }
          else
          {
            o.finish.simple( zone, selected, true )
          }
        }
        ////////////////////////////////////////////////////////////////////////
        // NOT roundabouting
        //
        else
        {
          if( o.state.aim.zone.indexOf( zone_num ) !== -1 ) // has target
          {
            // tbd
          }
          else
          {
            o.finish.simple( zone, selected, false )
          }
        }
      }
    }
  },
}
