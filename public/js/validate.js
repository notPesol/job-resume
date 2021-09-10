const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const form = document.getElementById('form');


form.addEventListener('submit', function (ev) {
  ev.preventDefault();

  const password = document.getElementById('password');
  const rePassword = document.getElementById('rePassword');

  const isValid = validate(password.value, rePassword.value);
  if (!isValid) {
    return alert("password and re-password not equal", 'danger');
  }

  form.submit();
})

function validate(value1, value2) {
  return value1 === value2;
}

function alert(message, type) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  alertPlaceholder.append(wrapper)
}