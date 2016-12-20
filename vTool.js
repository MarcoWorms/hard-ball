
'use strict'

//////////////////////////////////////////////////////////////////////////////// TOOL
// General functions
//
Ω.tool =
{
  ////////////////////////////////////////////////////////////////////////////// T.hasCls
  // Check for a class in any HTML object
  //
  hasCls: function( entity, klass )
  {
    //==========================================================================
    // Returns 'true' or 'false'
    //
    return !!entity.className.match( klass )
  },

  ////////////////////////////////////////////////////////////////////////////// T.chgCls
  // Adds or removes a class in any HTML object
  //
  chgCls: function( entity, action, klass )
  {
    //==========================================================================
    // It must have the class so it can be removed
    //
    if( !Ω.tool.hasCls( entity, klass ) && action === "+" )
    {
      entity.classList.add( klass )
    }

    //==========================================================================
    // It mustn't have the class so it can be added
    //
    else if( Ω.tool.hasCls( entity, klass ) && action === "-" )
    {
      entity.classList.remove( klass )
    }
  },

  ////////////////////////////////////////////////////////////////////////////// T.translate
  //
  translate: function( entity, x, y )
  {
    //==========================================================================
    //
    entity.style.transform = 'translate(' + x + 'px,' + y + 'px)'
  },

  ////////////////////////////////////////////////////////////////////////////// T.rotate
  //
  rotate: function( entity, speed )
  {
    //==========================================================================
    //
    entity.style.transform += ' rotate(' + Ω.changer.spin[ 0 ] * speed + 'deg)'
  },

  ////////////////////////////////////////////////////////////////////////////// T.bend
  //
  bend: function( entity, axis )
  {
    //==========================================================================
    //
    if( axis === 'x' )
    {
      if( entity === -48 ) entity = 912
      else if( entity === -96 ) entity = 864
      else if( entity === -144 ) entity = 816

      else if( entity === 1056 ) entity = 96
      else if( entity === 1008 ) entity = 48
      else if( entity === 960 ) entity = 0
    }

    //==========================================================================
    //
    else if( axis === 'y' )
    {
      if( entity === -48 ) entity = 528
      else if( entity === -96 ) entity = 480
      else if( entity === -144 ) entity = 432

      else if( entity === 672 ) entity = 96
      else if( entity === 624 ) entity = 48
      else if( entity === 576 ) entity = 0
    }

    //==========================================================================
    //
    return entity
  },

  ////////////////////////////////////////////////////////////////////////////// T.isZone
  //
  isZone: function( color, counter, x, y )
  {
    let target

    if( color === 'gre' ) target = Ω.info.areaBlue
    else                  target = Ω.info.areaGreen


    ////////////////////////////////////////////////////////////////////////////
    // Checks wheter zone is in adversary's area or not
    //
    if( target.indexOf( Ω.tool.convert( [ x, y ] ) ) === -1 )
    {
      Ω.info.zone[ counter ] = [ x, y ]
      return 1
    }
    else
    {
      return 0
    }
  },

  ////////////////////////////////////////////////////////////////////////////// T.convert
  //
  convert: function( entity )
  {
    //==========================================================================
    //
    let aToL = [ 'A','B','C','D','E','F','G','H','I','J','K','L' ]

    let x
    let y

    //==========================================================================
    // If you want the coordinates
    //
    if( typeof( entity ) === 'string' )
    {
      let letter = entity.substring( 0, 1 )
      let digit = Number( entity.substring( 1, 3 ) )

      for( let $ = 0; $ < 12; $ ++ ) if( letter === aToL[ $ ] ) y = $ * 48
      for( let $ = 0; $ < 20; $ ++ ) if( digit === $ ) x = $ * 48

      return [ x, y ]
    }

    //==========================================================================
    // If you want the name
    //
    else if( typeof( entity ) === 'object' )
    {
      let name

      x = entity[ 0 ]
      y = entity[ 1 ]

      for( let $ = 0; $ < 12; $ ++ ) if( y / 48 === $ ) name = aToL[ $ ]
      for( let $ = 0; $ < 20; $ ++ )
      {
        if( x / 48 === $ )
        {
          if( $ < 10 ) name += '0'
          name += $
        }
      }

    //==========================================================================
    //
    return name
    }
  },

  ////////////////////////////////////////////////////////////////////////////// T.remove
  //
  remove: function( coordinate, entity )
  {
    let index = entity.indexOf( coordinate )
    entity.splice( index, 1 )
  },
}

//////////////////////////////////////////////////////////////////////////////// CHANGER
//
Ω.changer =
{
  //============================================================================
  //
  spin: [ 0, setInterval( function()
    {
      if( Ω.changer.spin[ 0 ] > 360 ) Ω.changer.spin[ 0 ] = 0
      else                            Ω.changer.spin[ 0 ] ++
    }, 10 ) ],
  //============================================================================
  //
  glow: [ 0.66, false, setInterval( function()
    {
      if( Ω.changer.glow[ 1 ] === false ) Ω.changer.glow[ 0 ] += 0.03
      else if( Ω.changer.glow[ 1 ] === true ) Ω.changer.glow[ 0 ] -= 0.03

      if( Ω.changer.glow[ 0 ] > 0.66 ) Ω.changer.glow[ 1 ] = true
      else if( Ω.changer.glow[ 0 ] < 0.33 ) Ω.changer.glow[ 1 ] = false
    }, 40 ) ],
}
