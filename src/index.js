import { paintStars, StarStream } from './starfield';
import { paintSpaceShip, SpaceShip } from './hero';

function renderScene(actors) {
  paintStars(actors.stars);
  paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
}

const Game = Rx.Observable
  .combineLatest(
    StarStream, SpaceShip,
    function (star, spaceship) {
      return { star, spaceship }
    }
  );

Game.subscribe(renderScene);
