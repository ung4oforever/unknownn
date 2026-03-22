// --- ELEMENTOS DEL DOM ---
const cursor = document.querySelector('.custom-cursor');
const audioPlayer = document.getElementById('music-player');
const playPauseBtn = document.getElementById('play-pause');
const progressFill = document.getElementById('progress-fill');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const discIcon = document.getElementById('music-logo');
const volSlider = document.getElementById('volume-slider');

// --- 1. MOUSE: CURSOR Y DESTELLOS ---
document.addEventListener('mousemove', (e) => {
    // Mover el punto principal
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    // Crear destello
    createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    // Posición inicial
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    // Variación de tamaño aleatoria
    const size = Math.random() * 5 + 2;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';

    document.body.appendChild(sparkle);

    // Eliminar después de la animación
    setTimeout(() => {
        sparkle.remove();
    }, 800);
}

// --- 2. ENTRADA AL SITIO ---
function enterSite() {
    const entry = document.getElementById('entry-screen');
    entry.style.opacity = '0';
    
    setTimeout(() => {
        entry.style.display = 'none';
        document.getElementById('main-content').style.opacity = '1';
        
        // Iniciar música automáticamente al entrar
        audioPlayer.play().catch(err => console.log("Auto-play prevenido por el navegador"));
        updatePlayIcon(true);
    }, 1000);
}

// --- 3. REPRODUCTOR DE MÚSICA ---
function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        updatePlayIcon(true);
    } else {
        audioPlayer.pause();
        updatePlayIcon(false);
    }
}

function updatePlayIcon(isPlaying) {
    if (isPlaying) {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        discIcon.classList.add('spinning');
    } else {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        discIcon.classList.remove('spinning');
    }
}

// Actualizar barra de progreso y tiempos
audioPlayer.addEventListener('timeupdate', () => {
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressFill.style.width = percent + '%';
    
    // Formatear tiempo (0:00)
    currentTimeEl.innerText = formatTime(audioPlayer.currentTime);
    if (audioPlayer.duration) {
        durationEl.innerText = formatTime(audioPlayer.duration);
    }
});

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = "0" + secs;
    return mins + ":" + secs;
}

// Control de volumen
volSlider.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value;
});

// --- 5. INICIALIZAR LIBRERÍAS ---
VanillaTilt.init(document.querySelectorAll(".main-card, .status-card-artificial, .server-card, .music-card"), {
    max: 8,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});

function updatePlayIcon(isPlaying) {
    const playPauseBtn = document.getElementById('play-pause');
    const musicImg = document.getElementById('music-logo');

    if (isPlaying) {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        musicImg.classList.add('spinning');
    } else {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        musicImg.classList.remove('spinning');
    }
}

// Dentro de tu función enterSite(), agrega esto para que el reproductor aparezca:
function enterSite() {
    document.getElementById('entry-screen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('entry-screen').style.display = 'none';
        document.getElementById('main-content').style.opacity = '1';
        
        // MOSTRAR REPRODUCTOR
        const musicCard = document.querySelector('.music-card');
        musicCard.style.opacity = '1';
        
        audioPlayer.play();
        updatePlayIcon(true);
    }, 1000);
}