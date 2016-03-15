import Rx from 'rx';
import { canvas, context } from './canvas';

/**
 * Display the score to the canvas.
 * @param score
 */
export function paintScore(score) {
  context.fillStyle = '#ffffff';
  context.font = 'bold 26px sans-serif';
  context.fillText(`Score : ${score}`, 40, 43)
}

export function paintCommands() {
  context.fillStyle = '#ffffff';
  context.font = 'bold 15px sans-serif';
  context.fillText('Spacebar/Click to shot Mouse to move and Ctrl + R to play again!', 700, 40);
}


export const ScoreSubject = new Rx.Subject();

export const Score = ScoreSubject
  .scan(function(prev, cur) {
    return prev + cur;
  }, 0)
  .startWith(0);
