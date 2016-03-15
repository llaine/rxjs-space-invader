import { paintStars, StarStream } from './starfield';
import { paintSpaceShip, SpaceShip } from './hero';
import { paintEnemies, Enemies } from './enemy';

function renderScene(actors) {
  paintStars(actors.stars);
  paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
  paintEnemies(actors.enemies);
}

// Allows us to combine multiple observable
// and get observers whenever one of them emits a new item.
const Game = Rx.Observable
  .combineLatest(
    StarStream, SpaceShip, Enemies,
    function (stars, spaceship, enemies) {
      return { stars, spaceship, enemies }
    }
  );

Game.subscribe(renderScene);
