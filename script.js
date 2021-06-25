/**
 * @param {string} componentClass - CSS class of draggable element.
 */
function setDragListener(componentClass) {
  let draggingObj = null;

  // Event on draggable object.
  document.addEventListener('dragstart', (e) => {
    if (!e.target.classList.contains(componentClass)) return;

    draggingObj = e.target;

    e.target.style.opacity = 0.2;

    const placeholders = document.querySelectorAll(
      `.placeholder._target_${componentClass}`
    );

    placeholders.forEach((placeholder) => {
      placeholder.classList.add('_shown');
    });
  });

  // Event on draggable object.
  document.addEventListener('dragend', (e) => {
    if (!draggingObj) return;
    if (!e.target.classList.contains(componentClass)) return;

    draggingObj.style.opacity = 1;
    draggingObj = null;

    const placeholders = document.querySelectorAll(
      `.placeholder._target_${componentClass}`
    );

    placeholders.forEach((placeholder) => {
      placeholder.classList.remove('_shown');
    });
  });

  // Event on placeholder.
  document.addEventListener('dragenter', (e) => {
    if (!draggingObj) return;
    if (!e.target.classList.contains('placeholder')) return;
    if (!e.target.classList.contains('_target_' + componentClass)) return;

    e.preventDefault();
    e.target.classList.add('_visible-border');
  });

  // Event on placeholder.
  document.addEventListener('dragleave', (e) => {
    if (!draggingObj) return;
    if (!e.target.classList.contains('placeholder')) return;
    if (!e.target.classList.contains('_target_' + componentClass)) return;

    e.preventDefault();
    e.target.classList.remove('_visible-border');
  });

  // Event on placeholder.
  document.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  document.addEventListener('drop', (e) => {
    if (!draggingObj) return;

    // Event on draggable object.
    if (e.target.classList.contains(componentClass)) {
      const draggingObjParent = draggingObj.parentNode;
      e.target.parentNode.appendChild(draggingObj);
      draggingObjParent.appendChild(e.target);
    }

    // Event on placeholder.
    if (!e.target.classList.contains('placeholder')) return;
    if (!e.target.classList.contains('_target_' + componentClass)) return;

    e.target.classList.remove('_visible-border');
    draggingObj.parentNode.removeChild(draggingObj);
    e.target.appendChild(draggingObj);
  });
}

function init() {
  setDragListener('window');
  setDragListener('window-2');
}

init();
