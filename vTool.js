
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
  chgCls: function( entity, klass, action )
  {
    //==========================================================================
    // It must have the class so it can be removed
    //
    if( !Ω.tool.hasCls( entity, klass ) && action === "add" )
    {
      entity.classList.add( klass )
    }

    //==========================================================================
    // It mustn't have the class so it can be added
    //
    else if( Ω.tool.hasCls( entity, klass ) && action === "rmv" )
    {
      entity.classList.remove( klass )
    }

    //==========================================================================
    //
    else
    {
      console.log( "You shall not class!" )
    }
  },

  ////////////////////////////////////////////////////////////////////////////// T.translate
  //
  translate: function( entity, x, y )
  {
    entity.style.transform = 'translate(' + x + 'px,' + y + 'px)'
  },

  ////////////////////////////////////////////////////////////////////////////// T.rotate
  //
  rotate: function( entity, speed )
  {
    entity.style.transform += ' rotate(' + Ω.changer.spin[ 0 ] * speed + 'deg)'
  },

  ////////////////////////////////////////////////////////////////////////////// T.bender
  //
  bender: function( entity, axis )
  {
    if( axis === 'x' )
    {
      if( entity === -48 ) entity = 912
      else if( entity === -96 ) entity = 864
      else if( entity === -144 ) entity = 816

      else if( entity === 1056 ) entity = 96
      else if( entity === 1008 ) entity = 48
      else if( entity === 960 ) entity = 0
    }
    else if( axis === 'y' )
    {
      if( entity === -48 ) entity = 528
      else if( entity === -96 ) entity = 480
      else if( entity === -144 ) entity = 432

      else if( entity === 672 ) entity = 96
      else if( entity === 624 ) entity = 48
      else if( entity === 576 ) entity = 0
    }

    return entity
  },
}

//////////////////////////////////////////////////////////////////////////////// CHANGER
//
Ω.changer =
{
  spin: [ 0, setInterval( function()
    {
      if( Ω.changer.spin[ 0 ] > 359 ) Ω.changer.spin[ 0 ] = 0
      else                          Ω.changer.spin[ 0 ] ++
    }, 10 ) ],
}
