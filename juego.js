
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonTierra =  document.getElementById("boton-tierra")
const botonFuego = document.getElementById("boton-fuego")
const botonAgua = document.getElementById("boton-agua")
const botonReiniciar = document.getElementById("boton-reiniciar")
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const inputPepe = document.getElementById("Pepe")
const inputPedro = document.getElementById("Pedro")
const inputLuis = document.getElementById("Luis")
const spanMascotaJugador = document.getElementById("mascota jugador")
const spanMascotaEnemigo = document.getElementById("mascota del enemigo")
const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")
const sectionMensajes = document.getElementById("mensajes")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
let mokepones
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let vidasJugador = 3
let vidasEnemigo = 3
class Mokepon {
    constructor (nombre, foto, vidas) {
    this.nombre = nombre
    this.foto = foto
    this.vidas = vidas
    this.ataques = []
    }
}
let pepe = new Mokepon("pepe", "https://static5.depositphotos.com/1001911/443/v/600/depositphotos_4430873-stock-illustration-cute-chick.jpg", 5)

let pedro = new Mokepon("pedro", "https://st.depositphotos.com/1967477/2393/v/450/depositphotos_23937917-stock-illustration-cute-baby-chicken-cartoon.jpg", 5)

let luis = new Mokepon("luis", "https://st3.depositphotos.com/1000792/14512/v/600/depositphotos_145123113-stock-illustration-cartoon-duck-baby.jpg", 5)

pepe.ataques.push(
    { nombre: "💦", id: "boton-agua" },
    { nombre: "💦", id: "boton-agua" },
    { nombre: "💦", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🪴", id: "boton-tierra" }
)
pedro.ataques.push(
    { nombre: "🪴", id: "boton-tierra" },
    { nombre: "🪴", id: "boton-tierra" },
    { nombre: "🪴", id: "boton-tierra" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💦", id: "boton-agua" },
)
luis.ataques.push(
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💦", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🪴", id: "boton-tierra" },
)
mokepones.push(pepe,pedro,luis)
function iniciarJuego () {

    sectionSeleccionarAtaque.style.display = "none"
    mokepones.forEach((Mokepon) => {
    opcionDeMokepones = `
    <input type="radio" name="mascota" id=${Mokepon.nombre}>   
    <label class="tarjeta-de-mokepon" for=${Mokepon.nombre}>
    <p>${Mokepon.nombre}</p>
    <img src=${Mokepon.foto} alt=${Mokepon.nombre}></label>`
    contenedorTarjetas.innerHTML += opcionDeMokepones
    }
    )

    sectionReiniciar.style.display = "none"
    
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)
    botonReiniciar.addEventListener("click", reiniciarJuego)
}
function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = "none"
    sectionSeleccionarAtaque.style.display = "block"
    if (inputPepe.checked) {
    spanMascotaJugador.innerHTML = "Pepe"
    } else if (inputPedro.checked) {
    spanMascotaJugador.innerHTML = "Pedro"
    } else if (inputLuis.checked) {
    spanMascotaJugador.innerHTML = "Luis"
    } else {
    alert("selecciona alguna mascota")
    }
    seleccionarMascotaEnemigo()
}
function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(1, 3)
    let spanMascotaEnemigo = document.getElementById("mascota del enemigo")
    if (mascotaAleatorio == 1) {
    spanMascotaEnemigo.innerHTML = "Pepe" 
    } else if (mascotaAleatorio == 2) {
    spanMascotaEnemigo.innerHTML = "Pedro" 
    } else if (mascotaAleatorio ==  3) {
    spanMascotaEnemigo.innerHTML = "Luis" 
    }
    }
function ataqueFuego() {
    ataqueJugador = "FUEGO🔥"
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = "AGUA💦"
    ataqueAleatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = "TIERRA🪴"
    ataqueAleatorioEnemigo()
}
function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)
    if (ataqueAleatorio == 1) {
    ataqueEnemigo = "FUEGO🔥"
    } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "AGUA💦"
    } else {
    ataqueEnemigo = "TIERRA🪴"
    }
    combate()
}
function combate() {
    if(ataqueEnemigo == ataqueJugador) {
    crearMensaje(" EMPATE🤯")
    } else if (ataqueJugador == "fuego" && ataqueEnemigo == "tierra") {
    crearMensaje(" GANASTE🥳")
    vidasEnemigo--
    spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == "agua" && ataqueEnemigo === "fuego") {
    crearMensaje(" GANASTE🥳")
    vidasEnemigo--
    spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == "tierra" && ataqueEnemigo === "agua") {
    crearMensaje(" GANASTE🥳")  
    vidasEnemigo--
    spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
    crearMensaje(" PERDISTE❌")
    vidasJugador--
    spanVidasJugador.innerHTML = vidasJugador
    }
    revisarVidas ()
}
function revisarVidas() {
    if (vidasEnemigo == 0) {
    crearMensajeFinal("FELICITACIONES! GANASTE 🥳")
    } else if (vidasJugador == 0) {
    crearMensajeFinal("LO SIENTO, PERDISTE 🤯")
    }
}
function crearMensaje(resultado) {
    let parrafo =  document.createElement("p")
    let parrafoDos = document.createElement("p")
    let respuesta = document.createElement("p") 
    parrafo.innerHTML = "Tu pollo " + spanMascotaJugador.innerText+ " ataco con "  + ataqueJugador   
    parrafoDos.innerHTML = "El pollo " + spanMascotaEnemigo.innerText  + " del enemigo ataco con " + ataqueEnemigo
    respuesta.innerHTML = resultado
    sectionMensajes.appendChild(parrafo)
    sectionMensajes.appendChild(parrafoDos)
    sectionMensajes.appendChild(respuesta)

}
function crearMensajeFinal(resultadoFinal) {
    let parrafo =  document.createElement("p")
    parrafo.innerHTML = resultadoFinal
    sectionMensajes.appendChild(parrafo)
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    sectionReiniciar.style.display = "block"
}
function reiniciarJuego() {
    location.reload()
}
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
    window.addEventListener("load", iniciarJuego)