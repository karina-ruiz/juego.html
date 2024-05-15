
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
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")
let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputPepe
let inputPedro
let inputLuis
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackground = new Image()
mapaBackground.src = "https://img.freepik.com/vector-premium/paisaje-escena-granja-granero_1308-97467.jpg"
class Mokepon {
    constructor (nombre, foto, vidas,) {
    this.nombre = nombre    
    this.foto = foto
    this.vidas = vidas
    this.ataques = []
    this.x = 20
    this.y = 30
    this.ancho = 80
    this.alto = 80
    this.mapaFoto = new Image() 
    this.mapaFoto.src = foto
    this.velocidadX = 0
    this.velocidadY = 0
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}
let pepe = new Mokepon("Pepe", "https://static5.depositphotos.com/1001911/443/v/600/depositphotos_4430873-stock-illustration-cute-chick.jpg", 5)
let pedro = new Mokepon("Pedro", "https://st.depositphotos.com/1967477/2393/v/450/depositphotos_23937917-stock-illustration-cute-baby-chicken-cartoon.jpg", 5)
let luis = new Mokepon("Luis", "https://st3.depositphotos.com/1000792/14512/v/600/depositphotos_145123113-stock-illustration-cartoon-duck-baby.jpg", 5)

let pepeEnemigo = new Mokepon("Pepe", "https://static5.depositphotos.com/1001911/443/v/600/depositphotos_4430873-stock-illustration-cute-chick.jpg", 5, 80, 120)
let pedroEnemigo = new Mokepon("Pedro", "https://st.depositphotos.com/1967477/2393/v/450/depositphotos_23937917-stock-illustration-cute-baby-chicken-cartoon.jpg", 5, 150, 95)
let luisEnemigo = new Mokepon("Luis", "https://st3.depositphotos.com/1000792/14512/v/600/depositphotos_145123113-stock-illustration-cartoon-duck-baby.jpg", 5, 200, 190)

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
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💦", id: "boton-agua" },
    { nombre: "🪴", id: "boton-tierra" },
)
mokepones.push(pepe,pedro,luis)

function iniciarJuego () {

    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"
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


    //sectionSeleccionarAtaque.style.display = "flex"

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
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
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
}
function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("fuego🔥")
                console.log(ataqueJugador)
                boton.style.background = "#DDE94A"
                boton.disabled = true
            } else if (e.target.textContent === "💦") {
                ataqueJugador.push("agua💦")
                console.log(ataqueJugador)
                boton.style.background = "#DDE94A"
                boton.disabled = true
            } else {
                ataqueJugador.push("tierra🪴")
                console.log(ataqueJugador)
                boton.style.background = "#DDE94A"
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()        
        })
    })
}
function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length -1)

        spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
        ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
        secuenciaAtaque()
    }

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
        ataqueEnemigo.push("fuego🔥")
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push("agua💦")
    } else {
        ataqueEnemigo.push("tierra🪴")
    }
        console.log(ataqueEnemigo)
    iniciarPelea()
}
function iniciarPelea() {
    if(ataqueJugador.length === 5) {
        combate()
    }
}
function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo] 
}
function combate() {

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === "fuego🔥" && ataqueEnemigo[index] === "tierra🪴") {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index] === "agua💦" && ataqueEnemigo[index] === "fuego🔥"){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === "tierra🪴" && ataqueEnemigo[index] === "agua💦") {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML =  victoriasEnemigo
        }
    } 
    revisarVidas()
}
function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("ESTO FUE UN EMPATE!🥳")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES GANASTE!")
    } else {
        crearMensaje("LO SIENTO,PERDISTE")
    }
    
}
function crearMensaje(resultado) {
    let parrafo =  document.createElement("p")
    let parrafoDos = document.createElement("p")
    let respuesta = document.createElement("p") 
        parrafo.innerHTML = "Tu pollo " + spanMascotaJugador.innerText + " ataco con "  + indexAtaqueJugador  
        parrafoDos.innerHTML = "El pollo " + spanMascotaEnemigo.innerText  + " del enemigo ataco con " + indexAtaqueEnemigo
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
function pintarCanvas() {
    mascotaJugadorObjeto.x =  mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y =  mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY  
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    pepeEnemigo.pintarMokepon
    pedroEnemigo.pintarMokepon
    luisEnemigo.pintarMokepon   
}
function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = - 5
}
function  moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}
function moverArriba() {
    mascotaJugadorObjeto.velocidadY = - 5
}
function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}
function sePrecionoUnaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break;
        case "ArrowDown":
            moverAbajo()
            break;
        case "ArrowLeft":
            moverIzquierda()
            break;
        case "ArrowRight":
            moverDerecha()
            break;
        default:
            break;
    }
}
function iniciarMapa() {
    mapa.width = 800
    mapa.height = 600
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    window.addEventListener("keydown", sePrecionoUnaTecla)

    window.addEventListener("keyup", detenerMovimiento)
}
function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
        return mokepones[i]
    }
}
}
window.addEventListener("load", iniciarJuego)