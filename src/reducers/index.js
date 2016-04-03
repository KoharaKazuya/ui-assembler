import config from '../constants/config';
import * as types from '../constants/actionTypes';

// グリッド状に座標の値を丸める
function roundByGrid(value) {
  const size = config.CANVAS_GRID_SIZE;
  return Math.round(value / size) * size;
}

export default function reducers(state = { boxes: [], draggingBoxId: undefined }, action) {
  switch (action.type) {
    case types.CANVAS_MOUSE_DOWN: {
      // 操作中 Box を生成
      const id = Math.floor(Math.random() * (1 << 30));
      const startX = roundByGrid(action.x);
      const startY = roundByGrid(action.y);
      const [x, y, width, height] = [0, 0, 0, 0];
      const draggingBox = { id, x, y, width, height, startX, startY };
      // 操作中 Box を追加
      const boxes = [...state.boxes, draggingBox];
      // 操作中 Box を指定
      const draggingBoxId = id;

      return Object.assign({}, state, { boxes, draggingBoxId });
    }
    case types.CANVAS_MOUSE_MOVE: {
      // 操作中 Box を取得
      const draggingBoxIndex = state.boxes.findIndex(box => box.id === state.draggingBoxId);
      if (draggingBoxIndex < 0) { return state; }
      const draggingBox = state.boxes[draggingBoxIndex];
      if (draggingBox === undefined) { return state; }
      // ドラッグが中断されていれば操作中 Box を破棄して終了
      if (!action.dragging) {
        const boxes = [
          ...state.boxes.slice(0, draggingBoxIndex),
          ...state.boxes.slice(draggingBoxIndex + 1),
        ];
        const draggingBoxId = -1;
        return Object.assign({}, state, { boxes, draggingBoxId });
      }
      // 操作中 Box の新 BoundingBox を計算
      const actionX = roundByGrid(action.x);
      const actionY = roundByGrid(action.y);
      const x = Math.min(actionX, draggingBox.startX);
      const y = Math.min(actionY, draggingBox.startY);
      const width = Math.abs(actionX - draggingBox.startX);
      const height = Math.abs(actionY - draggingBox.startY);
      // 操作中 Box データを置き換え
      const boxes = [
        ...state.boxes.slice(0, draggingBoxIndex),
        Object.assign({}, draggingBox, { x, y, width, height }),
        ...state.boxes.slice(draggingBoxIndex + 1),
      ];

      return Object.assign({}, state, { boxes });
    }
    case types.CANVAS_MOUSE_UP: {
      // 操作中 Box を取得
      const draggingBoxIndex = state.boxes.findIndex(box => box.id === state.draggingBoxId);
      if (draggingBoxIndex < 0) { return state; }
      const draggingBox = state.boxes[draggingBoxIndex];
      if (draggingBox === undefined) { return state; }
      // 操作中 Box を生成済み Box に変換
      const draggingBoxId = -1;

      return Object.assign({}, state, { draggingBoxId });
    }
    default: {
      return state;
    }
  }
}
