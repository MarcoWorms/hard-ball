
"use strict"

o.press = addEventListener( "keydown", ( event )=>
{
  const number = Number( event.key )
  const word = String( number )

  if( typeof( number ) === "number" && word !== "NaN" )
  {
    const file = eval( "localStorage.HB_save_" + number )
    const name = "HB_save_" + number

    if( file === undefined )
    {
      if( confirm( "SAVE STATE " + number + " ?" ) )
      {
        localStorage.setItem( name, JSON.stringify( o.state ) )
      }
    }
    else
    {
      if( confirm( "LOAD STATE " + number + " ?" ) )
      {
        o.engine.load( file )
      }
      else
      {
        if( confirm( "OVERWRITE STATE " + number + " ?" ) )
        {
          localStorage.setItem( name, JSON.stringify( o.state ) )
        }
        else
        {
          if( confirm( "ERASE STATE " + number + " ?" ) )
          {
            localStorage.removeItem( name )
          }
        }
      }
    }
  }
},
false )
