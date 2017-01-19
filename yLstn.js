
'use strict'

////////////////////////////////////////////////////////////////////////////////
// Tracks actions in the game
//
Ω.listen =
{
  //////////////////////////////////////////////////////////////////////////////
  //
  clicker: addEventListener( 'mousedown', function( $ )
  {
    ////////////////////////////////////////////////////////////////////////////
    // 00 . START resetting the game
    //
    if( $.target.id === 'reset' )
    {
      Ω.page.reset.innerHTML = 'REALLY ?'
      Ω.page.reset.style.width = '15%'
      Ω.tool.chgCls( Ω.page.reset, '-', 'btn' )
      Ω.tool.chgCls( Ω.page.reset, '+', 'dsp' )

      Ω.page.yes.style.display = 'flex'
      Ω.page.no.style.display = 'flex'
    }

    ////////////////////////////////////////////////////////////////////////////
    // 01 . FINISH resetting the game
    //
    else if( $.target.id === 'yes' )
    {
      Ω.page.reset.innerHTML = 'RESET'
      Ω.page.reset.style.width = '25%'
      Ω.tool.chgCls( Ω.page.reset, '-', 'dsp' )
      Ω.tool.chgCls( Ω.page.reset, '+', 'btn' )

      Ω.page.yes.style.display = 'none'
      Ω.page.no.style.display = 'none'

      //========================================================================
      // Preparation to avoid visual strange behavior
      //
      Array.from( Ω.page.animate1 ).forEach( function( $1 )
      {
        $1.style.transition = ''
        $1.style.display = 'none'
      } )

      //========================================================================
      // Only way to recover the original state
      //
      Ω.state = JSON.parse( localStorage.getItem( 'first' ) )

      //========================================================================
      // So it does not trigger load below
      //
      localStorage.removeItem( 'last' )

      //========================================================================
      // Reload page
      //
      location.reload()
    }

    ////////////////////////////////////////////////////////////////////////////
    // 02 . STOP resetting the game
    //
    else if( $.target.id === 'no' )
    {
      Ω.page.reset.innerHTML = 'RESET'
      Ω.page.reset.style.width = '25%'
      Ω.tool.chgCls( Ω.page.reset, '-', 'dsp' )
      Ω.tool.chgCls( Ω.page.reset, '+', 'btn' )

      Ω.page.yes.style.display = 'none'
      Ω.page.no.style.display = 'none'
    }

    ////////////////////////////////////////////////////////////////////////////
    // 03 . Select the ball (if unlocked)
    //
    else if( $.target.id === 'ball'
    && Ω.state.lock === false )
    {
      Ω.state.selected = 'ball'
      Ω.state.displayed = Ω.state.selected
    }

    ////////////////////////////////////////////////////////////////////////////
    // 04 . Select an athlete (if unlocked)
    //
    else if( $.target.id.substring( 0, 3 ) === 'min'
    && Ω.state.lock === false )
    {
      let athlete = Number( $.target.id.substring( 4, 6 ) )

      //========================================================================
      // If athlete is unmarked
      //
      if( Ω.state.marked.indexOf( athlete ) === -1 )
      {
        Ω.state.selected = athlete
        Ω.state.displayed = Ω.state.selected
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // 05 . Click on a zone (if unlocked)
    //
    // It's important to note that its only possible to click a zone when the
    // ball or some athlete is selected
    //
    else if( $.target.id.substring( 0, 3 ) === 'zon'
    && Ω.state.lock === false )
    {
      Ω.state.lock = true

      // tbd

      Ω.state.lock = false
    }

    ////////////////////////////////////////////////////////////////////////////
    // 06 . Select the selection zone or nothing (if unlocked)
    //
    else if( Ω.state.lock === false )
    {
      Ω.state.selected = 'none'
      Ω.state.displayed = Ω.state.selected
    }

    ////////////////////////////////////////////////////////////////////////////
    // Updating selection zone here to preserve animation
    //
    Ω.game.updSel()

  //////////////////////////////////////////////////////////////////////////////
  // END of 'listen.clicker'
  //
  }, false ),

  //////////////////////////////////////////////////////////////////////////////
  //
  hoverer: addEventListener( 'mouseover', function( $ )
  {
    ////////////////////////////////////////////////////////////////////////////
    // Refresh hovered
    //
    Ω.state.hovered = 'none'

    ////////////////////////////////////////////////////////////////////////////
    // Hover color . Part 1 . Refresh everything
    //
    Ω.page.ball.style.backgroundColor = 'rgb(111,79,47)'

    for( let $1 = 0; $1 < 20; $1 ++ )
    {
      let athleteColor = Ω.state.athlete[ $1 ][ 2 ]
      let darkerColor

      //========================================================================
      // Teamless athlete
      //
      if( athleteColor === 'none' ) darkerColor = 'rgb(143,143,143)'

      //........................................................................
      // Athlete is playing or was benched this match (green team)
      //
      else if( athleteColor === 'gre' || athleteColor === 'greBlk' )
      {
        darkerColor = 'rgb(127,175,47)'
      }

      //........................................................................
      // Athlete is playing or was benched this match (blue team)
      //
      else if( athleteColor === 'blu' || athleteColor === 'bluBlk' )
      {
        darkerColor = 'rgb(95,63,191)'
      }

      //========================================================================
      // Set the athlete's color
      //
      Ω.page.athlete[ $1 ].style.backgroundColor = darkerColor
    }

    ////////////////////////////////////////////////////////////////////////////
    // 00 . Hover the ball (if unmarked)
    //
    if( $.target.id === 'ball'
    && Ω.state.marked.indexOf( 'ball' ) === -1 )
    {
      Ω.state.hovered = 'ball'
      Ω.state.displayed = Ω.state.hovered

      //========================================================================
      // Hover color . Part 2. Change the hovered ball's color
      //
      Ω.page.ball.style.backgroundColor = 'rgb(143,111,79)'
    }

    ////////////////////////////////////////////////////////////////////////////
    // 01 . Hover some athlete
    //
    else if( $.target.id.substring( 0, 3 ) === 'min' )
    {
      let athlete = Number( $.target.id.substring( 4, 6 ) )
      let athleteColor = Ω.state.athlete[ athlete ][ 2 ]
      let lighterColor

      //========================================================================
      // (if unmarked)
      //
      if( Ω.state.marked.indexOf( athlete ) === -1 )
      {
        Ω.state.hovered = athlete
        Ω.state.displayed = Ω.state.hovered
      }

      //========================================================================
      // Hover color effects . Part 3 . Change the hovered athlete's color
      //========================================================================
      // Teamless athlete
      //
      if( athleteColor === 'none' ) lighterColor = 'rgb(191,191,191)'

      //........................................................................
      // Athlete is playing or was benched this match
      //
      else if( athleteColor === 'gre' || athleteColor === 'greBlk' )
      {
        lighterColor = 'rgb(143,191,63)'
      }

      //........................................................................
      //
      else if( athleteColor === 'blu' || athleteColor === 'bluBlk' )
      {
        lighterColor = 'rgb(111,79,207)'
      }

      //========================================================================
      // Set the athlete's color
      //
      Ω.page.athlete[ athlete ].style.backgroundColor = lighterColor
    }

    ////////////////////////////////////////////////////////////////////////////
    // 02 . Hover the selection zone
    //
    else if( $.target.id === 'selection' )
    {
      //========================================================================
      // Hover color . Part 4 . Hover whatever is below the selection zone
      //========================================================================
      // If the ball is displayed
      //
      if( Ω.state.displayed === 'ball' )
      {
        Ω.page.ball.style.backgroundColor = 'rgb(143,111,79)'
      }

      //========================================================================
      // If an athlete is displayed
      //
      else if( Ω.state.displayed !== 'none' )
      {
        let athlete = Ω.state.displayed
        let athleteColor = Ω.state.athlete[ athlete ][ 2 ]
        let lighterColor

        //......................................................................
        // Teamless athlete
        //
        if( athleteColor === 'none' ) lighterColor = 'rgb(191,191,191)'

        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        // Athlete is playing or was benched this match
        //
        else if( athleteColor === 'gre' || athleteColor === 'greBlk' )
        {
          lighterColor = 'rgb(143,191,63)'
        }

        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        //
        else if( athleteColor === 'blu' || athleteColor === 'bluBlk' )
        {
          lighterColor = 'rgb(111,79,207)'
        }

        //......................................................................
        // Set the athlete's color
        //
        Ω.page.athlete[ athlete ].style.backgroundColor = lighterColor
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // 03 . Hover a zone
    //
    else if( $.target.id.substring( 0, 3 ) === 'zon' )
    {
      if( Ω.state.selected === 'none' ) Ω.state.displayed = 'none'

      let targetedZone = Number( $.target.id.substring( 3, 5 ) )
      let targetedZoneIndex = Ω.state.target[ 0 ].indexOf( targetedZone )

      //========================================================================
      // Has a target
      //
      if( targetedZoneIndex !== -1 ) // zone is targeting
      {
        let targeted = Ω.state.target[ 1 ][ zoneIndex ]

        //......................................................................
        // Hover color . Part 5 . Get whatever is below the zone
        //......................................................................
        // If the ball is being targeted
        //
        if( targeted === 'ball' )
        {
          Ω.page.ball.style.backgroundColor = 'rgb(143,111,79)'
        }

        //......................................................................
        // If an athlete is being targeted
        //
        else
        {
          let athlete = targeted
          let athleteColor = Ω.state.athlete[ targeted ][ 2 ]
          let lighterColor

          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // Teamless athlete
          //
          if( athleteColor === 'none' ) lighterColor = 'rgb(191,191,191)'

          //  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  
          // Athlete is playing or was benched this match
          //
          else if( athleteColor === 'gre' || athleteColor === 'greBlk' )
          {
            lighterColor = 'rgb(143,191,63)'
          }

          //  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  
          //
          else if( athleteColor === 'blu' || athleteColor === 'bluBlk' )
          {
            lighterColor = 'rgb(111,79,207)'
          }

          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // Set the athlete's color
          //
          Ω.page.athlete[ athlete ].style.backgroundColor = lighterColor
        }
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // 04 . Hover anything else
    //
    else
    {
      //========================================================================
      //
      Ω.state.hovered = 'none'

      if( Ω.state.selected !== 'none' ) Ω.state.displayed = Ω.state.selected
      else                              Ω.state.displayed = Ω.state.hovered

      //========================================================================
      // Hover color . Part 6 . Refresh everything again
      //
      Ω.page.ball.style.backgroundColor = 'rgb(111,79,47)'

      for( let $1 = 0; $1 < 20; $1 ++ )
      {
        let athlete = Ω.state.athlete[ $1 ]
        let athleteColor = Ω.state.athlete[ $1 ][ 2 ]
        let darkerColor

        //......................................................................
        // Teamless athlete
        //
        if( athleteColor === 'none' ) darkerColor = 'rgb(143,143,143)'

        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        // Athlete is playing or was benched this match
        //
        else if( athleteColor === 'gre' || athleteColor === 'greBlk' )
        {
          darkerColor = 'rgb(127,175,47)'
        }

        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        //
        else if( athleteColor === 'blu' || athleteColor === 'bluBlk' )
        {
          darkerColor = 'rgb(95,63,191)'
        }

        //......................................................................
        // Set the athlete's color
        //
        Ω.page.athlete[ $1 ].style.backgroundColor = darkerColor
      }
    }

  //////////////////////////////////////////////////////////////////////////////
  // END of 'listen.hoverer'
  //
  }, false ),
}
