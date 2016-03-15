import Rx from 'rx';
import { canvas, context } from './canvas';

// Initializing the stars stream constants.
const SPEED = 40;
const STAR_NUMBER = 250;

/**
 * Paint a black background and draws the stars on the canvas.
 * @param stars
 */
export function paintStars(stars) {
  context.fillStyle = '#000000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#ffffff';
  stars.forEach(function(star) {
    context.fillRect(star.x, star.y, star.size, star.size);
  })
}

// The stream wich create all the stars.
export const StarStream = Rx.Observable.range(1, STAR_NUMBER)
  .map(function() {
    // Each star is representing by an object
    // with coordinates and a size
    return {
      x: parseInt(Math.random() * canvas.width),
      y: parseInt(Math.random() * canvas.height),
      size: Math.random() * 3 + 1
    }
  })
  .toArray()
  .flatMap(function(starArray) {
    return Rx.Observable.interval(SPEED).map(function() {
      starArray.forEach(function (star) {
        // Reset star to the top of the screen
        if (star.y >= canvas.height) {
          star.y = 0;
        }
        // Else we move the star
        star.y += 3;
      });
      return starArray;
    })
  });
