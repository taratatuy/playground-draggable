import { setDragListener } from './DragListener.js';

function init() {
  setDragListener('window');
  setDragListener('window-2');
  setDragListener('window-3');
}

init();
