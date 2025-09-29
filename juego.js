
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

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
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
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}
alturaQueBuscamos = anchoDelMapa * 900 / 900
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos
class Mokepon {
    constructor (nombre, foto, vidas, fotoMapa, id = null) {
    this.id = id
    this.nombre = nombre    
    this.foto = foto
    this.vidas = vidas
    this.ataques = []
    this.ancho = 80
    this.alto = 80
    this.x = aleatorio(0, mapa.width - this.ancho)
    this.y = aleatorio(0, mapa.height - this.alto)
    this.mapaFoto = new Image() 
    this.mapaFoto.src = fotoMapa
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
let pepe = new Mokepon("Pepe", "https://st5.depositphotos.com/1763191/65873/v/600/depositphotos_658735700-stock-illustration-adorable-little-duck-isolated-illustration.jpg", 5, "https://st5.depositphotos.com/1763191/65873/v/600/depositphotos_658735700-stock-illustration-adorable-little-duck-isolated-illustration.jpg")
let pedro = new Mokepon("Pedro", "https://st4.depositphotos.com/4296351/26551/v/600/depositphotos_265513870-stock-illustration-yellow-chicken-cartoon-illustration-cartoon.jpg", 5, "https://st4.depositphotos.com/4296351/26551/v/600/depositphotos_265513870-stock-illustration-yellow-chicken-cartoon-illustration-cartoon.jpg")
let luis = new Mokepon("Luis", "https://st2.depositphotos.com/1967477/8596/v/600/depositphotos_85967820-stock-illustration-cute-baby-duck-hand-waving.jpg", 5, "https://st2.depositphotos.com/1967477/8596/v/600/depositphotos_85967820-stock-illustration-cute-baby-duck-hand-waving.jpg")

const PEPE_ATAQUES = [
    { nombre: "💦", id: "boton-agua" },
    { nombre: "💦", id: "boton-agua" },
    { nombre: "💦", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🪴", id: "boton-tierra" },
]

pepe.ataques.push(...PEPE_ATAQUES)

const PEDRO_ATAQUES = [
    { nombre: "🪴", id: "boton-tierra" },
    { nombre: "🪴", id: "boton-tierra" },
    { nombre: "🪴", id: "boton-tierra" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💦", id: "boton-agua" },
]
pedro.ataques.push(...PEDRO_ATAQUES)

const LUIS_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💦", id: "boton-agua" },
    { nombre: "🪴", id: "boton-tierra" },]
luis.ataques.push(...LUIS_ATAQUES)

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

        unirseAlJuego()
}
function unirseAlJuego() {
    fetch ("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
} 
function seleccionarMascotaJugador() {

        if (inputPepe.checked) {
            spanMascotaJugador.innerHTML = inputPepe.id
            mascotaJugador = inputPepe.id
        } else if (inputPedro.checked) {
            spanMascotaJugador.innerHTML = inputPedro.id
            mascotaJugador = inputPedro.id
        } else if (inputLuis.checked) {
            spanMascotaJugador.innerHTML = inputLuis.id
            mascotaJugador = inputLuis.id
        } else {
            alert("selecciona alguna mascota")
            return
        }

        sectionSeleccionarMascota.style.display = "none"
        seleccionarMokepon(mascotaJugador)

        extraerAtaques(mascotaJugador)
        sectionVerMapa.style.display = "flex"
        iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({  
            mokepon: mascotaJugador
        })
    })
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
            if (ataqueJugador.length === 5){
                 enviarAtaques() 
            }       
        })
    })
}

function enviarAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 5000)
}
function obtenerAtaques() {
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ ataques }) {
                        if(ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                })
        }
    })
}
function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
        ataquesMokeponEnemigo = enemigo.ataques
        secuenciaAtaque()
}
function ataqueAleatorioEnemigo () {
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length-1)
    if(ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if 
        (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
            ataqueEnemigo.push('AGUA')
        } else {
            ataqueEnemigo.push('TIERRA')
        } 
        console.log(ataqueEnemigo)
        iniciarPelea()
}
function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}
function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo] 
}
function combate() {
    clearInterval(intervalo)

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
function crearMensaje(mensajes) {
    let parrafo =  document.createElement("p")
    let parrafoDos = document.createElement("p")
    let respuesta = document.createElement("p") 
        parrafo.innerHTML = "Tu pollo " + spanMascotaJugador.innerText + " ataco con "  + indexAtaqueJugador  
        parrafoDos.innerHTML = "El pollo " + spanMascotaEnemigo.innerText  + " del enemigo ataco con " + indexAtaqueEnemigo
        respuesta.innerHTML = mensajes
        sectionMensajes.appendChild(parrafo)
        sectionMensajes.appendChild(parrafoDos)
        sectionMensajes.appendChild(respuesta)

}
function crearMensajeFinal(resultadoFinal) {
    let parrafo =  document.createElement("p")
        parrafo.innerHTML = resultadoFinal
        sectionMensajes.appendChild(parrafo)
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
    
        enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
        
        mokeponesEnemigos.forEach(function (mokepon) {
             mokepon.pintarMokepon()
             revisarColision(mokepon)
})
}
function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })

    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Pepe") {
                            mokeponEnemigo = new Mokepon("Pepe", "https://st5.depositphotos.com/1763191/65873/v/600/depositphotos_658735700-stock-illustration-adorable-little-duck-isolated-illustration.jpg", 5,  "https://static5.depositphotos.com/1001911/443/v/600/depositphotos_4430873-stock-illustration-cute-chick.jpg", enemigo.id)
                        } else if (mokeponNombre === "Pedro") {
                            mokeponEnemigo = new Mokepon("Pedro", "https://st4.depositphotos.com/4296351/26551/v/600/depositphotos_265513870-stock-illustration-yellow-chicken-cartoon-illustration-cartoon.jpg", 5, "https://st.depositphotos.com/1967477/2393/v/450/depositphotos_23937917-stock-illustration-cute-baby-chicken-cartoon.jpg", enemigo.id)
                        } else if (mokeponNombre === "Luis") {
                            mokeponEnemigo = new Mokepon("Luis", "https://st2.depositphotos.com/1967477/8596/v/600/depositphotos_85967820-stock-illustration-cute-baby-duck-hand-waving.jpg", 5, "https://st3.depositphotos.com/1000792/14512/v/600/depositphotos_145123113-stock-illustration-cartoon-duck-baby.jpg", enemigo.id)
                        }

                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo
                    })

                })
        }
    })
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
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
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
function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = 
        mascotaJugadorObjeto.y
    const abajoMascota = 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = 
        mascotaJugadorObjeto.x  
    if ( 
        abajoMascota < arribaEnemigo || 
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo 
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("se detecto una colision")
    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = "block"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
}
window.addEventListener("load", iniciarJuego)