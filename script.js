const cifrar_texto = document.querySelector("#encriptar-texto");
const decifrar_texto = document.querySelector("#desencripar-texto");

const matriz_llaves = [
    ["e", "enter"], //Indice 0
    ["i", "imes"],  //Indice 1
    ["a", "ai"],    //Indice 2
    ["o", "ober"],  //Indice 3
    ["u", "ufat"],  //Indice 4
];

// FUNCIONES CIFRADO

function btnEncriptar(){
    const miBoton = document.getElementById("desencriptar");
    const expresionRegular = /^[a-z.?! ,]+$/;
    
    if(cifrar_texto.value.trim() == ''){

        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Ingrese una frase o palabra para poder cifrar",
            showConfirmButton: false,
            timer: 1500
        });

    }else if (expresionRegular.test(cifrar_texto.value)){
        const texto =  Cifrar(cifrar_texto.value);
        decifrar_texto.value = texto;

        //ALERTA
        Swal.fire({
            position: "center",
            icon: "success",
            title: "El formato es el correcto!!!!",
            showConfirmButton: false,
            timer: 1500
        });

            // Verifica si el campo de texto tiene algún texto
        if (decifrar_texto.value.trim() !== '') {
            miBoton.disabled = false; // Habilita el botón
            document.getElementById('desencriptar').style.display = "block";
            document.getElementById('alerta').style.display = "none";
        } else {
            miBoton.disabled = true; // Deshabilita el botón si no hay texto
        }
    } else {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "El formato es incorrecto, solo se aceptan minusculas, sin acentos: " + cifrar_texto.value,
            showConfirmButton: false,
            timer: 1500
        });
    }

    
}

function Cifrar(fraseCifrada){
    for(let i = 0; i < matriz_llaves.length; i++){
        if(fraseCifrada.includes(matriz_llaves[i][0])){
            fraseCifrada = fraseCifrada.replaceAll(
                matriz_llaves[i][0],
                matriz_llaves[i][1]
            );
        }
    }
    return fraseCifrada;
}


// FUNCIONES DESCIFRADO

function btnDesencripatar(){
    const texto =  Descifrar(cifrar_texto.value);
    decifrar_texto.value = texto;
}

function Descifrar(fraseCifrada) {
    let matriz_llavesR =  [...matriz_llaves].reverse();
    for (let i = 0; i < matriz_llavesR.length; i++) {
        if (fraseCifrada.includes(matriz_llavesR[i][0])) {
            fraseCifrada = fraseCifrada.replaceAll(
                matriz_llavesR[i][1],
                matriz_llavesR[i][0]
            );
        }
    }
    return fraseCifrada;
}

//FUNCION COPIAR

function copiar() {
    var textoResultado = document.querySelector("#desencripar-texto");
    
    if (decifrar_texto.value.trim() == ''){
        Swal.fire({
            position: "center",
            icon: "question",
            title: 'No se ha encontrado texto para copiar...',
            showConfirmButton: false,
            timer: 1500
        });
    }else{
        // Selecciona el texto dentro del textarea
        textoResultado.select();
        textoResultado.setSelectionRange(0, 99999); // Para dispositivos móviles

        // Copia el texto al portapapeles
        document.execCommand('copy');

        // Deselecciona el texto
        window.getSelection().removeAllRanges();

        //alert('Texto copiado al portapapeles: ' + textoResultado.value);

        Swal.fire({
            position: "center",
            icon: "success",
            title: 'Texto copiado al portapapeles: ' + textoResultado.value,
            showConfirmButton: false,
            timer: 1500
        });
    }
    
}