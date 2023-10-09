var items = document.querySelectorAll('.item');

items.forEach((item) => {
  
  const checkbox = item.querySelector("input[type='checkbox']");
  const secondChild = item.querySelector("p");

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      secondChild.classList.add('checked'); // add class
    } else {
      secondChild.classList.remove('checked'); // remove class
    }
});  
});


const myButton = document.querySelector('button');

myButton.addEventListener('mouseenter', function() {
    // Cambia la forma del cursor se pose sobre el botón
    myButton.style.cursor = 'pointer'; // Se puede usar 'pointer' u otras formas de cursor
});

myButton.addEventListener('mouseleave', function() {
    // Restablece la forma del cursor cuando sale del botón
    myButton.style.cursor = 'auto'; // Cambia 'auto' para que el cursor sea el predeterminado
});