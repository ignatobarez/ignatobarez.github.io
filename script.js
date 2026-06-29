const canciones=[{titulo:'Canción 1',artista:'Artista',archivo:'music/cancion1.mp3',portada:'img/album1.jpg'}];
const audio=document.getElementById('audio'),lista=document.getElementById('listaCanciones');
const play=document.getElementById('play');
function render(){lista.innerHTML='';canciones.forEach((c)=>{let d=document.createElement('div');d.className='cancion';d.textContent=c.titulo+' - '+c.artista;d.onclick=()=>{audio.src=c.archivo;document.getElementById('titulo').textContent=c.titulo;document.getElementById('artista').textContent=c.artista;document.getElementById('cover').src=c.portada;audio.play();play.textContent='⏸'};lista.appendChild(d);});}
render();
play.onclick=()=>{if(audio.paused){audio.play();play.textContent='⏸';}else{audio.pause();play.textContent='▶';}};
document.getElementById('volumen').oninput=e=>audio.volume=e.target.value;
