import Rx from 'rx';
import { canvas, drawTriangle } from './canvas';
import { SHOOTING_SPEED, getRandomInt, isVisible } from './helpers'

const ENEMY_FREQ = 1500;
const ENEMY_SHOOTING_FREQ = 750;

/**
 * Draw the "enemies" triangle on the screen.
 * Also draw the enemies shots.
 * @param enemies
 */
export function paintEnemies(enemies) {
  enemies.forEach(enemy => {
    enemy.y += 5;
    // Updating the x coordinates randomly so that
    // enemies move a bit unpredicatbly to the sides.
    enemy.x += getRandomInt(-30, 30);

    if(!enemy.isDead) {
      drawTriangle(enemy.x, enemy.y, 20, '#00ff00', 'down');
    }

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
      if(!enemy.isDead) {
        enemy.shots.push({ x:enemy.x, y:enemy.y });
      }
      enemy.shots = enemy.shots.filter(isVisible);
    });

    enemyArray.push(enemy);
    return enemyArray
      .filter(isVisible)
      // Get rid of the enemies which are dead
      // checking the shots's enemy array in order to avoid weird
      // behaviour such a magic disappear of the enemy and his shots.
      .filter(enemy => !(enemy.isDead && enemy.shots.length === 0))
  }, []);
