
'use strict'

o.tool =
{
  translate:( object, x, y )=>
  {
    object.style.transform = 'translate(' + x + 'px,' + y + 'px)'
  },
  convert:( alfa, beta )=>
  {
    let x
    let y

    if( beta === undefined )
    {
      const letter = alfa.substring( 0, 1 )
      const number = Number( alfa.substring( 1, 3 ) )

      for( let $ = 0; $ < 20; $ ++ )
      {
        if( number === $ ){ x = $ * 48 }
      }

      for( let $ = 0; $ < 12; $ ++ )
      {
        if( letter === o.info.aToL[ $ ] ){ y = $ * 48 }
      }

      return( { x:x, y:y } )
    }
    else
    {
      x = alfa
      y = beta

      if( x === null ){ return( undefined ) }

      for( let $ = 0; $ < 12; $ ++ )
      {
        if( y / 48 === $ ){ name = o.info.aToL[ $ ] }
      }

      for( let $ = 0; $ < 20; $ ++ )
      {
        if( x / 48 === $ )
        {
          if( $ < 10 ){ name += '0' }
          name += $
        }
      }

      return( name )
    }
  },
  bend:( number, axis )=>
  {
    if( axis === 'x' )
    {
      if( number < 0 ){ number = 960 + number }
      else if( number > 912 ){ number = number - 960 }
    }
    else if( axis === 'y' )
    {
      if( number < 0 ){ number = 576 + number }
      else if( number > 528 ){ number = number - 576 }
    }

    return( number )
  },
}
