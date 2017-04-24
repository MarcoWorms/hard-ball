
"use strict"

o.click = addEventListener( "mousedown", ( event )=>
{
  if( o.state.pass.main )
  {
    if( event.target.id === "reset" )
    {
      o.engine.reset( null )
    }
    else if( event.target.id === "yes"
    && o.page.yes.innerHTML === "!" )
    {
      o.engine.reset( true )
    }
    else if( event.target.id === "no"
    && o.page.no.innerHTML === "?" )
    {
      o.engine.reset( false )
    }
    else if( event.target.id === "ball" )
    {
      if( o.state.ball.x !== 456 )
      {
        o.state.selected = "ball"
        o.update.selection()
        o.zone.origin( "ball" )
        localStorage.setItem( "HB_auto", JSON.stringify( o.state ) )
      }
    }
    else if( event.target.id.substring( 0, 1 ) === "A" ) // athlete
    {
      const number = Number( event.target.id.substring( 1, 3 ) )
      o.state.selected = number
      o.update.selection()
      o.zone.origin( number )
      localStorage.setItem( "HB_auto", JSON.stringify( o.state ) )
    }
    else if( event.target.id === "selection" )
    {
      o.update.selection()
      o.zone.origin( o.state.selected )
    }
    else if( event.target.id.substring( 0, 1 ) === "Z" ) // zone
    {
      const zone_num = Number( event.target.id.substring( 1, 3 ) )

      if( o.state.blocked.indexOf( zone_num ) === -1 )
      {
        const zone_coo = o.state.zone[ zone_num ]
        const zone_str = o.tool.convert( [ zone_coo.x, zone_coo.y ] )
        const selected = o.state.selected

        let now = o.update.now()

        if( selected === "ball" )
        {
          // tbd
        }
        else if( selected !== null ) // athlete
        {
          o.update.roundabout()

          const athlete = o.state.athlete[ selected ]

          if( athlete.y === 586 ) // benched
          {
            if( o.state.turn < 8 )
            {
              if( o.state.turn === 0 )
              {
                if( zone_num < 4 )
                {
                  now = "gre"
                  o.state.first = "gre"
                  o.state.athlete[ selected ].color = "gre"
                  o.state.spawn.green.splice( zone_num, 1 )
                  o.state.team.green.push( selected )
                }
                else
                {
                  now = "blu"
                  o.state.first = "blu"
                  o.state.athlete[ selected ].color = "blu"
                  o.state.spawn.blue.splice( zone_num + 4, 1 )
                  o.state.team.blue.push( selected )
                }
              }
              else
              {
                if( now === "gre" )
                {
                  const index = o.state.spawn.green.indexOf( zone_str )
                  o.state.spawn.green.splice( index, 1 )
                  o.state.team.green.push( selected )
                  o.state.athlete[ selected ].color = "gre"
                }
                else if( now === "blu" )
                {
                  const index = o.state.spawn.blue.indexOf( zone_str )
                  o.state.spawn.blue.splice( index, 1 )
                  o.state.team.blue.push( selected )
                  o.state.athlete[ selected ].color = "blu"
                }
              }

              o.page.athlete[ selected ].classList.remove( "btn" )
              o.page.athlete[ selected ].classList.add( now )

              o.finish.regular( zone_coo )
            }
            else
            {
              // replace
            }
          }
          else if( athlete.color === now
          && o.state.blocked.indexOf( zone_num ) === -1 )
          {
            if( o.state.aim.zone.indexOf( zone_num ) === -1 )
            {
              //////////////////////////////////////////////////////////////////
              // NOT targeting . NOT roundabouting
              //
              if( o.state.roundabout.indexOf( selected ) === -1 )
              {
                o.update.keeper( zone_str )
                o.finish.regular( zone_coo )
              }
              //////////////////////////////////////////////////////////////////
              // NOT targeting . ROUNDABOUTING
              //
              else
              {
                // tbd
              }
            }
            else
            {
              //////////////////////////////////////////////////////////////////
              // TARGETING . ROUNDABOUTING
              //
              if( o.state.roundabout.indexOf( selected ) === -1 )
              {
                // tbd
              }
              //////////////////////////////////////////////////////////////////
              // TARGETING . NOT roundabouting
              //
              else
              {
                // tbd
              }
            }
          }
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
      o.update.selection()
      o.zone.origin( null )
      localStorage.setItem( "HB_auto", JSON.stringify( o.state ) )
    }
  }
},
false )
