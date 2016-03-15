import Rx from 'rx';

// Creating board game
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

// Canvas which fit the all screen.
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const SPEED = 40;
const STAR_NUMBER = 250;
const StarStream = Rx.Observable.range(1, STAR_NUMBER)
  .map(function() {
    // Each star is representing by an object
    // with coordinates and a size
    return {
      x: parseInt(Math.random() * canvas.width),
      y: parseInt(Math.random() * canvas.height),
      size: Math.random() * 3 + 1
    }
  });
