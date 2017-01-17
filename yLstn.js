
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
      Array.from( Ω.page.animate1 ).forEach( function( $ )
      {
        $.style.transition = ''
        $.style.display = 'none'
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
    // 03 . Select the ball
    //
    else if( $.target.id === 'ball' )
    {
      Ω.state.selected = 'ball'
      Ω.state.displayed = Ω.state.selected
    }

    ////////////////////////////////////////////////////////////////////////////
    // 04 . Select an athlete
    //
    else if( $.target.id.substring( 0, 3 ) === 'min' )
    {
      Ω._.athlete = Number( $.target.id.substring( 4, 6 ) )

      //========================================================================
      // If athlete is not marked
      //
      if( Ω.state.marked.indexOf( Ω._.athlete ) === -1 )
      {
        Ω.state.selected = Ω._.athlete
        Ω.state.displayed = Ω.state.selected
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // 05 . Click on a zone
    //
    // It's important to note that its only possible to click a zone when the
    // ball or some athlete is selected
    //
    else if( $.target.id.substring( 0, 3 ) === 'zon' )
    {
      // tbd
    }

    ////////////////////////////////////////////////////////////////////////////
    // 06 . Select the selection zone or nothing
    //
    else
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

    for( let $ = 0; $ < 20; $ ++ )
    {
      Ω._.athlete = Ω.state.athlete[ $ ]
      Ω._.athleteColor = Ω.state.athlete[ $ ][ 2 ]

      //========================================================================
      // Teamless athlete
      //
      if( Ω._.athleteColor === 'none' )
      {
        Ω._.darkerColor = 'rgb(143,143,143)'
      }

      //........................................................................
      // Athlete is playing or was benched this match (green team)
      //
      else if( Ω._.athleteColor === 'gre' || Ω._.athleteColor === 'greBlk' )
      {
        Ω._.darkerColor = 'rgb(127,175,47)'
      }

      //........................................................................
      // Athlete is playing or was benched this match (blue team)
      //
      else if( Ω._.athleteColor === 'blu' || Ω._.athleteColor === 'bluBlk' )
      {
        Ω._.darkerColor = 'rgb(95,63,191)'
      }

      //========================================================================
      // Set the athlete's color
      //
      Ω.page.athlete[ $ ].style.backgroundColor = Ω._.darkerColor
    }

    ////////////////////////////////////////////////////////////////////////////
    // 00 . Hover the ball
    //
    if( $.target.id === 'ball' )
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
      Ω._.athlete = Number( $.target.id.substring( 4, 6 ) )
      Ω._.athleteColor = Ω.state.athlete[ Ω._.athlete ][ 2 ]

      //========================================================================
      // If athlete is not marked
      //
      if( Ω.state.marked.indexOf( Ω._.athlete ) === -1 )
      {
        Ω.state.hovered = Ω._.athlete
        Ω.state.displayed = Ω.state.hovered
      }

      //========================================================================
      // Hover color effects . Part 3 . Change the hovered athlete's color
      //========================================================================
      // Teamless athlete
      //
      if( Ω._.athleteColor === 'none' ) Ω._.lighterColor = 'rgb(191,191,191)'

      //........................................................................
      // Athlete is playing or was benched this match
      //
      else if( Ω._.athleteColor === 'gre' || Ω._.athleteColor === 'greBlk' )
      {
        Ω._.lighterColor = 'rgb(143,191,63)'
      }

      //........................................................................
      //
      else if( Ω._.athleteColor === 'blu' || Ω._.athleteColor === 'bluBlk' )
      {
        Ω._.lighterColor = 'rgb(111,79,207)'
      }

      //========================================================================
      // Set the athlete's color
      //
      Ω.page.athlete[ Ω._.athlete ].style.backgroundColor = Ω._.lighterColor
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
        Ω._.athlete = Ω.state.displayed
        Ω._.athleteColor = Ω.state.athlete[ Ω._.athlete ][ 2 ]

        //......................................................................
        // Teamless athlete
        //
        if( Ω._.athleteColor === 'none' ) Ω._.lighterColor = 'rgb(191,191,191)'

        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        // Athlete is playing or was benched this match
        //
        else if( Ω._.athleteColor === 'gre' || Ω._.athleteColor === 'greBlk' )
        {
          Ω._.lighterColor = 'rgb(143,191,63)'
        }

        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        //
        else if( Ω._.athleteColor === 'blu' || Ω._.athleteColor === 'bluBlk' )
        {
          Ω._.lighterColor = 'rgb(111,79,207)'
        }

        //......................................................................
        // Set the athlete's color
        //
        Ω.page.athlete[ Ω._.athlete ].style.backgroundColor = Ω._.lighterColor
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // 03 . Hover a zone
    //
    else if( $.target.id.substring( 0, 3 ) === 'zon' )
    {
      Ω._.targetedZone = Number( $.target.id.substring( 3, 5 ) )
      Ω._.targetedZoneIndex = Ω.state.target[ 0 ].indexOf( Ω._.targetedZone )

      //========================================================================
      // Has a target
      //
      if( Ω._.targetedZoneIndex !== -1 ) // zone is targeting
      {
        Ω._.targetedAthlete = Ω.state.target[ 1 ][ zoneIndex ]
        Ω._.athleteColor = Ω.state.athlete[ targetedAthlete ][ 2 ]

        //......................................................................
        // Hover color . Part 5 . Get whatever is below the zone
        //......................................................................
        // If the ball is being targeted
        //
        if( targetedAthlete === 'ball' )
        {
          Ω.page.ball.style.backgroundColor = 'rgb(143,111,79)'
        }

        //......................................................................
        // If an athlete is being targeted
        //
        else
        {
          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // Teamless athlete
          //
          if( athleteColor === 'none' ) Ω._.lighterColor = 'rgb(191,191,191)'

          //  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  
          // Athlete is playing or was benched this match
          //
          else if( athleteColor === 'gre' || athleteColor === 'greBlk' )
          {
            Ω._.lighterColor = 'rgb(143,191,63)'
          }

          //  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  
          //
          else if( athleteColor === 'blu' || athleteColor === 'bluBlk' )
          {
            Ω._.lighterColor = 'rgb(111,79,207)'
          }

          // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          // Set the athlete's color
          //
          Ω.page.athlete[ targetedAthlete ].style.backgroundColor = lighterColor
        }
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // 04 . Hover anything else
    //
    else
    {
      //========================================================================
      // Hover color . Part 6 . Refresh everything again
      //
      Ω.page.ball.style.backgroundColor = 'rgb(111,79,47)'

      for( let $ = 0; $ < 20; $ ++ )
      {
        Ω._.athlete = Ω.state.athlete[ $ ]
        Ω._.athleteColor = Ω.state.athlete[ $ ][ 2 ]

        //......................................................................
        // Teamless athlete
        //
        if( Ω._.athleteColor === 'none' ) Ω._.darkerColor = 'rgb(143,143,143)'

        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        // Athlete is playing or was benched this match
        //
        else if( Ω._.athleteColor === 'gre' || Ω._.athleteColor === 'greBlk' )
        {
          Ω._.darkerColor = 'rgb(127,175,47)'
        }

        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        //
        else if( Ω._.athleteColor === 'blu' || Ω._.athleteColor === 'bluBlk' )
        {
          Ω._.darkerColor = 'rgb(95,63,191)'
        }

        //......................................................................
        // Set the athlete's color
        //
        Ω.page.athlete[ $ ].style.backgroundColor = Ω._.darkerColor
      }

      //========================================================================
      // Hovering nothing is tricky and must be safeguarded by this condition
      //
      if( Ω.state.selected !== 'none' ) Ω.state.displayed = Ω.state.selected
      else                              Ω.state.displayed = Ω.state.hovered
    }

  //////////////////////////////////////////////////////////////////////////////
  // END of 'listen.hoverer'
  //
  }, false ),
}
