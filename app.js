let notyf = new Notyf();

function encryptCaesar(text, shift) {
  let encryptedText = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = char.charCodeAt(0);

    if (code >= 65 && code <= 90) {
      // Mayúsculas
      encryptedText += String.fromCharCode(
        ((((code - 65 + shift) % 26) + 26) % 26) + 65
      );
    } else if (code >= 97 && code <= 122) {
      // Minúsculas
      encryptedText += String.fromCharCode(
        ((((code - 97 + shift) % 26) + 26) % 26) + 97
      );
    } else {
      encryptedText += char;
    }
  }

  return encryptedText;
}

// Función para desencriptar usando Cifrado César
function decryptCaesar(text, shift) {
  return encryptCaesar(text, -shift);
}

// Función para manejar la encriptación al hacer clic en el botón "Encriptar"
function encrypt() {
  const inputText = document.getElementById("input-text").value.trim(); 

  if (!inputText) {
    notyf.error("Tienes que ingresar datos."); 
    return; 
  }

  const shift = Math.floor(Math.random() * 10) + 1;
  const encryptedText = encryptCaesar(inputText, shift);

  document.querySelector(".text").textContent = encryptedText;
  document.getElementById("input-text").value = "";
  document.querySelector(".text").setAttribute("data-shift", shift);
  document.querySelector(".no-found").style.display = "none";
  document.querySelector(".btn-copy").style.display = "inline-block";
}


function decrypt() {
  const textElement = document.querySelector(".text");
  const encryptedText = textElement.textContent;
  const shift = parseInt(textElement.getAttribute("data-shift"), 10);

  if (encryptedText && !isNaN(shift)) {
    const decryptedText = decryptCaesar(encryptedText, shift);
    textElement.textContent = decryptedText;
    document.getElementById("input-text").value = "";
  } else {
    notyf.error("No se encontró un texto encriptado válido.");
  }
}

function copyToClipboard() {
  const textContent = document.querySelector(".text").textContent;
  if (textContent) {
    navigator.clipboard
      .writeText(textContent)
      .then(() => {
        notyf.success("Texto copiado!");
      })
      .catch((err) => {
        notyf.error("Error al copiar el texto");
      });
  } else {
    notyf.error("No hay texto para copiar.");
  }
}


function validateInput() {
  const textarea = document.getElementById("input-text");
  const validText = textarea.value.toLowerCase().replace(/[^a-z\s]/g, "");
  textarea.value = validText;
}
