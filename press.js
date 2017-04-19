
"use strict"

o.press = addEventListener( "keydown", ( event )=>
{
  const number = Number( event.key )
  const word = String( number )

  if( typeof( number ) === 'number' && word !== 'NaN' )
  {
    const file = eval( 'localStorage.HBsave' + number )
    const name = 'HBsave' + number

    if( file === undefined )
    {
      const save = confirm( 'SAVE STATE ' + number + ' ?' )
      if( save ){ localStorage.setItem( name, JSON.stringify( o.state ) ) }
    }
    else
    {
      const load = confirm( 'LOAD STATE ' + number + ' ?' )

      if( load )
      {
        o.state = JSON.parse( file )

        o.update.load()
      }
      else
      {
        const save = confirm( 'SAVE STATE ' + number + ' ?' )

        if( save )
        {
          localStorage.setItem( name, JSON.stringify( o.state ) )
        }
        else
        {
          const erase = confirm( 'ERASE STATE ' + number + ' ?' )
          if( erase ){ localStorage.removeItem( name ) }
        }
      }
    }
  }
},
false )
