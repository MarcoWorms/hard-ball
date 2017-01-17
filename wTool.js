
'use strict'

////////////////////////////////////////////////////////////////////////////////
// General functions
//
Ω.tool =
{
  //////////////////////////////////////////////////////////////////////////////
  // Save the game
  //
  save: function( create )
  {
    //==========================================================================
    //
    if( create )
    {
      //........................................................................
      // Create a backup
      //
      localStorage.setItem( 'first', JSON.stringify( Ω.state ) )

      //........................................................................
      // Load a saved file if there is any
      //
      if( 'last' in localStorage )
      {
        Ω.state = JSON.parse( localStorage.getItem( 'last' ) )
      }
    }

    //==========================================================================
    //
    else localStorage.setItem( 'last', JSON.stringify( Ω.state ) )
  },

  //////////////////////////////////////////////////////////////////////////////
  // Check for a class in any HTML object (returns 'true' or 'false')
  //
  hasCls: function( entity, klass )
  {
    //==========================================================================
    //
    return !!entity.className.match( klass )
  },

  //////////////////////////////////////////////////////////////////////////////
  // Adds or removes a class in any HTML object
  //
  chgCls: function( entity, action, klass )
  {
    //==========================================================================
    // It must have the class so it can be removed
    //
    if( Ω.tool.hasCls( entity, klass ) === false
    && action === "+" )
    {
      entity.classList.add( klass )
    }

    //==========================================================================
    // It mustn't have the class so it can be added
    //
    else if( Ω.tool.hasCls( entity, klass ) === true
    && action === "-" )
    {
      entity.classList.remove( klass )
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // Just a shortener of a CSS line
  //
  translate: function( entity, x, y )
  {
    //==========================================================================
    //
    entity.style.transform = 'translate(' + x + 'px,' + y + 'px)'
  },

  //////////////////////////////////////////////////////////////////////////////
  // Just a shortener of a CSS line
  //
  rotate: function( entity, speed )
  {
    //==========================================================================
    //
    entity.style.transform += ' rotate(' + Ω.changer.spin[ 0 ] * speed + 'deg)'
  },

  //////////////////////////////////////////////////////////////////////////////
  // Gives the desired torus (donut shape) effect to the display of zones
  //
  bend: function( entity, axis )
  {
    //==========================================================================
    //
    if( axis === 'x' )
    {
      if( entity < 0 ) entity = 960 - ( - entity )
      else if( entity > 912 ) entity = entity - 960
    }

    //==========================================================================
    //
    else if( axis === 'y' )
    {
      if( entity < 0 ) entity = 576 - ( - entity )
      else if( entity > 528 ) entity = entity - 576
    }

    //==========================================================================
    //
    return entity
  },

  //////////////////////////////////////////////////////////////////////////////
  // Is intended to regulate which zone is displayed and which is not
  //
  isZone: function( counter, x, y )
  {
    //==========================================================================
    // Change disposable data relative to the athlete's color
    //
    Ω._.color = Ω.state.athlete[ Ω.state.displayed ][ 2 ]

    if( Ω._.color === 'gre' )
    {
      Ω._.area = Ω.info.area.green // athlete's area (aRea)
      Ω._.aera = Ω.info.area.blue // opponent's area (aeRa)
      Ω._.keeper = Ω.state.keeper.green // athlete's own keeper
    }

    else if( Ω._.color === 'blu' )
    {
      Ω._.area = Ω.info.area.blue
      Ω._.aera = Ω.info.area.green
      Ω._.keeper = Ω.state.keeper.blue
    }

    //==========================================================================
    // If the athlete is the keeper, it's the one
    //
    if( Ω._.keeper === Ω.state.displayed ) Ω._.one = true

    //==========================================================================
    //
    Ω._.coordinate = Ω.tool.convert( [ x, y ] ) // zone's cell name
    Ω._.kee = true // display the zone

    //==========================================================================
    // If the zone is inside the athlete's area
    // And if there is a keeper
    // And the athlete is not the keeper
    //
    if( Ω._.area.indexOf( Ω._.coordinate ) !== -1
    && Ω._.keeper !== 'none'
    && Ω._.one === false )
    {
      //........................................................................
      // Ask to not display the zone
      //
      Ω._.kee = false
    }

    //==========================================================================
    // If zone is outside the opponent's area
    // And you're the keeper, if there's any
    //
    if( Ω._.aera.indexOf( Ω._.coordinate ) === -1
    && Ω._.kee )
    {
      //........................................................................
      // Change the zone's coordinate
      //
      Ω.now.zone[ counter ] = [ x, y ]

      //........................................................................
      // +1 zone to show
      //
      return 1
    }

    //==========================================================================
    // If zone is inside the opponent's area
    // Or you're not the keeper, if there's any
    //
    else
    {
      return 0
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  //
  convert: function( entity )
  {
    //==========================================================================
    // If you want the coordinates
    //
    if( typeof( entity ) === 'string' )
    {
      //........................................................................
      // Disposable data
      //
      Ω._.letter = entity.substring( 0, 1 )
      Ω._.digit = Number( entity.substring( 1, 3 ) )

      //........................................................................
      // Discover 'x'
      //
      for( Ω.$ = 0; Ω.$ < 20; Ω.$ ++ )
      {
        if( Ω._.digit === Ω.$ ) Ω._.x = Ω.$ * 48
      }

      //........................................................................
      // Discover 'y'
      //
      for( Ω.$ = 0; Ω.$ < 12; Ω.$ ++ )
      {
        if( Ω._.letter === Ω.info.aToL[ Ω.$ ] ) Ω._.y = Ω.$ * 48
      }

      //........................................................................
      // Return the coordinates
      //
      return [ Ω._.x, Ω._.y ]
    }

    //==========================================================================
    // If you want the name
    //
    else if( typeof( entity ) === 'object' )
    {
      //........................................................................
      // Disposable data
      //
      Ω._.x = entity[ 0 ]
      Ω._.y = entity[ 1 ]

      //........................................................................
      // Discover the letter
      //
      for( Ω.$ = 0; Ω.$ < 12; Ω.$ ++ )
      {
        if( Ω._.y / 48 === Ω.$ ) Ω._.name = Ω.info.aToL[ Ω.$ ]
      }

      //........................................................................
      // Discover the digit
      //
      for( Ω.$ = 0; Ω.$ < 20; Ω.$ ++ )
      {
        if( Ω._.x / 48 === Ω.$ )
        {
          if( Ω.$ < 10 ) Ω._.name += '0'

          Ω._.name += $
        }
      }

      //........................................................................
      // Return the name
      //
      return Ω._.name
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // Removes an item from its array
  //
  remove: function( indexer, entity )
  {
    //==========================================================================
    //
    entity.splice( entity.indexOf( indexer ), 1 )
  },

  //////////////////////////////////////////////////////////////////////////////
  //
  tackle: function( entity )
  {
    //==========================================================================
    //
    Ω._.aimed = Ω.now.target[ 0 ][ entity ]

    //==========================================================================
    //
    Ω._.pusherX = Ω.state.athlete[ Ω.state.selected ][ 0 ] - 1
    Ω._.pusherY = Ω.state.athlete[ Ω.state.selected ][ 1 ] - 1

    Ω._.aimedX = Ω.state.athlete[ Ω._.aimed ][ 0 ] - 1
    Ω._.aimedY = Ω.state.athlete[ Ω._.aimed ][ 1 ] - 1

    Ω._.distanceX = Ω._.pusherX - Ω._.aimedX
    Ω._.distanceY = Ω._.pusherY - Ω._.aimedY

    Ω._.newX = Ω._.aimedX - Ω._.distanceX
    Ω._.newY = Ω._.aimedY - Ω._.distanceY

    Ω._.blockedX = Ω.tool.bend( Ω._.newX, 'x' )
    Ω._.blockedY = Ω.tool.bend( Ω._.newY, 'y' )

    //==========================================================================
    //
    if( Ω._.distanceX < 0 ) Ω._.distanceX = -Ω._.distanceX
    if( Ω._.distanceY < 0 ) Ω._.distanceY = -Ω._.distanceY

    if( Ω._.distanceX >= Ω._.distanceY )     Ω._.animationTime = Ω._.distanceX
    else if( Ω._.distanceX < Ω._.distanceY ) Ω._.animationTime = Ω._.distanceY

    //==========================================================================
    //
    return [ Ω._.blockedX, Ω._.blockedY, Ω._.animationTime ]
  },
}

////////////////////////////////////////////////////////////////////////////////
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
