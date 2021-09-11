const forms = document.querySelectorAll('.delete');
for (const form of forms) {
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    if (confirm("Delete, Are you sure ?")) {
      form.submit();
    }
  });
}