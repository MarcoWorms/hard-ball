
'use strict'

////////////////////////////////////////////////////////////////////////////////
// General functions
//
Ω.tool =
{
  //////////////////////////////////////////////////////////////////////////////
  // Controls the activity of certain aspects of ball holding
  //
  screen: function()
  {
    //==========================================================================
    //
    let firstCell = document.getElementById( 'A00' )

    Ω.state.screen.x = firstCell.getBoundingClientRect().x
    Ω.state.screen.y = firstCell.getBoundingClientRect().y
  },

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
    return !! entity.className.match( klass )
  },

  //////////////////////////////////////////////////////////////////////////////
  // Adds or removes a class in any HTML object
  //
  chgCls: function( entity, action, klass )
  {
    //==========================================================================
    // It must have the class so it can be removed
    //
    if( Ω.tool.hasCls( entity, klass ) === false && action === "+" )
    {
      entity.classList.add( klass )
    }

    //==========================================================================
    // It mustn't have the class so it can be added
    //
    else if( Ω.tool.hasCls( entity, klass ) === true && action === "-" )
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
    entity.style.transform += ' rotate(' + Ω.change.spin[ 0 ] * speed + 'deg)'
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
      if( entity < 0 )        entity = 960 - ( - entity )
      else if( entity > 913 ) entity = entity - 960
    }

    //==========================================================================
    //
    else if( axis === 'y' )
    {
      if( entity < 0 )        entity = 576 - ( - entity )
      else if( entity > 529 ) entity = entity - 576
    }

    //==========================================================================
    //
    return entity
  },

  //////////////////////////////////////////////////////////////////////////////
  // Is intended to regulate which zone is displayed and which is not
  //
  isZone: function( zone, x, y )
  {
    //==========================================================================
    //
    if( Ω.state.displayed === 'ball' )
    {
      let coordinate = Ω.tool.convert( [ x, y ] )
      let otherGoal = false
      let ownGoal = false
      let ownArea

      if( Ω.state.athlete[ Ω.state.holder ].color === 'gre' )
      {
        ownArea = Ω.info.goal.green
      }

      else
      {
        ownArea = Ω.info.goal.blue
      }

      //........................................................................
      //
      if( ownArea.indexOf( coordinate ) !== -1 ) ownGoal = true

      //........................................................................
      //
      if( Ω.state.athlete[ Ω.state.holder ].color === 'gre' )
      {
        if( Ω.state.goalie.green === true
        && Ω.info.goal.blue.indexOf( coordinate ) !== -1 )
        {
          otherGoal = true
        }
      }

      else
      {
        if( Ω.state.goalie.blue === true
        && Ω.info.goal.green.indexOf( coordinate ) !== -1 )
        {
          otherGoal = true
        }
      }

      //........................................................................
      //
      if( x === Ω.state.ball.x - 1
      && y === Ω.state.ball.y - 1
      //
      || otherGoal === true
      //
      || ownGoal === true )
      {
        return 0
      }

      else
      {
        Ω.state.zone[ zone ] = { x: x, y: y }
        return 1
      }
    }

    //==========================================================================
    //
    else
    {
      //........................................................................
      //
      let athleteColor = Ω.state.athlete[ Ω.state.displayed ].color

      let area // athlete's area
      let other // opponent's area
      let keeper // athlete's own keeper

      //........................................................................
      // Change disposable data relative to the athlete's color
      //
      if( athleteColor === 'gre' )
      {
        area = Ω.info.area.green
        other = Ω.info.area.blue
        keeper = Ω.state.keeper.green
      }

      else if( athleteColor === 'blu' )
      {
        area = Ω.info.area.blue
        other = Ω.info.area.green
        keeper = Ω.state.keeper.blue
      }

      //........................................................................
      // If the athlete is the keeper, it's the one
      //
      let isTheKeeper = false

      if( keeper === Ω.state.displayed ) isTheKeeper = true

      //........................................................................
      //
      let zoneCoordinate = Ω.tool.convert( [ x, y ] )
      let lock = false // display the zone

      //........................................................................
      // If the zone is inside the athlete's area
      // And if there is a keeper
      // And the athlete is not the keeper
      //
      if( area.indexOf( zoneCoordinate ) !== -1
      && keeper !== 'none'
      && isTheKeeper === false )
      {
        lock = true
      }

      //........................................................................
      // If zone is outside the opponent's area
      // And you're the keeper if there's any
      //
      if( other.indexOf( zoneCoordinate ) === -1
      && lock === false )
      {
        Ω.state.zone[ zone ] = { x: x, y: y }
        return 1
      }

      //........................................................................
      // If zone is inside the opponent's area
      // Or you're not the keeper if there's any
      //
      else
      {
        return 0
      }
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  //
  convert: function( entity )
  {
    let x
    let y

    //==========================================================================
    // If you want the coordinates
    //
    if( typeof( entity ) === 'string' )
    {
      //........................................................................
      // Disposable data
      //
      let letter = entity.substring( 0, 1 )
      let digit = Number( entity.substring( 1, 3 ) )

      //........................................................................
      // Discover 'x'
      //
      for( let $ = 0; $ < 20; $ ++ )
      {
        if( digit === $ ) x = $ * 48
      }

      //........................................................................
      // Discover 'y'
      //
      for( let $ = 0; $ < 12; $ ++ )
      {
        if( letter === Ω.info.aToL[ $ ] ) y = $ * 48
      }

      //........................................................................
      // Return the coordinates
      //
      return { x: x, y: y }
    }

    //==========================================================================
    // If you want the name
    //
    else if( typeof( entity ) === 'object' )
    {
      //........................................................................
      // Disposable data
      //
      x = entity[ 0 ]
      y = entity[ 1 ]

      //........................................................................
      // Discover the letter
      //
      for( let $ = 0; $ < 12; $ ++ )
      {
        if( y / 48 === $ ) name = Ω.info.aToL[ $ ]
      }

      //........................................................................
      // Discover the digit
      //
      for( let $ = 0; $ < 20; $ ++ )
      {
        if( x / 48 === $ )
        {
          if( $ < 10 ) name += '0'

          name += $
        }
      }

      //........................................................................
      // Return the name
      //
      return name
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // Removes an item from its array
  //
  remove: function( deleteThis, fromThis )
  {
    //==========================================================================
    //
    fromThis.splice( fromThis.indexOf( deleteThis ), 1 )
  },

  //////////////////////////////////////////////////////////////////////////////
  //
  tackle: function()
  {
    //==========================================================================
    //
    let pusherX = Ω.state.athlete[ Ω.state.selected ].x - 1
    let pusherY = Ω.state.athlete[ Ω.state.selected ].y - 1

    //==========================================================================
    //
    let aimedX = Ω.state.athlete[ Ω.state.pushed ].x - 1
    let aimedY = Ω.state.athlete[ Ω.state.pushed ].y - 1

    //==========================================================================
    //
    let distanceX = aimedX - pusherX
    let distanceY = aimedY - pusherY

    let newX = Ω.tool.bend( aimedX + distanceX, 'x' )
    let newY = Ω.tool.bend( aimedY + distanceY, 'y' )

    //==========================================================================
    //
    return{ x: newX, y: newY }
  },

  //////////////////////////////////////////////////////////////////////////////
  //
  moveOn: function()
  {
    //==========================================================================
    //
    let answer = true
    let thereIsAnAthlete = false
    let ball = Ω.state.ball

    Ω.state.lock = true
    Ω.state.moveLock = true

    //==========================================================================
    //
    if( String( ( ball.x - 1 ) / 48 ).indexOf( '.' ) === -1
    && String( ( ball.y - 1 ) / 48 ).indexOf( '.' ) === -1 )
    {
      //........................................................................
      //
      for( let $ = 0; $ < 20; $ ++ )
      {
        let athlete = Ω.state.athlete[ $ ]

        if( athlete.x === ball.x
        && athlete.y === ball.y )
        {
          Ω.state.lock = false
          Ω.state.moveLock = false
          Ω.state.newHolder = $
          answer = false
          thereIsAnAthlete = true
        }
      }

      //........................................................................
      //
      let coordinate = Ω.tool.convert( [ ball.x - 1, ball.y - 1 ] )

      Ω.state.pathway.push( coordinate )

      //........................................................................
      //
      let everyGoal = Ω.info.goal.green.concat( Ω.info.goal.blue )

      if( everyGoal.indexOf( coordinate ) !== -1
      && thereIsAnAthlete === false )
      {
        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        //
        answer = false
        Ω.page.ball.style.backgroundColor = 'rgb(160,10,40)'
        Ω.state.oldHolder = Ω.state.holder
        Ω.state.holder = 'none'
        Ω.state.pathway.reverse()

        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        //
        let present = Ω.info.goal.green.indexOf( coordinate )

        if( present !== -1 ) Ω.state.goalThreat = 'gre'
        else                 Ω.state.goalThreat = 'blu'

        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        //
        Ω.tool.pathfind()
      }
    }

    //==========================================================================
    //
    return answer
  },

  //////////////////////////////////////////////////////////////////////////////
  //
  pathfind: function()
  {
    let everyGoal = Ω.info.goal.green.concat( Ω.info.goal.blue )
    let counter = 0
    let wave = setInterval( function()
    {
      let cellName = Ω.state.pathway[ counter ]

      if( everyGoal.indexOf( cellName ) === -1 )
      {
        document.getElementById( cellName ).classList.add( 'thr' )
      }

      counter ++

      if( counter === Ω.state.pathway.length )
      {
        clearInterval( wave )
        Ω.state.lock = false
        Ω.state.moveLock = false
      }
    }, 10 )
  },

  //////////////////////////////////////////////////////////////////////////////
  //
  endGame: function()
  {
    let color

    if( Ω.state.goalThreat === 'gre' ) color = 'BLUE'
    else                               color = 'GREEN'

    Ω.state.displayed = 'none'
    Ω.zone.updZon1()
    Ω.zone.updZon2()

    Ω.state.selected = 'none'
    Ω.game.updSel()

    alert( color + ' WINS\n' )
  },
}

////////////////////////////////////////////////////////////////////////////////
//
Ω.change =
{
  //============================================================================
  //
  spin: [ 0, setInterval( function()
    {
      if( Ω.change.spin[ 0 ] > 360 ) Ω.change.spin[ 0 ] = 0
      else                           Ω.change.spin[ 0 ] ++
    }, 10 ) ],

  //============================================================================
  //
  glow: [ 0.66, false, setInterval( function()
    {
      if( Ω.change.glow[ 1 ] === false )     Ω.change.glow[ 0 ] += 0.03
      else if( Ω.change.glow[ 1 ] === true ) Ω.change.glow[ 0 ] -= 0.03

      if( Ω.change.glow[ 0 ] > 0.66 )      Ω.change.glow[ 1 ] = true
      else if( Ω.change.glow[ 0 ] < 0.33 ) Ω.change.glow[ 1 ] = false
    }, 40 ) ],
}

////////////////////////////////////////////////////////////////////////////////
//
Ω.trigger =
{
  //============================================================================
  //
  event: [],

  //============================================================================
  //
  pull: function()
  {
    for( let $ = 0; $ < Ω.trigger.event.length; $ ++ )
    {
      if( Ω.trigger.event[ $ ].check() )
      {
        Ω.trigger.event[ $ ].act()
        Ω.trigger.event.splice( $, 1 )
      }
    }
  }
}
