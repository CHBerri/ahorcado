//Declarar un objeto que tenga lo siguiente

const palabras = [
    {
        palabra: ['i','n','t','r','í','n','s','e','c','o'],
        definicion: 'Que es propio o característico de la cosa que se expresa por sí misma y no depende de las circunstancias.'
    },
    {
        palabra: ['a', 'u', 'r', 'o', 'r', 'a'],
        definicion: 'Luz sonrosada que precede inmediatamente a la salida del sol.'
    },
    {
        palabra: ['b','e','l','d','a','d'],
        definicion: 'Luz sonrosada que precede inmediatamente a la salida del sol.'
    },
    {
        palabra: ['c','a','l','e','i','d','o','s','c','o','p','i','o'],
        definicion: 'Conjunto diverso y cambiante.'
    },
    {
        palabra: ['c','o','m','p','a','s','i','ó','n'],
        definicion: 'Sentimiento de pena, de ternura y de identificación ante los males de alguien.'
    },
    {
        palabra: ['e','s','p','e','r','a','n','z','a'],
        definicion: 'Estado de ánimo que surge cuando se presenta como alcanzable lo que se desea.'
    },
    {
        palabra: ['e','l','o','c','u','e','n','c','i','a'],
        definicion: 'Facultad de hablar o escribir de modo eficaz para deleitar, conmover o persuadir.'
    },    
    {
        palabra: ['e','f','í','m','e','r','o'],
        definicion: 'Pasajero, de corta duración.'
    },    
    {
        palabra: ['i','n','e','f','a','b','l','e'],
        definicion: 'Que no se puede explicar con palabras.'
    },   
    {
        palabra: ['i','n','c','o','n','m','e','n','s','u','r','a','b','l','e'],
        definicion: 'Enorme, que por su gran magnitud no puede medirse.'
    },   
 ];

const p = document.querySelector('#palabraSecreta');
const input = document.querySelector('INPUT');
const boton = document.querySelector('#try');
const boton2 = document.querySelector('#retry');
const cerrar = document.querySelector('#cerrar');
const imagenes = document.querySelector('#images')
const letrasUsadas = document.querySelector('#lista')   // Referencia al parrafo donde se acumularán las letras usadas
const mensajes = document.querySelector('#mensajes')    // Padre del parrafo donde se acumularán las letras usadas
const vidas_label = document.querySelector('#life')
const ventana = document.querySelector('#ventana')      // Ventana derrota
const ventana2 = document.querySelector('#ventana2')    // Ventana victoria
const ventana3 = document.querySelector('#ventana3')    // Ventana victoria
const palabrota = document.querySelector('#palabrota')
const perdedor = document.querySelector('#perdedor')
const definicion = document.querySelector('#definicion')
let audio = new Audio('mr increible 1.mp3')
window.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' && input.value != '') {
        buscarLetra()
    }
})
let letra2 = ''
let audios = 1
let seleccion = 0
let nivelDePerdicion = 1
let vidas = 5
let palabraBuscada = []
let palabraOculta = []
let letrasFallidas = []

vidas_label.textContent = `Vidas: ${vidas}`;

function generarPalabras() {

    if(palabras.length == 0) {
        ventana3.style.display = "flex"
        audio.src = 'Sakamoto theme.mp3'
        audio.play()
    } else {
        seleccion = Math.floor((Math.random() * palabras.length)); // genera un numero dentro del rango del tamaño del arreglo
        palabraBuscada = palabras[seleccion].palabra;
    
        for (let i = 0; i < palabraBuscada.length; i++) {
            palabraOculta.push("_");
        }
        
        p.textContent = palabraOculta.join("");
    
        input.focus()
        input.value = ""
    }

}

generarPalabras();

boton.addEventListener('click', buscarLetra);

boton2.addEventListener('click', reiniciarJuego);

cerrar.addEventListener('click', () => {
    
    ventana2.style.display = 'none'     // Ventana de la victoria
    audios = 1
    audio.src = `mr increible ${audios}.mp3`
    audio.play()
    input.focus()
})


function reiniciarJuego() {
    ventana.style.display = 'none'      // Ventana donde pierdes
    reiniciaValores()
    generarPalabras()
    input.focus()
}


function reiniciaValores() {
    letrasUsadas.textContent = ""
    letrasFallidas = []
    palabraOculta = []
    nivelDePerdicion = 1
    vidas = 5
    audios = 1
    audio.src = `mr increible ${audios}.mp3`
    vidas_label.textContent = `Vidas: ${vidas}`
    imagenes.style.background = `url('mr increible ${nivelDePerdicion}.png')`
    imagenes.style.backgroundSize = 'contain'
    imagenes.style.backgroundPosition = 'center'
    imagenes.style.backgroundRepeat = 'no-repeat'
    input.focus()
}

function buscarLetra() {

    if(input.value == "") {
        console.log('Introduce una letra')
    } else {
        let letra = input.value.toLowerCase();
    
        switch(letra) {
            case 'a':
                letra2 = 'á'
                break;
            case 'e':
                letra2 = 'é'
                break;
            case 'i':
                letra2 = 'í'
                break;
            case 'o':
                letra2 = 'ó'
                break;
            case 'u':
                letra2 = 'ú'
                break;
            default:
                break;
        }
    
        if(palabraBuscada.includes(letra) || palabraBuscada.includes(letra2)) {
            palabraBuscada.forEach( function (element, index) {     // Revisa cada letra de la palabra actual
                if(palabraBuscada[index] == letra) {                // En caso de que la letra seleccionada se encuentre, la reemplaza
                    palabraOculta[index] = letra
                }
                if(palabraBuscada[index] == letra2) {
                    palabraOculta[index] = letra2
                }
            }) 
    
            if(!palabraOculta.includes("_") && vidas != 0) {        // Si la palabra ya se encontró y aun tiene vidas, reinicia el juego
                ventana2.style.display = 'flex'
                palabrota.textContent = palabraBuscada.join("")
                definicion.textContent = palabras[seleccion].definicion
                audio.src = 'correcto.mp3'
                audio.play()
                palabras.splice(seleccion, 1)
                reiniciaValores();
                generarPalabras();
                input.focus()
                return
            } 
        } else {                                                    //Cambia las imagenes y agrega las letras no encontradas
            nivelDePerdicion++                                      // Cada vez que se falla una vida
            vidas--
            vidas_label.textContent = `Vidas: ${vidas}`
            audios++
            audio.src = `mr increible ${audios}.mp3`
            audio.play()
            imagenes.style.background = `url('mr increible ${nivelDePerdicion}.png')`
            imagenes.style.backgroundSize = 'contain'
            imagenes.style.backgroundPosition = 'center'
            imagenes.style.backgroundRepeat = 'no-repeat'
            letrasFallidas.push(letra)
            letrasUsadas.textContent = letrasFallidas.join(", ") 
    
            if(vidas == 0) {                                                  // If que indica si ya perdió
                ventana.style.display = 'flex'
                perdedor.textContent = '¡Perdiste! \nla palabra era: ' + palabras[seleccion].palabra.join("")
            }
        }
        
        p.textContent = palabraOculta.join("");
        input.focus()
        input.value = ""
    }



} 
