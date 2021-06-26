export function setDragListener(componentClass) {
  let draggingObj = null;

  // Event on draggable object.
  document.addEventListener('dragstart', (e) => {
    if (!e.target.classList.contains(componentClass)) return;

    draggingObj = e.target;

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

    // Event on other draggable object (swap two objects).
    // Check if placeholder to paste contain target to the current draggable
    // object and placeholder of the draggable object contain target to a
    // swappable object (check all its classes with _target_*).
    if (e.target.parentNode.classList.contains('_target_' + componentClass)) {
      [...e.target.classList].forEach((cssClass) => {
        if (draggingObj.parentNode.classList.contains('_target_' + cssClass)) {
          const draggingObjParent = draggingObj.parentNode;
          e.target.parentNode.appendChild(draggingObj);
          draggingObjParent.appendChild(e.target);
        }
      });
    }

    // Event on placeholder.
    if (!e.target.classList.contains('placeholder')) return;
    if (!e.target.classList.contains('_target_' + componentClass)) return;

    e.target.classList.remove('_visible-border');
    draggingObj.parentNode.removeChild(draggingObj);
    e.target.appendChild(draggingObj);
  });
}
