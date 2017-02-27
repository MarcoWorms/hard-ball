
'use strict'

////////////////////////////////////////////////////////////////////////////////
// Tracks hover actions in the game
//
Ω.hoverer = addEventListener( 'mouseover', function( $ )
{
  //////////////////////////////////////////////////////////////////////////////
  // Refresh hovered
  //
  Ω.state.hovered = 'none'

  //////////////////////////////////////////////////////////////////////////////
  // Hover color . Part 1 . Refresh everything
  //
  Ω.page.ball.style.backgroundColor = 'rgb(63,63,63)'

  for( let $1 = 0; $1 < 20; $1 ++ )
  {
    let athleteColor = Ω.state.athlete[ $1 ].color
    let darkerColor

    //==========================================================================
    // Teamless athlete
    //
    if( athleteColor === 'none' ) darkerColor = 'rgb(143,143,143)'

    //..........................................................................
    // Athlete is playing or was benched this match
    //
    else if( athleteColor === 'gre' || athleteColor === 'greBlk' )
    {
      darkerColor = 'rgb(127,175,47)'
    }

    else if( athleteColor === 'blu' || athleteColor === 'bluBlk' )
    {
      darkerColor = 'rgb(95,63,191)'
    }

    //==========================================================================
    // Set the athlete's color
    //
    Ω.page.athlete[ $1 ].style.backgroundColor = darkerColor
  }

  //////////////////////////////////////////////////////////////////////////////
  // 00 . Hover the ball (if unmarked)
  //
  if( $.target.id === 'ball'
  && Ω.state.marked.indexOf( 'ball' ) === -1 )
  {
    Ω.state.hovered = 'ball'
    Ω.state.displayed = Ω.state.hovered

    //==========================================================================
    // Hover color . Part 2. Change the hovered ball's color
    //
    Ω.page.ball.style.backgroundColor = 'rgb(95,95,95)'
  }

  //////////////////////////////////////////////////////////////////////////////
  // 01 . Hover some athlete
  //
  else if( $.target.id.substring( 0, 3 ) === 'min' )
  {
    let athlete = Number( $.target.id.substring( 4, 6 ) )
    let athleteColor = Ω.state.athlete[ athlete ].color
    let lighterColor

    //==========================================================================
    // (if unmarked)
    //
    if( Ω.state.marked.indexOf( athlete ) === -1 )
    {
      Ω.state.hovered = athlete
      Ω.state.displayed = Ω.state.hovered
    }

    //==========================================================================
    // Hover color effects . Part 3 . Change the hovered athlete's color
    //==========================================================================
    // Teamless athlete
    //
    if( athleteColor === 'none' ) lighterColor = 'rgb(191,191,191)'

    //..........................................................................
    // Athlete is playing or was benched this match
    //
    else if( athleteColor === 'gre' || athleteColor === 'greBlk' )
    {
      lighterColor = 'rgb(143,191,63)'
    }

    else if( athleteColor === 'blu' || athleteColor === 'bluBlk' )
    {
      lighterColor = 'rgb(111,79,207)'
    }

    //==========================================================================
    // Set the athlete's color
    //
    Ω.page.athlete[ athlete ].style.backgroundColor = lighterColor
  }

  //////////////////////////////////////////////////////////////////////////////
  // 02 . Hover the selection zone
  //
  else if( $.target.id === 'selection' )
  {
    //==========================================================================
    // Hover color . Part 4 . Hover whatever is below the selection zone
    //==========================================================================
    // If the ball is displayed
    //
    if( Ω.state.displayed === 'ball' )
    {
      Ω.page.ball.style.backgroundColor = 'rgb(95,95,95)'
    }

    //==========================================================================
    // If an athlete is displayed
    //
    else if( Ω.state.displayed !== 'none' )
    {
      let athlete = Ω.state.displayed
      let athleteColor = Ω.state.athlete[ athlete ].color
      let lighterColor

      //........................................................................
      // Teamless athlete
      //
      if( athleteColor === 'none' ) lighterColor = 'rgb(191,191,191)'

      // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
      // Athlete is playing or was benched this match
      //
      else if( athleteColor === 'gre' || athleteColor === 'greBlk' )
      {
        lighterColor = 'rgb(143,191,63)'
      }

      // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
      //
      else if( athleteColor === 'blu' || athleteColor === 'bluBlk' )
      {
        lighterColor = 'rgb(111,79,207)'
      }

      //........................................................................
      // Set the athlete's color
      //
      Ω.page.athlete[ athlete ].style.backgroundColor = lighterColor
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // 03 . Hover a zone
  //
  else if( $.target.id.substring( 0, 3 ) === 'zon' )
  {
    if( Ω.state.selected === 'none' ) Ω.state.displayed = 'none'

    let zone = Number( $.target.id.substring( 3, 5 ) )
    let zoneIndex = Ω.state.target.zone.indexOf( zone )

    //==========================================================================
    // HAS target
    //
    if( zoneIndex !== -1 ) // zone is targeting
    {
      let aimed = Ω.state.target.aimed[ zoneIndex ]

      //........................................................................
      // Hover color . Part 5 . Get whatever is below the zone
      //........................................................................
      // If the ball is being aimed
      //
      if( aimed === 'ball' )
      {
        Ω.page.ball.style.backgroundColor = 'rgb(95,95,95)'
      }

      //........................................................................
      // If an athlete is being aimed
      //
      else
      {
        let athlete = aimed
        let athleteColor = Ω.state.athlete[ aimed ].color
        let lighterColor

        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        // Hover color . Part 6 . Colorize aimed
        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        // Teamless athlete
        //
        if( athleteColor === 'none' ) lighterColor = 'rgb(191,191,191)'

        //  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .
        // Athlete is playing or was benched this match
        //
        else if( athleteColor === 'gre' || athleteColor === 'greBlk' )
        {
          lighterColor = 'rgb(143,191,63)'
        }

        else if( athleteColor === 'blu' || athleteColor === 'bluBlk' )
        {
          lighterColor = 'rgb(111,79,207)'
        }

        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        // Set the athlete's color
        //
        Ω.page.athlete[ athlete ].style.backgroundColor = lighterColor
      }
    }

    //==========================================================================
    // Has NO target
    //
    else
    {
      //........................................................................
      //
      Ω.state.hovered = 'none'

      if( Ω.state.selected !== 'none' ) Ω.state.displayed = Ω.state.selected
      else                              Ω.state.displayed = Ω.state.hovered

      //........................................................................
      // Hover color . Part 7a . Refresh everything again
      //
      Ω.page.ball.style.backgroundColor = 'rgb(63,63,63)'

      for( let $1 = 0; $1 < 20; $1 ++ )
      {
        let athlete = Ω.state.athlete[ $1 ]
        let athleteColor = Ω.state.athlete[ $1 ].color
        let darkerColor

        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
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

        else if( athleteColor === 'blu' || athleteColor === 'bluBlk' )
        {
          darkerColor = 'rgb(95,63,191)'
        }

        // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        // Set the athlete's color
        //
        Ω.page.athlete[ $1 ].style.backgroundColor = darkerColor
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // 04 . Hover anything else
  //
  else
  {
    //==========================================================================
    //
    Ω.state.hovered = 'none'

    if( Ω.state.selected !== 'none' ) Ω.state.displayed = Ω.state.selected
    else                              Ω.state.displayed = Ω.state.hovered

    //==========================================================================
    // Hover color . Part 7b . Refresh everything again
    //
    Ω.page.ball.style.backgroundColor = 'rgb(63,63,63)'

    for( let $1 = 0; $1 < 20; $1 ++ )
    {
      let athlete = Ω.state.athlete[ $1 ]
      let athleteColor = Ω.state.athlete[ $1 ].color
      let darkerColor

      //........................................................................
      // Teamless athlete
      //
      if( athleteColor === 'none' ) darkerColor = 'rgb(143,143,143)'

      // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
      // Athlete is playing or was benched this match
      //
      else if( athleteColor === 'gre' || athleteColor === 'greBlk' )
      {
        darkerColor = 'rgb(127,175,47)'
      }

      else if( athleteColor === 'blu' || athleteColor === 'bluBlk' )
      {
        darkerColor = 'rgb(95,63,191)'
      }

      //........................................................................
      // Set the athlete's color
      //
      Ω.page.athlete[ $1 ].style.backgroundColor = darkerColor
    }
  }

////////////////////////////////////////////////////////////////////////////////
// END of 'listen.hoverer'
//
}, false )
