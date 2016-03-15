import Rx from 'rx';
import { canvas, drawTriangle } from './canvas';

const ENEMY_FREQ = 1500;

/**
 * Get a random integer
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function paintEnemies(enemies) {
  enemies.forEach(enemy => {
    enemy.y += 5;
    // Updating the x coordinates randomly so that
    // enemies move a bit unpredicatbly to the sides.
    enemy.x += getRandomInt(-15, 15);

    drawTriangle(enemy.x, enemy.y, 20, '#00ff00', 'down');
  });
}


export const Enemies = Rx.Observable.interval(ENEMY_FREQ)
  // Scan allows us to aggregates results each time on Observable emits a value and emits each
  // intermediate results.
  .scan(function(enemyArray) {
    const enemy = {
      x: parseInt(Math.random() * canvas.width),
      y: -30
    };

    enemyArray.push(enemy);
    return enemyArray;
  }, []);
