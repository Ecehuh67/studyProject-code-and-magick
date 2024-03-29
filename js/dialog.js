'use strict';
(function () {

  // Показываем диалоговое окно выбора мага
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');

  // Показываем нижнию панель с рандомными магами
  // userDialog.querySelector('.setup-similar').classList.remove('hidden');

  // Find objects for opening popup
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');

  // Find object input for banning an action to close popup by pressing ESC
  var setupUserName = document.querySelector('.setup-user-name');

  // Create function for closing popup to make the code more readability
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_CODE) {
      closePopup();
    }
  };

  // Create functions to simplify the code
  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };
  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Put handler on icon to show popup
  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  // Put handler on icon to hide popup
  setupClose.addEventListener('click', function () {
    closePopup();
  });

  // Put handler on icon to show popup with help keyboard
  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENT_CODE) {
      openPopup();
    }
  });

  // Put handler on icon to hide popup with help keyboard
  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENT_CODE) {
      closePopup();
    }
  });

  // Ban button ESC bobing up from input
  setupUserName.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ESC_CODE) {
      evt.stopPropagation();
    }
  });

  // Find dialog window
  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload');


  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {

        var onClickPreventDefault = function (def) {
          def.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // A handler for showing an error
  var errorHandler = function (errorMessage) {

    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);

  };

  // Put a handler on the form for sending data to the server
  var form = userDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialog.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });

  window.dialog = {
    userDialog: userDialog
  };
})();
