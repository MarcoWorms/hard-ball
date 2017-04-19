
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
}
