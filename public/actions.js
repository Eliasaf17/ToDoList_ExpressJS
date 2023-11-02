
function handler(id) {
  document.getElementById("title" + id).setAttribute("hidden", true)
  document.getElementById("edit" + id).setAttribute("hidden", true)
  document.getElementById("done" + id).removeAttribute("hidden")
  document.getElementById("input" + id).removeAttribute("hidden")
};

const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const form = this.parentElement;
    form.querySelector('input[name="actualRoute"]').value = window.location.href;
    form.submit();
  });
});

const forms = document.querySelectorAll("form");

forms.forEach(form => {
  // Almacena la URL actual en el campo oculto antes del envío del formulario
  form.addEventListener('submit', function() {
    var currentForm = this;
    currentForm.querySelector('input[name="actualRoute"]').value = window.location.href;
  });
});

/* // Si queremos usar jquery
$('form').submit(function() {
  // Antes de enviar el formulario, actualiza el valor del campo oculto
  var currentForm = $(this);
  currentForm.find('input[name="actualRoute"]').val(window.location.href);
}); */

