
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-del-enemigo")
const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")
const sectionMensajes = document.getElementById("mensajes")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedor-ataques")
let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let inputPepe
let inputPedro
let inputLuis
let mascotaJugador
let ataquesMokepon
let botonFuego
let botonAgua
let botonTierra
let botones = []
let ataqueJugador = [] 
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
let pepe = new Mokepon("Pepe", "https://static5.depositphotos.com/1001911/443/v/600/depositphotos_4430873-stock-illustration-cute-chick.jpg", 5)
let pedro = new Mokepon("Pedro", "https://st.depositphotos.com/1967477/2393/v/450/depositphotos_23937917-stock-illustration-cute-baby-chicken-cartoon.jpg", 5)
let luis = new Mokepon("Luis", "https://st3.depositphotos.com/1000792/14512/v/600/depositphotos_145123113-stock-illustration-cartoon-duck-baby.jpg", 5)

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

    mokepones.forEach((mokepon) => {
            opcionDeMokepones = `
            <input type="radio" name="mascota" id=${mokepon.nombre} />   
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre} >
            <p>${mokepon.nombre} </p>
            <img src=${mokepon.foto} alt=${mokepon.nombre} ></label>`
            contenedorTarjetas.innerHTML += opcionDeMokepones

            inputPepe = document.getElementById("Pepe")
            inputPedro = document.getElementById("Pedro")
            inputLuis = document.getElementById("Luis")
        }

    )

    sectionReiniciar.style.display = "none"
    
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    botonReiniciar.addEventListener("click", reiniciarJuego)
}
function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = "none"
    sectionSeleccionarAtaque.style.display = "block"

    if (inputPepe.checked) {
    spanMascotaJugador.innerHTML = inputPepe.id
    mascotaJugador = inputPepe.id
    } else if (inputPedro.checked) {
    spanMascotaJugador.innerHTML = inputPedro.id
    mascotaJugador = inputPedro.id
    } else if (inputLuis.checked) {
    spanMascotaJugador.innerHTML = inputLuis.id
    mascotaJugador = inputPedro.id
    } else {
    alert("selecciona alguna mascota")
    }
    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}
function extraerAtaques(mascotaJugador) {
let ataques
for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
        ataques = mokepones[i].ataques
    }
}
mostrarAtaques(ataques)
} 
function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>`
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua") 
    botonTierra = document.getElementById("boton-tierra") 
    botones = document.querySelectorAll(".BAtaque")
console.log(botones)
    botonFuego.addEventListener("click",ataqueFuego)
    botonAgua.addEventListener("click",ataqueAgua)
    botonTierra.addEventListener("click",ataqueTierra)
    

}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click",(e) => {
            if (e.target.textcontent === "🔥" ) {

            }
        })
    })
}



function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length -1)
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    secuenciaAtaque()
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
