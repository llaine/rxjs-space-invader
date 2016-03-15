import Rx from 'rx';
import { canvas, context, drawTriangle } from './canvas';
import { collision, SHOOTING_SPEED, SCORE_INCREASE } from './helpers';
import { ScoreSubject } from './score';


const HERO_Y = canvas.height - 30;
const mouseMove = Rx.Observable.fromEvent(canvas, 'mousemove');

/**
 * Draw the shots on the screen in yellow.
 * @param heroShots
 * @param enemies
 */
export function paintHeroShots(heroShots, enemies) {
  heroShots.forEach(function (shot) {
    // Check whether each shot hits an enemy.
    // For cases where a hit occurs, we'll set a property isDead to true
    // on that enemy that has been hit, and we'll set the coordinates of the
    // shot to outside the screen. The shot will eventually be filtered out because it's outside
    // the screen.
    for(let l = 0; l < enemies.length ; l ++) {
      const enemy = enemies[l];
      if(!enemy.isDead && collision(shot, enemy)) {
        ScoreSubject.onNext(SCORE_INCREASE);
        enemy.isDead = true;
        shot.x = shot.y = -100;
        break;
      }
    }

    shot.y -= SHOOTING_SPEED;
    drawTriangle(shot.x, shot.y, 10, '#ffff00', 'up')
  })
}

/**
 * Paint our hero in green.
 * @param x
 * @param y
 */
export function paintSpaceShip(x, y) {
  drawTriangle(x, y, 20, '#ff0000', 'up');
}

// Hero moves observable, based on mouseMove events.
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
    Rx.Observable.fromEvent(document, 'keydown')
      .filter(function(evt) {
        return evt.keyCode === 32;
      })
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
