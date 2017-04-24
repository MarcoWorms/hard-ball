
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

      for( let $ = 0; $ < 20; $ ++ )
      {
        if( digit === $ ){ x = $ * 48 }
      }

      for( let $ = 0; $ < 12; $ ++ )
      {
        if( letter === o.info.aToL[ $ ] ){ y = $ * 48 }
      }

      return( { x:x, y:y } )
    }
    else if( typeof( object ) === "object" )
    {
      x = object[ 0 ]
      y = object[ 1 ]

      if( x === null ){ return( undefined ) }

      for( let $ = 0; $ < 12; $ ++ )
      {
        if( y / 48 === $ ){ name = o.info.aToL[ $ ] }
      }

      for( let $ = 0; $ < 20; $ ++ )
      {
        if( x / 48 === $ )
        {
          if( $ < 10 ){ name += "0" }
          name += $
        }
      }

      return( name )
    }
  },
  bend:( number, axis )=>
  {
    if( axis === "hor" )
    {
      if( number < 0 ){ number = 960 + number }
      else if( number > 913 ){ number = number - 960 }
    }
    else if( axis === "ver" )
    {
      if( number < 0 ){ number = 576 + number }
      else if( number > 529 ){ number = number - 576 }
    }

    return number
  },
}
