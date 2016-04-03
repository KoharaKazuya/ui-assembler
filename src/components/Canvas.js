import React from 'react';

const style = {
  position: 'absolute',
  left: '1em',
  top: '1em',
  width: 1000,
  height: 1000,
  backgroundColor: '#DDD',
};

/**
 * MouseEvent オブジェクトから Canvas 座標に変換する
 *
 * @param event {MouseEvent}
 * @return {object} {x, y}
 */
function _onMouseEventToCoordinates(event) {
  const canvasElem = event.currentTarget;
  const canvasBounds = canvasElem.getBoundingClientRect();
  const x = event.clientX - canvasBounds.left;
  const y = event.clientY - canvasBounds.top;
  return { x, y };
}

const Canvas = ({ boxes, onMouseDown, onMouseUp, onMouseMove }) => {
  const boxElems = boxes.map(box => {
    const boxStyle = {
      position: 'absolute',
      left: box.x,
      top: box.y,
      width: box.width,
      height: box.height,
      backgroundColor: '#AAF',
      boxShadow: '1px 1px 5px 0 rgba(0, 0, 0, .3)',
    };
    return (<div key={ box.id } style={ boxStyle } data-box-id={ box.id }></div>);
  });

  function _onMouseDown(event) {
    // I/F の関数が定義されていなければ終了
    if (typeof onMouseDown !== 'function') { return; }
    // マウス直下にある Box を取得
    const targetBox = boxes.find(box => box.id === event.target.dataset.boxId);
    // キャンバス内でのマウス座標を取得する
    const { x, y } = _onMouseEventToCoordinates(event);
    // I/F の関数を呼び出す
    onMouseDown(x, y, targetBox);
  }

  function _onMouseUp(event) {
    // I/F の関数が定義されていなければ終了
    if (typeof onMouseUp !== 'function') { return; }
    // マウス直下にある Box を取得
    const targetBox = boxes.find(box => box.id === event.target.dataset.boxId);
    // キャンバス内でのマウス座標を取得する
    const { x, y } = _onMouseEventToCoordinates(event);
    // I/F の関数を呼び出す
    onMouseUp(x, y, targetBox);
  }

  function _onMouseMove(event) {
    // I/F の関数が定義されていなければ終了
    if (typeof onMouseMove !== 'function') { return; }
    // 左クリックが押されている状態か
    const dragging = (event.buttons & 1) > 0;
    // キャンバス内でのマウス座標を取得する
    const { x, y } = _onMouseEventToCoordinates(event);
    // I/F の関数を呼び出す
    onMouseMove(x, y, dragging);
  }

  return (
    <div
      style={ style }
      onMouseDown={ _onMouseDown }
      onMouseUp={ _onMouseUp }
      onMouseMove={ _onMouseMove }
    >
      { boxElems }
    </div>
  );
};

Canvas.propTypes = {
  boxes: React.PropTypes.arrayOf(React.PropTypes.object),
  /**
   * マウスがキャンバス内でクリックされたとき
   * function(x, y, targetBox)
   * @param x {Number} キャンバス内 X 座標
   * @param y {Number} キャンバス内 Y 座標
   * @param targetBox {Box} マウス直下のボックスオブジェクト
   */
  onMouseDown: React.PropTypes.func,
  /**
   * マウスがキャンバス内でクリックが離されたとき
   * function(x, y, targetBox)
   * @param x {Number} キャンバス内 X 座標
   * @param y {Number} キャンバス内 Y 座標
   * @param targetBox {Box} マウス直下のボックスオブジェクト
   */
  onMouseUp: React.PropTypes.func,
  /**
   * マウスがキャンバス内で動いたときの処理
   * function(x, y, dragging)
   * @param x {Number} キャンバス内 X 座標
   * @param y {Number} キャンバス内 Y 座標
   * @param dragging {Boolean} ドラッグ操作中か
   */
  onMouseMove: React.PropTypes.func,
};

export default Canvas;
