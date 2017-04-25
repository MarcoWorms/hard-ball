
'use strict'

o.hover = addEventListener( 'mouseover', ( event )=>
{
  if( o.state.pass.main )
  {
    if( event.target.id === 'ball' )
    {
      o.state.hovered = 'ball'
      o.zone_show.begin()
    }
    else if( event.target.id.substring( 0, 1 ) === 'A' ) // athlete
    {
      o.state.hovered = Number( event.target.id.substring( 1, 3 ) )
      o.zone_show.begin()
    }
    else
    {
      o.state.hovered = null
      o.zone_show.begin()
    }
  }
},
false )
