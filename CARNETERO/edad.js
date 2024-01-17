function copyText(element, secondaryElement){
  element.style.transition = ""
  const textArea = document.createElement("textarea");

  if (typeof secondaryElement != 'undefined'){
    secondaryElement.style.transition = ""
    textArea.value = element.textContent.trim()+secondaryElement.textContent.trim();;
    secondaryElement.style.backgroundColor = "yellow";
  }
  else{
    textArea.value = element.textContent.trim();
  }
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);

  element.style.backgroundColor = "yellow";
  
  // After a delay, remove the background color to initiate the fade effect.
  setTimeout(() => {
    element.style.transition = "background-color 2s"; // Adjust the duration as needed
    element.style.backgroundColor = "";
    if (typeof secondaryElement != 'undefined'){
      secondaryElement.style.transition = "background-color 2s"; // Adjust the duration as needed
      secondaryElement.style.backgroundColor = "";
    }
  }, 500); // Adjust the delay to match the transition duration
}

const table = document.querySelectorAll("table")[1];

var fechaElement = table.rows[3].cells[1];
var fecha = fechaElement.textContent;
//qrHeader.appendChild(qrText);
//header.cells[4].insertAdjacentElement("afterend",qrHeader);

var nacCopyButton = document.createElement("button");
nacCopyButton.textContent = "📋"

var edadCopyButton = document.createElement("button");
edadCopyButton.textContent = "📋"

var from = fecha.split("/");
var birthdateTimeStamp = new Date(from[2], from[1] - 1, from[0]);
var cur = new Date();
var diff = cur - birthdateTimeStamp;
var edad = Math.floor(diff/31557600000);

var edadElement = document.createElement("p");

edadElement.textContent = "("+edad+" años)";

fechaElement.querySelector("p").insertAdjacentElement("afterend",edadElement);
fechaElement.querySelector("p").insertAdjacentElement("afterend",nacCopyButton);
edadElement.insertAdjacentElement("afterend",edadCopyButton)


nacCopyButton.addEventListener("click", function() {
  copyText(fechaElement.firstChild)
});
edadCopyButton.addEventListener("click", function() {
  copyText(edadElement)
});

console.log(edad);

/*var i;
for(i=4;currentRow != null; i++){

  currentRow = table.rows[i];
  venc = currentRow.cells[4].firstChild.textContent;
  qrCell = document.createElement("td");
  if(venc == "  "){
    benef = currentRow.cells[1].textContent;
    cod = currentRow.cells[2].textContent;
    qrsrc = "https://chart.googleapis.com/chart?chs=100x100&cht=qr&chl="+benef.trim()+"-"+cod.trim();
    const qr = document.createElement("img");
    qrCell.appendChild(qr);
    qr.setAttribute("src",qrsrc);

  }
  currentRow.cells[4].insertAdjacentElement("afterend",qrCell);
}
*/