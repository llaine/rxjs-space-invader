export const canvas = document.createElement('canvas');
export const context = canvas.getContext('2d');

// Drawing the canvas which fit the whole screen.

document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


/**
 * Render our hero on the screen.
 * It's basically a simple triangle.
 * @param x
 * @param y
 * @param width
 * @param color
 * @param direction
 */
export function drawTriangle(x, y, width, color, direction) {
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(x - width, y);
  context.lineTo(x, direction === 'up' ? y - width : y + width);
  context.lineTo(x + width, y);
  context.lineTo(x - width, y);
  context.fill();
}
