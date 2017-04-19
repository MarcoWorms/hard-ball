
"use strict"

o.tool =
{
  translate:( object, x, y )=>
  {
    object.style.transform = "translate(" + x + "px," + y + "px)"
  },
  convert:( object )=>
  {
    let x
    let y

    if( typeof( object ) === "string" )
    {
      let letter = object.substring( 0, 1 )
      let digit = Number( object.substring( 1, 3 ) )

      for( let count = 0; count < 20; count ++ )
      {
        if( digit === count ){ x = count * 48 }
      }

      for( let count = 0; count < 12; count ++ )
      {
        if( letter === o.info.aToL[ count ] ){ y = count * 48 }
      }

      return( { x:x, y:y } )
    }
    else if( typeof( object ) === "object" )
    {
      x = object[ 0 ]
      y = object[ 1 ]

      for( let count = 0; count < 12; count ++ )
      {
        if( y / 48 === count ){ name = o.info.aToL[ count ] }
      }

      for( let count = 0; count < 20; count ++ )
      {
        if( x / 48 === count )
        {
          if( count < 10 ){ name += "0" }
          name += count
        }
      }

      return( name )
    }
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
        o.state = JSON.parse( localStorage.getItem( "HB_backup" ) )
        o.engine.create()
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
