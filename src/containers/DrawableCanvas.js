import { connect } from 'react-redux';
import { canvasMouseDown, canvasMouseUp, canvasMouseMove } from '../actions/canvas';
import Canvas from '../components/Canvas';

function mapStateToProps(state) {
  return {
    boxes: state.boxes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMouseDown: (x, y, targetBox) => {
      dispatch(canvasMouseDown(x, y, targetBox));
    },
    onMouseUp: (x, y, targetBox) => {
      dispatch(canvasMouseUp(x, y, targetBox));
    },
    onMouseMove: (x, y, dragging) => {
      dispatch(canvasMouseMove(x, y, dragging));
    },
  };
}

const DrawableCanvas = connect(mapStateToProps, mapDispatchToProps)(Canvas);

export default DrawableCanvas;
