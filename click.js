
"use strict"

o.click = addEventListener( "mousedown", ( event )=>
{
  const target = event.target.id

  if( target === "reset" )
  {
    o.page.reset.classList.remove( "btn" )
    o.page.reset.classList.add( "dsp" )
    o.page.reset.innerHTML = "REALLY ?"
    o.page.reset.style.width = "15%"
    o.page.reset.style.borderWidth = "2px 0 2px 0"
    o.page.reset.style.borderRadius = "0 0 0 0"
    o.page.yes.style.display = "flex"
    o.page.no.style.display = "flex"
  }
  else if( target === "yes" )
  {
    o.page.reset.classList.remove( "dsp" )
    o.page.reset.classList.add( "btn" )
    o.page.reset.innerHTML = "RESET"
    o.page.reset.style.width = "25%"
    o.page.reset.style.borderWidth = "2px"
    o.page.reset.style.borderRadius = "24px"
    o.page.yes.style.display = "none"
    o.page.no.style.display = "none"

    // tbd
  }
  else if( target === "no" )
  {
    o.page.reset.classList.remove( "dsp" )
    o.page.reset.classList.add( "btn" )
    o.page.reset.innerHTML = "RESET"
    o.page.reset.style.width = "25%"
    o.page.reset.style.borderWidth = "2px"
    o.page.reset.style.borderRadius = "24px"
    o.page.yes.style.display = "none"
    o.page.no.style.display = "none"
  }
},
false )
