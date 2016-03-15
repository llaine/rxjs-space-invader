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


export const ScoreSubject = new Rx.Subject();

export const Score = ScoreSubject
  .scan(function(prev, cur) {
    return prev + cur;
  }, 0)
  .startWith(0);
