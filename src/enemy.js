import Rx from 'rx';
import { canvas, drawTriangle } from './canvas';
import { SHOOTING_SPEED } from './hero';

const ENEMY_FREQ = 1500;
const ENEMY_SHOOTING_FREQ = 750;

/**
 * Get a random integer
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isVisible(obj) {
  return obj.x > -40 && obj.x < canvas.width + 40
    && obj.y > -40 && obj.y < canvas.height + 40;
}

/**
 * Draw the "enemies" triangle on the screen.
 * @param enemies
 */
export function paintEnemies(enemies) {
  enemies.forEach(enemy => {
    enemy.y += 5;
    // Updating the x coordinates randomly so that
    // enemies move a bit unpredicatbly to the sides.
    enemy.x += getRandomInt(-15, 15);

    drawTriangle(enemy.x, enemy.y, 20, '#00ff00', 'down');

    enemy.shots.forEach(function(shot) {
      shot.y += SHOOTING_SPEED;
      drawTriangle(shot.x, shot.y, 5, '#00ffff', 'down')
    })
  });
}
// Enemies observable pipeline, which create
// enemies object every 1500 millisec
export const Enemies = Rx.Observable.interval(ENEMY_FREQ)
  // Scan allows us to aggregates results each time on Observable emits a value and emits each
  // intermediate results.
  .scan(function(enemyArray) {
    const enemy = {
      x: parseInt(Math.random() * canvas.width),
      y: -30,
      shots: []
    };

    // Adding shots to the shot's enemy array.
    // Filter those which are out of the screen.
    Rx.Observable.interval(ENEMY_SHOOTING_FREQ).subscribe(function() {
      enemy.shots.push({ x:enemy.x, y:enemy.y });
      enemy.shots = enemy.shots.filter(isVisible);
    });

    enemyArray.push(enemy);
    return enemyArray;
  }, []);
