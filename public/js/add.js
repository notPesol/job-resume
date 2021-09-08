const add = document.querySelector('#add');
const remove = document.querySelector('#remove');

add.addEventListener('click', () => {
  const inputs = document.querySelectorAll('input[name="qualifications[]"]');
  if (inputs.length < 10) {
    let lastInput = inputs[inputs.length - 1];
    let newInput = inputs[inputs.length - 1].cloneNode();
    newInput.value = '';
    lastInput.after(newInput);
  }
});

remove.addEventListener('click', () => {
  const inputs = document.querySelectorAll('input[name="qualifications[]"]');
  if (inputs.length > 1) {
    let lastInput = inputs[inputs.length - 1];
    lastInput.remove();
  }
});