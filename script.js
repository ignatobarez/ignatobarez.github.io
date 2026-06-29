

const canciones = [
    {
        titulo: "Pegado a tu piel",
        artista: "Chustym",
        archivo: "music/cancion1.mp3",
        portada: "img/album1.jpg"
    },
    {
        titulo: "Conmigo",
        artista: "Chustym X Inço",
        archivo: "music/cancion2.mp3",
        portada: "img/album2.jpg"
    },
    {
        titulo: "Fria pero mia",
        artista: "Chustym",
        archivo: "music/cancion3.mp3",
        portada: "img/album3.jpg"
    },
    {
        titulo: "Pròximamente",
        artista: "xxxxx X xxxx",
        archivo: "music/cancion4.mp3",
        portada: "img/album4.jpg"
    }
];

const audio = document.getElementById("audio");
const lista = document.getElementById("listaCanciones");
const play = document.getElementById("play");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");
const barra = document.getElementById("barra");
const volumen = document.getElementById("volumen");
const buscar = document.getElementById("buscar");

const titulo = document.getElementById("titulo");
const artista = document.getElementById("artista");
const cover = document.getElementById("cover");

const actual = document.getElementById("actual");
const duracion = document.getElementById("duracion");

const equalizer = document.getElementById("equalizer");

let indice = 0;

// ============================
// LISTA
// ============================

function cargarLista(listaCanciones){

    lista.innerHTML = "";

    listaCanciones.forEach(cancion=>{

        const indiceOriginal = canciones.indexOf(cancion);

        const div = document.createElement("div");

        div.className = "cancion";

        if(indiceOriginal === indice){
            div.classList.add("activa");
        }

        div.innerHTML = `
            <img
                src="${cancion.portada}"
                class="mini ${indiceOriginal===indice?'reproduciendo':''}"
            >

            <div class="infoCancion">
                <h3>${cancion.titulo}</h3>
                <p>${cancion.artista}</p>
            </div>

            <div class="playIcon">▶</div>
        `;

        div.onclick = ()=>{

            indice = indiceOriginal;

            cargarCancion();

            cargarLista(canciones);

            audio.play();

            play.innerHTML = "⏸";

        };

        lista.appendChild(div);

    });

}

// ============================
// CARGAR CANCIÓN
// ============================

function cargarCancion(){

    audio.src = canciones[indice].archivo;

    titulo.textContent = canciones[indice].titulo;

    artista.textContent = canciones[indice].artista;

    cover.src = canciones[indice].portada;

}

// ============================

cargarLista(canciones);

cargarCancion();

// ============================
// PLAY
// ============================

play.onclick = ()=>{

    if(audio.paused){

        audio.play();

        play.innerHTML="⏸";

    }else{

        audio.pause();

        play.innerHTML="▶";

    }

};

// ============================
// SIGUIENTE
// ============================

function siguienteCancion(){

    indice++;

    if(indice>=canciones.length){

        indice=0;

    }

    cargarCancion();

    cargarLista(canciones);

    audio.play();

    play.innerHTML="⏸";

}

// ============================
// ANTERIOR
// ============================

function anteriorCancion(){

    indice--;

    if(indice<0){

        indice=canciones.length-1;

    }

    cargarCancion();

    cargarLista(canciones);

    audio.play();

    play.innerHTML="⏸";

}

siguiente.onclick = siguienteCancion;

anterior.onclick = anteriorCancion;

// ============================
// BARRA
// ============================

audio.addEventListener("loadedmetadata",()=>{

    barra.max = audio.duration;

    mostrarDuracion();

});

audio.addEventListener("timeupdate",()=>{

    barra.value = audio.currentTime;

    mostrarActual();

});

barra.oninput = ()=>{

    audio.currentTime = barra.value;

};

// ============================
// VOLUMEN
// ============================

volumen.oninput = ()=>{

    audio.volume = volumen.value;

};

// ============================
// ECUALIZADOR
// ============================

audio.addEventListener("play",()=>{

    play.innerHTML="⏸";

    if(equalizer){

        equalizer.classList.add("activo");

    }

});

audio.addEventListener("pause",()=>{

    play.innerHTML="▶";

    if(equalizer){

        equalizer.classList.remove("activo");

    }

});

audio.addEventListener("ended",()=>{

    if(equalizer){

        equalizer.classList.remove("activo");

    }

    siguienteCancion();

});

// ============================
// TIEMPOS
// ============================

function mostrarActual(){

    let min = Math.floor(audio.currentTime/60);

    let seg = Math.floor(audio.currentTime%60);

    if(seg<10) seg="0"+seg;

    actual.textContent = `${min}:${seg}`;

}

function mostrarDuracion(){

    let min = Math.floor(audio.duration/60);

    let seg = Math.floor(audio.duration%60);

    if(seg<10) seg="0"+seg;

    duracion.textContent = `${min}:${seg}`;

}

// ============================
// BUSCADOR
// ============================

buscar.addEventListener("keyup",()=>{

    const texto = buscar.value.toLowerCase();

    const resultado = canciones.filter(c=>{

        return c.titulo.toLowerCase().includes(texto) ||
               c.artista.toLowerCase().includes(texto);

    });

    cargarLista(resultado);

});
