
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

    // CREATE BACKUP
    //
    localStorage.setItem( "HB_backup", JSON.stringify( o.state ) )

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

        const a = ballToken.x - o.state.screen.x
        const b = o.state.ball.x
        const c = ballToken.y - o.state.screen.y
        const d = o.state.ball.y

        return( a === b && c === d )
      },
      act:()=>
      {
        setTimeout( ()=>{ o.state.pass.main = true }, 100 )

        Array.from( o.page.athlete ).map( ( athlete )=>
        {
          athlete.classList.add( "tr1" )
        } )
      }
    } )

    // INITIAL UPDATES
    //
    o.update.load()
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
    o.update.load()
  },
  reset:( condition )=>
  {
    if( condition === null )
    {
      o.page.reset.classList.remove( "btn" )
      o.page.yes.classList.remove( "dsp" )
      o.page.no.classList.remove( "dsp" )
      o.page.reset.classList.add( "dsp" )
      o.page.yes.classList.add( "red" )
      o.page.no.classList.add( "gre" )
      o.page.reset.innerHTML = "REALLY"
      o.page.yes.innerHTML = "!"
      o.page.no.innerHTML = "?"
    }
    else
    {
      if( condition )
      {
        localStorage.removeItem( "HB_auto" )
        o.engine.load( localStorage.HB_backup )
      }

      o.page.reset.classList.remove( "dsp" )
      o.page.yes.classList.remove( "red" )
      o.page.no.classList.remove( "gre" )
      o.page.reset.classList.add( "btn" )
      o.page.yes.classList.add( "dsp" )
      o.page.no.classList.add( "dsp" )
      o.page.reset.innerHTML = "RESET"
      o.page.yes.innerHTML = ""
      o.page.no.innerHTML = ""
    }
  },
}

o.engine.create()
if( "HB_auto" in localStorage ){ o.engine.load( localStorage.HB_auto ) }
o.engine.loop()
