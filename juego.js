let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego () {
    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
    sectionSeleccionarAtaque.style.display = "none"

    let sectionReiniciar = document.getElementById("reiniciar")
    sectionReiniciar.style.display = "none"
    let botonMascotaJugador = document.getElementById("boton-mascota")
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.addEventListener("click", ataqueFuego)
    let botonAgua = document.getElementById("boton-agua")
    botonAgua.addEventListener("click", ataqueAgua)
    let botonTierra =  document.getElementById("boton-tierra")
    botonTierra.addEventListener("click", ataqueTierra)
    let botonReiniciar = document.getElementById("boton-reiniciar")
    botonReiniciar.addEventListener("click", reiniciarJuego)
}
function seleccionarMascotaJugador() {
    let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
    sectionSeleccionarMascota.style.display = "none"
    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
    sectionSeleccionarAtaque.style.display = "block"
    let inputRana = document.getElementById("Pepe")
    let inputPulpo = document.getElementById("Pedro")
    let inputPato = document.getElementById("Luis")
    let spanMascotaJugador = document.getElementById("mascota jugador")
    if (inputRana.checked) {
    spanMascotaJugador.innerHTML = "Pepe"
    } else if (inputPulpo.checked) {
    spanMascotaJugador.innerHTML = "Pedro"
    } else if (inputPato.checked) {
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
    ataqueJugador = "fuego"
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = "agua"
    ataqueAleatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = "tierra"
    ataqueAleatorioEnemigo()
}
function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)
    if (ataqueAleatorio == 1) {
    ataqueEnemigo = "fuego"
    } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "agua"
    } else {
    ataqueEnemigo = "tierra"
    }
    combate()
}
function combate() {
    let spanVidasJugador = document.getElementById("vidas-jugador")
    let spanVidasEnemigo = document.getElementById("vidas-enemigo")
    if(ataqueEnemigo == ataqueJugador) {
    crearMensaje("empate")
    } else if (ataqueJugador == "fuego" && ataqueEnemigo == "tierra") {
    crearMensaje("ganaste")
    vidasEnemigo--
    spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == "agua" && ataqueEnemigo === "fuego") {
    crearMensaje("ganaste")
    vidasEnemigo--
    spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == "tierra" && ataqueEnemigo === "agua") {
    crearMensaje("ganaste")  
    vidasEnemigo--
    spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
    crearMensaje("perdiste")
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
    let sectionMensajes = document.getElementById("mensajes")
    let parrafo =  document.createElement("p")
    parrafo.innerHTML = "Tu pollo ataco con " + ataqueJugador + ",El pollo del enemigo ataco con " + ataqueEnemigo + " " + resultado
    sectionMensajes.appendChild(parrafo)
}
function crearMensajeFinal(resultadoFinal) {
    let sectionMensajes = document.getElementById("mensajes")

    let parrafo =  document.createElement("p")
    parrafo.innerHTML = resultadoFinal

    sectionMensajes.appendChild(parrafo)
let botonFuego = document.getElementById("boton-fuego")
    botonFuego.disabled = true
    let botonAgua = document.getElementById("boton-agua")
    botonAgua.disabled = true
    let botonTierra =  document.getElementById("boton-tierra")
    botonTierra.disabled = true

    let sectionReiniciar = document.getElementById("reiniciar")
    sectionReiniciar.style.display = "block"
}
function reiniciarJuego() {
    location.reload()
}
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
window.addEventListener("load", iniciarJuego)