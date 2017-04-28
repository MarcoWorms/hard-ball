
'use strict'

o.press = addEventListener( 'keydown', ( event )=>
{
  if( !event.metaKey )
  {
    const number = Number( event.key )
    const word = String( number )

    if( o.state.pass.main
    && typeof( number ) === 'number'
    && word !== 'NaN' )
    {
      const file = eval( 'localStorage.HB_save_' + number )
      const name = 'HB_save_' + number

      if( file === undefined )
      {
        if( confirm( o.info.message[ 4 ] + number + o.info.message[ 8 ] ) )
        {
          localStorage.setItem( name, JSON.stringify( o.state ) )
        }
      }
      else
      {
        if( confirm( o.info.message[ 5 ] + number + o.info.message[ 8 ] ) )
        {
          o.engine.load( file )
        }
        else
        {
          if( confirm( o.info.message[ 6 ] + number + o.info.message[ 8 ] ) )
          {
            localStorage.setItem( name, JSON.stringify( o.state ) )
          }
          else
          {
            if( confirm( o.info.message[ 7 ] + number + o.info.message[ 7 ] ) )
            {
              localStorage.removeItem( name )
            }
          }
        }
      }
    }
  }
},
false )
