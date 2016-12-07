
'use strict'

//////////////////////////////////////////////////////////////////////////////// GLOBALS
//
// DISPLAY LISTEN PATH TEXT PAGE WORLD TEXT EVENT CHANGE STATE ENGINE

//////////////////////////////////////////////////////////////////////////////// PAGE
//
const page =
{
  //////////////////////////////////////////////////////////////////////////////
  // Tests to see if browser is Chrome
  //
  chrome: !!window.chrome && !!window.chrome.webstore,

  //////////////////////////////////////////////////////////////////////////////
  // Get HTML elements
  //
  player:
  [
    document.getElementById( 'P01' ),
    document.getElementById( 'P02' ),
    document.getElementById( 'P03' ),
    document.getElementById( 'P04' ),
    document.getElementById( 'P05' ),
    document.getElementById( 'P06' ),
    document.getElementById( 'P07' ),
    document.getElementById( 'P08' ),
    document.getElementById( 'P09' ),
    document.getElementById( 'P10' ),
    document.getElementById( 'P11' ),
    document.getElementById( 'P12' ),
    document.getElementById( 'P13' ),
    document.getElementById( 'P14' ),
    document.getElementById( 'P15' ),
    document.getElementById( 'P16' ),
    document.getElementById( 'P17' ),
    document.getElementById( 'P18' ),
    document.getElementById( 'P19' ),
    document.getElementById( 'P20' ),
  ]
}

//////////////////////////////////////////////////////////////////////////////// WORLD
//
const world =
{}
