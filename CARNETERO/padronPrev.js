// content.js

// Function to modify the URL and redirect
function addUrlParameterAndRedirect() {

  const form = document.getElementById("form2")

  form.setAttribute("action", "result.php?c=6-2-2&dni="+document.querySelector('[name="nroDocumento"]').value);

  form.submit();  
}



// Get all elements with the class "botonConsultar"
const buttons = document.querySelectorAll('.botonConsultar');



// Check if there is a second element (index 1) in the NodeList
if (buttons.length > 1) {
  // Add a click event listener to the second button
  buttons[1].addEventListener('click',addUrlParameterAndRedirect)
}