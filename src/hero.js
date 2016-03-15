import Rx from 'rx';
import { canvas, context, drawTriangle } from './canvas';

const HERO_Y = canvas.height - 30;
const mouseMove = Rx.Observable.fromEvent(canvas, 'mousemove');

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
