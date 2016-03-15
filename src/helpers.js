import { canvas } from './canvas';

export const SHOOTING_SPEED = 15;
export const SPEED = 40;
export const SCORE_INCREASE = 10;

/**
 * Game over function.
 * Check if the ship hasn't been hit by a ship of shot's ship.
 * @param ship
 * @param enemies
 * @returns {Rx.Observable<boolean>|Observable|boolean|Observable<boolean>}
 */
export function gameOver(ship, enemies) {
  return enemies.some(function(enemy) {
    if(collision(ship, enemy)) {
      return true;
    }

    return enemy.shots.some(shot => collision(ship, shot));
  })
}


/**
 * Get a random integer
 * @param min
 * @param max
 * @returns {*}
 */
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Simple function which filter objects out of the canvas.
 * @param obj
 * @returns {boolean}
 */
export function isVisible(obj) {
  return obj.x > -40 && obj.x < canvas.width + 40
    && obj.y > -40 && obj.y < canvas.height + 40;
}

/**
 * Check wheter two object are 'in collision' which mean that
 * the x/y of the target1 and the target2 is the same.
 * @param target1
 * @param target2
 * @returns {boolean}
 */
export function collision(target1, target2) {
  return (target1.x > target2.x - 20 && target1.x < target2.x + 20)
    && (target1.y > target2.y - 20 && target1.y < target2.y + 20);
}

