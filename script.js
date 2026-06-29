// ====== LISTA DE CANCIONES ======

const canciones = [

{
    titulo:"Quedate carca",
    artista:"Chustym",
    archivo:"music/cancion1.mp3"
},

{
    titulo:"Conmigo",
    artista:"Chustym X InÇo",
    archivo:"music/cancion2.mp3"
},

{
    titulo:"Fria pero mia",
    artista:"Chustym",
    archivo:"music/cancion3.mp3"
},

{
    titulo:"Canción 4",
    artista:"Artista 4",
    archivo:"music/cancion4.mp3"
}

];

// ====== ELEMENTOS ======

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

const actual = document.getElementById("actual");

const duracion = document.getElementById("duracion");

let indice = 0;

// ====== CREAR LISTA ======

function cargarLista(listaCanciones){

    lista.innerHTML="";

    listaCanciones.forEach((cancion,i)=>{

        const div=document.createElement("div");

        div.className="cancion";

        div.innerHTML=`

        <div class="infoCancion">

            <h3>${cancion.titulo}</h3>

            <p>${cancion.artista}</p>

        </div>

        <div class="playIcon">▶</div>

        `;

        div.onclick=()=>{

            indice=i;

            cargarCancion();

            audio.play();

            play.innerHTML="⏸";

        }

        lista.appendChild(div);

    });

}

// ====== CARGAR CANCIÓN ======

function cargarCancion(){

    audio.src=canciones[indice].archivo;

    titulo.innerHTML=canciones[indice].titulo;

    artista.innerHTML=canciones[indice].artista;

}

cargarLista(canciones);

cargarCancion();

// ====== PLAY ======

play.onclick=function(){

    if(audio.paused){

        audio.play();

        play.innerHTML="⏸";

    }else{

        audio.pause();

        play.innerHTML="▶";

    }

}

// ====== SIGUIENTE ======

siguiente.onclick=function(){

    indice++;

    if(indice>=canciones.length){

        indice=0;

    }

    cargarCancion();

    audio.play();

    play.innerHTML="⏸";

}

// ====== ANTERIOR ======

anterior.onclick=function(){

    indice--;

    if(indice<0){

        indice=canciones.length-1;

    }

    cargarCancion();

    audio.play();

    play.innerHTML="⏸";

}

// ====== BARRA ======

audio.addEventListener("loadedmetadata",()=>{

    barra.max=audio.duration;

    mostrarDuracion();

});

audio.addEventListener("timeupdate",()=>{

    barra.value=audio.currentTime;

    mostrarActual();

});

barra.oninput=function(){

    audio.currentTime=barra.value;

}

// ====== VOLUMEN ======

volumen.oninput=function(){

    audio.volume=volumen.value;

}

// ====== SIGUIENTE AUTOMÁTICO ======

audio.onended=function(){

    siguiente.click();

}

// ====== TIEMPOS ======

function mostrarActual(){

    let min=Math.floor(audio.currentTime/60);

    let seg=Math.floor(audio.currentTime%60);

    if(seg<10){

        seg="0"+seg;

    }

    actual.innerHTML=min+":"+seg;

}

function mostrarDuracion(){

    let min=Math.floor(audio.duration/60);

    let seg=Math.floor(audio.duration%60);

    if(seg<10){

        seg="0"+seg;

    }

    duracion.innerHTML=min+":"+seg;

}

// ====== BUSCADOR ======

buscar.addEventListener("keyup",()=>{

    const texto=buscar.value.toLowerCase();

    const resultado=canciones.filter(c=>

        c.titulo.toLowerCase().includes(texto) ||

        c.artista.toLowerCase().includes(texto)

    );

    cargarLista(resultado);

});