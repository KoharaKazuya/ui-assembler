import * as types from '../constants/actionTypes';

export function canvasMouseDown(x, y, targetBox) {
  return { type: types.CANVAS_MOUSE_DOWN, x, y, targetBox };
}

export function canvasMouseUp(x, y, targetBox) {
  return { type: types.CANVAS_MOUSE_UP, x, y, targetBox };
}

export function canvasMouseMove(x, y, dragging) {
  return { type: types.CANVAS_MOUSE_MOVE, x, y, dragging };
}
