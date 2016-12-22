
'use strict'

//////////////////////////////////////////////////////////////////////////////// TOOL
// General functions
//
Ω.tool =
{
  ////////////////////////////////////////////////////////////////////////////// T.hasCls
  // Check for a class in any HTML object (returns 'true' or 'false')
  //
  hasCls: function( entity, klass )
  {
    //==========================================================================
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
    if( !Ω.tool.hasCls( entity, klass )
    && action === "+" )
    {
      entity.classList.add( klass )
    }

    //==========================================================================
    // It mustn't have the class so it can be added
    //
    else if( Ω.tool.hasCls( entity, klass )
    && action === "-" )
    {
      entity.classList.remove( klass )
    }
  },

  ////////////////////////////////////////////////////////////////////////////// T.translate
  // Just a shortener of a JS/CSS line
  //
  translate: function( entity, x, y )
  {
    //==========================================================================
    //
    entity.style.transform = 'translate(' + x + 'px,' + y + 'px)'
  },

  ////////////////////////////////////////////////////////////////////////////// T.rotate
  // Just a shortener of a JS/CSS line
  //
  rotate: function( entity, speed )
  {
    //==========================================================================
    //
    entity.style.transform += ' rotate(' + Ω.changer.spin[ 0 ] * speed + 'deg)'
  },

  ////////////////////////////////////////////////////////////////////////////// T.bend
  // Gives the desired torus (donut shape) effect to the display of zones
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
  // Is intended to regulate which zone is displayed and which is not
  //
  isZone: function( digit, counter, x, y )
  {
    let color = Ω.now.athlete[ digit ][ 2 ] // athlete's color

    let area // the athlete's own area
    let aera // the opponent's area
    let keeper // 'none' or the number of the athlete (0 to 19)

    if( color === 'gre' )
    {
      area = Ω.info.area.green
      aera = Ω.info.area.blue
      keeper = Ω.info.keeper.green
    }
    else if( color === 'blu' )
    {
      area = Ω.info.area.blue
      aera = Ω.info.area.green
      keeper = Ω.info.keeper.blue
    }

    //==========================================================================
    //
    let one = false // the displayed (maybe an athlete) isn't the keeper (?)

    if( keeper === Ω.info.currentDisplayed ) one = true // yes, it is the keeper

    //==========================================================================
    //
    let coordinate = Ω.tool.convert( [ x, y ] ) // zone's cell name

    let kee = true // display the zone (?)

    if( area.indexOf( coordinate ) !== -1 // but if the zone is inside 'AREA'!
    && keeper !== 'none' // and there is a keeper
    && !one ) // and the displayed (maybe an athlete) isn't the keeper
    {
      kee = false // don't display the zone
    }

    //==========================================================================
    //
    if( aera.indexOf( coordinate ) === -1 // if the zone isn't inside 'AERA'!
    && kee ) // and there isn't a keeper which the athlete isn't, display zone
    {
      Ω.info.zone[ counter ] = [ x, y ] // change master coordinates
      return 1 // (+1 zone to show)
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
