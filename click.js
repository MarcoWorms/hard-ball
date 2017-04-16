
"use strict"

o.click = addEventListener( "mousedown", ( event )=>
{
  if( event.target.id === "reset" )
  {
    o.page.reset.classList.remove( "btn" )
    o.page.yes.classList.remove( "dsp" )
    o.page.no.classList.remove( "dsp" )

    o.page.reset.classList.add( "dsp" )
    o.page.yes.classList.add( "gre" )
    o.page.no.classList.add( "red" )

    o.page.reset.innerHTML = "REALLY ?"
    o.page.yes.innerHTML = "Y"
    o.page.no.innerHTML = "N"
  }
  else if( event.target.id === "yes" )
  {
    o.page.reset.classList.remove( "dsp" )
    o.page.yes.classList.remove( "gre" )
    o.page.no.classList.remove( "red" )

    o.page.reset.classList.add( "btn" )
    o.page.yes.classList.add( "dsp" )
    o.page.no.classList.add( "dsp" )

    o.page.reset.innerHTML = "RESET"
    o.page.yes.innerHTML = ""
    o.page.no.innerHTML = ""

    // tbd
  }
  else if( event.target.id === "no" )
  {
    o.page.reset.classList.remove( "dsp" )
    o.page.yes.classList.remove( "gre" )
    o.page.no.classList.remove( "red" )

    o.page.reset.classList.add( "btn" )
    o.page.yes.classList.add( "dsp" )
    o.page.no.classList.add( "dsp" )

    o.page.reset.innerHTML = "RESET"
    o.page.yes.innerHTML = ""
    o.page.no.innerHTML = ""
  }
},
false )
