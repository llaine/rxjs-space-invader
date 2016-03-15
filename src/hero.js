import Rx from 'rx';
import { canvas, context } from './starfield';

const HERO_Y = canvas.height - 30;
const mouseMove = Rx.Observable.fromEvent(canvas, 'mousemove');

/**
 * Render our hero on the screen.
 * It's basically a simple triangle.
 * @param x
 * @param y
 * @param width
 * @param color
 * @param direction
 */
function drawTriangle(x, y, width, color, direction) {
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(x - width, y);
  context.lineTo(x, direction === 'up' ? y - width : y + width);
  context.lineTo(x + width, y);
  context.lineTo(x - width, y);
  context.fill();
}

/**
 * Paint our hero in green.
 * @param x
 * @param y
 */
export function paintSpaceShip(x, y) {
  drawTriangle(x, y, '#ff0000', 'up');
}

export const SpaceShip = mouseMove
  .map(function(event) {
    return {
      x: event.clientX,
      y:HERO_Y
    }
  })
  // Set the first value of the observable
  // in the middle of the screen
  .startWith({
    x: canvas.width / 2,
    y: HERO_Y
  });
