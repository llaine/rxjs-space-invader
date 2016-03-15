import Rx from 'rx';
import { canvas, context, drawTriangle } from './canvas';

const HERO_Y = canvas.height - 30;
const mouseMove = Rx.Observable.fromEvent(canvas, 'mousemove');
export const SHOOTING_SPEED = 15;

/**
 * Draw the shots on the screen in yellow.
 * @param heroShots
 */
export function paintHeroShots(heroShots) {
  heroShots.forEach(function (shot) {
    shot.y -= SHOOTING_SPEED;
    drawTriangle(shot.x, shot.y, 5, '#ffff00', 'up')
  })
}

/**
 * Paint our hero in green.
 * @param x
 * @param y
 */
export function paintSpaceShip(x, y) {
  drawTriangle(x, y, 10, '#ff0000', 'up');
}

// Hero Moving observable.
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

// Observable which takes care of the shotting feature for the user.
const playerFiring = Rx.Observable
  .merge(
    Rx.Observable.fromEvent(canvas, 'click'),
    Rx.Observable.fromEvent(canvas, 'keydown')
      .filter(evt => evt.keyCode === 32)
  )
  // Limit the shooting frequency to increase difficulty ;)
  .sample(200)
  // Set a timestamp property to every observable emits.
  .timestamp();

export const HeroShots = Rx.Observable
  .combineLatest(
    playerFiring,
    SpaceShip,
    function (shotEvents, spaceShip) {
      return {
        timestamp: shotEvents.timestamp,
        x: spaceShip.x
      }
    }
  )
  // Filter our results that has already been emitted.
  .distinctUntilChanged(shot => shot.timestamp)
  .scan(function (shotArray, shot) {
    shotArray.push({ x: shot.x, y:HERO_Y });
    return shotArray
  }, []);
