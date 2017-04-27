
'use strict'

o.zone_click =
{
  begin:( event )=>
  {
    if( o.state.selected === 'ball' )
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
    else if( typeof( o.state.selected ) === 'number' )
    {
      const athlete = o.state.athlete[ o.state.selected ]

      if( o.state.turn === 0 )
      {
        // tbd
      }
      else if( o.state.now === athlete.color )
      {
        if( o.state.turn < 8 )
        {
          // tbd
        }
        else
        {
          // tbd
        }
      }
    }
  },
}
