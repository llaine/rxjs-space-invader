import { paintStars, StarStream } from './starfield';
import { paintSpaceShip, paintHeroShots, SpaceShip, HeroShots } from './hero';
import { paintEnemies, Enemies } from './enemy';
import { paintScore, paintCommands, Score } from './score';

import { SPEED, gameOver } from './helpers';

/**
 * Principal function which create everything on the canvas.
 * @param actors
 */
function renderScene(actors) {
  paintStars(actors.stars);
  paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
  paintEnemies(actors.enemies);
  paintHeroShots(actors.heroShots, actors.enemies);
  paintScore(actors.score);
  paintCommands();
}

// Allows us to combine multiple observable
// and get observers whenever one of them emits a new item.
Rx.Observable
  .combineLatest(
    StarStream, SpaceShip, Enemies, HeroShots, Score,
    function (stars, spaceship, enemies, heroShots, score) {
      return { stars, spaceship, enemies, heroShots, score }
    }
  )
  .sample(SPEED)
  // Using takeWhile to tell our main combineLatest Observable to keep
  // taking values until gameOver returns true.
  // If gameOver returns true, this will effectively stopping the game.
  .takeWhile(function(actors) {
    return gameOver(actors.spaceship, actors.enemies) === false;
  })
  .subscribe(renderScene);
