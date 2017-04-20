
"use strict"

o.engine =
{
  create:()=>
  {
    // INITIAL POSITIONING
    //
    o.state.ball = { x:456, y:264 }

    for( let count = 0; count < 20; count ++ )
    {
      o.state.athlete[ count ].x = o.info.cell[ 12 ][ count ].x
      o.state.athlete[ count ].y = o.info.cell[ 12 ][ 0 ].y
      o.page.athlete[ count ].classList = "ath sqr rn2 bd3 box abs cnt btn"
    }

    // SAFARI FIXES
    //
    if( navigator.userAgent.indexOf( "Safari" ) !== -1
    && navigator.userAgent.indexOf( "Chrome" ) === -1 )
    {
      o.page.center.style.transform = "translate(461px,268px) rotate(270deg)"

      Array.from( o.page.safari_fix ).map( ( athlete_mask )=>
      {
        athlete_mask.style.margin = "-3px 0 0 -45px"
      } )
    }

    // AVOID INITIAL DRAG & CLICK BUG
    //
    o.handle.list.push(
    {
      test:()=>
      {
        const ballToken = o.page.ball.getBoundingClientRect()

        let dif = { x:0, y:0 }

        if( navigator.userAgent.indexOf( "Safari" ) !== -1 )
        {
          dif = { x:-15, y:101.5 }
        }

        let a = ballToken.left + dif.x - o.state.screen.x
        let b = o.state.ball.x
        let c = ballToken.top + dif.y - o.state.screen.y
        let d = o.state.ball.y

        return( a === b && c === d )
      },
      act:()=>
      {
        o.state.pass.main = true

        Array.from( o.page.athlete ).map( ( athlete )=>
        {
          athlete.classList.add( "tr1" )
        } )
      }
    } )

    // INITIAL UPDATES
    //
    o.update.cluster()
  },
  loop:()=>
  {
    o.update.screen()
    o.handle.run()

    window.requestAnimationFrame( o.engine.loop )
  },
  load:( file )=>
  {
    o.state = JSON.parse( file )
    o.update.cluster()
  },
  reset:( condition )=>
  {
    if( condition === null )
    {
      o.page.reset.classList.remove( "btn" )
      o.page.reset.classList.add( "dsp" )
      o.page.reset.innerHTML = "REALLY"

      o.page.yes.classList.remove( "dsp" )
      o.page.yes.classList.add( "red" )
      o.page.yes.innerHTML = "!"

      o.page.no.classList.remove( "dsp" )
      o.page.no.classList.add( "gre" )
      o.page.no.innerHTML = "?"
    }
    else
    {
      if( condition )
      {
        let m = ""
        if( navigator.userAgent.indexOf( "Firefox" ) !== -1 ){ m = "        " }
        const message = m + "ARE YOU SURE ?!\n(unsaved progress will be lost)"

        if( confirm( message ) )
        {
          localStorage.removeItem( "HB_auto" )
          location.reload()
        }
        else
        {
          confirm( "USE NUMBERS TO SAVE OR LOAD" )
        }
      }
      else
      {
        confirm( "USE NUMBERS TO SAVE OR LOAD" )
      }

      o.page.reset.classList.remove( "dsp" )
      o.page.reset.classList.add( "btn" )
      o.page.reset.innerHTML = "RESET"

      o.page.yes.classList.remove( "red" )
      o.page.yes.classList.add( "dsp" )
      o.page.yes.innerHTML = ""

      o.page.no.classList.remove( "gre" )
      o.page.no.classList.add( "dsp" )
      o.page.no.innerHTML = ""
    }
  },
}

o.engine.create()
if( "HB_auto" in localStorage ){ o.engine.load( localStorage.HB_auto ) }
o.engine.loop()
