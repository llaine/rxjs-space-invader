import { paintStars, StarStream, SPEED } from './starfield';
import { paintSpaceShip, paintHeroShots, SpaceShip, HeroShots } from './hero';
import { paintEnemies, Enemies } from './enemy';

function renderScene(actors) {
  paintStars(actors.stars);
  paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
  paintEnemies(actors.enemies);
  paintHeroShots(actors.heroShots);
}

// Allows us to combine multiple observable
// and get observers whenever one of them emits a new item.
const Game = Rx.Observable
  .combineLatest(
    StarStream, SpaceShip, Enemies, HeroShots,
    function (stars, spaceship, enemies, heroShots) {
      return { stars, spaceship, enemies, heroShots }
    }
  )
  .sample(SPEED)
  .subscribe(renderScene);
