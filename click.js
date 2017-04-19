
"use strict"

o.click = addEventListener( "mousedown", ( event )=>
{
  if( o.state.lock.main )
  {
    if( event.target.id === "reset" )
    {
      o.tool.reset( null )
    }
    else if( event.target.id === "yes"
    && o.page.yes.innerHTML === "!" )
    {
      o.tool.reset( true )
    }
    else if( event.target.id === "no"
    && o.page.no.innerHTML === "?" )
    {
      o.tool.reset( false )
    }
    else if( event.target.id === "ball" )
    {
      if( o.state.ball.x !== 456 )
      {
        o.state.selected = "ball"
        o.update.selection( "ball" )
        o.zone.origin( "ball" )
      }
    }
    else if( event.target.id.substring( 0, 1 ) === "A" ) // athlete
    {
      const number = Number( event.target.id.substring( 1, 3 ) )
      o.state.selected = number
      o.update.selection( number )
      o.zone.origin( number )
    }
    else if( event.target.id === "selection" )
    {
      o.update.selection( o.state.selected )
      o.zone.origin( o.state.selected )
    }
    else if( event.target.id.substring( 0, 1 ) === "Z" ) // zone
    {
      const zone_num = Number( event.target.id.substring( 1, 3 ) )
      const zone_coo = o.state.zone[ zone_num ]
      const zone_str = o.tool.convert( [ zone_coo.x, zone_coo.y ] )

      let now = o.update.now()

      if( o.state.selected === "ball" )
      {
        // tbd
      }
      else if( o.state.selected !== null ) // athlete
      {
        if( o.state.turn < 8 )
        {
          if( o.state.turn === 0 )
          {
            if( zone_num < 4 )
            {
              o.state.first = now = "gre"
              o.state.spawn.green.splice( zone_num, 1 )
            }
            else
            {
              o.state.first = now = "blu"
              o.state.spawn.blue.splice( zone_num + 4, 1 )
            }
          }
          else
          {
            if( now === "gre" )
            {
              const index = o.state.spawn.green.indexOf( zone_str )
              o.state.spawn.green.splice( index, 1 )
            }
            else if( now === "blu" )
            {
              const index = o.state.spawn.blue.indexOf( zone_str )
              o.state.spawn.blue.splice( index, 1 )
            }
          }

          o.page.athlete[ o.state.selected ].classList.remove( "btn" )
          o.page.athlete[ o.state.selected ].classList.add( now )

          o.finish( "regular", zone_coo )
        }
        else
        {
          // normal gameplay
        }
      }
    }
    else if( event.target.id === "trigger" )
    {
      // tbd
    }
    else
    {
      o.state.selected = null
      o.update.selection( null )
      o.zone.origin( null )
    }
  }
},
false )
