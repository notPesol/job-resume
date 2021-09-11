const file = document.getElementById('file');
file.addEventListener('change', () => {
  // Allowing file type
  const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  const filePath = file.value;

  if (!allowedExtensions.exec(filePath)) {
    alert("Your file type not allow!")
    file.value = '';
  }
});