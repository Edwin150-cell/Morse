import './style.css';

const morseAlfabeto = {
    'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',   'E': '.',
    'F': '..-.',  'G': '--.',   'H': '....',  'I': '..',    'J': '.---',
    'K': '-.-',   'L': '.-..',  'M': '--',    'N': '-.',    'O': '---',
    'P': '.--.',  'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-',
    'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',  'Y': '-.--',
    'Z': '--..',  '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    '0': '-----', ' ': '/'
};

const textoAlfabeto = {};
for (let letra in morseAlfabeto) {
    let codigo = morseAlfabeto[letra];
    textoAlfabeto[codigo] = letra;
}

const btnCambiarModo = document.getElementById('btnCambiarModo');
const etiquetaEntrada = document.getElementById('etiquetaEntrada');
const textoEntrada = document.getElementById('textoEntrada');
const textoSalida = document.getElementById('textoSalida');
const btnTraducir = document.getElementById('btnTraducir');
const btnBorrar = document.getElementById('btnBorrar');

let modoTextoAMorse = true;

btnCambiarModo.addEventListener('click', () => {
    modoTextoAMorse = !modoTextoAMorse;
    textoEntrada.value = '';
    textoSalida.value = '';

    if (modoTextoAMorse) {
        btnCambiarModo.innerText = "Modo: Texto a Morse";
        etiquetaEntrada.innerText = "Escribe tu texto aquí:";
        textoEntrada.placeholder = "Escribe algo...";
    } else {
        btnCambiarModo.innerText = "Modo: Morse a Texto";
        etiquetaEntrada.innerText = "Escribe el código morse (solo . - / y espacios):";
        textoEntrada.placeholder = ".-.. .--. ...";
    }
});

textoEntrada.addEventListener('input', () => {
    if (!modoTextoAMorse) {
        let textoActual = textoEntrada.value;
        let textoFiltrado = textoActual.replace(/[^.\-\/\s]/g, '');
        if (textoActual !== textoFiltrado) {
            textoEntrada.value = textoFiltrado;
        }
    }
});

btnTraducir.addEventListener('click', () => {
    let entrada = textoEntrada.value.trim();

    if (entrada === "") {
        alert("Por favor, escribe algo para traducir.");
        return;
    }

    let resultadoFinal = "";

    if (modoTextoAMorse) {
        let textoMayuscula = entrada.toUpperCase();
        for (let i = 0; i < textoMayuscula.length; i++) {
            let caracter = textoMayuscula[i];
            if (morseAlfabeto[caracter]) {
                resultadoFinal += morseAlfabeto[caracter] + " ";
            } else {
                resultadoFinal += "? ";
            }
        }
    } else {
        let palabrasMorse = entrada.split(" ");
        for (let i = 0; i < palabrasMorse.length; i++) {
            let codigo = palabrasMorse[i];
            if (textoAlfabeto[codigo]) {
                resultadoFinal += textoAlfabeto[codigo];
            } else if (codigo === "/") {
                resultadoFinal += " ";
            } else if (codigo === "") {
                continue;
            } else {
                resultadoFinal += "?";
            }
        }
    }

    textoSalida.value = resultadoFinal;
});

btnBorrar.addEventListener('click', () => {
    textoEntrada.value = '';
    textoSalida.value = '';
});