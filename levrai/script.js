let errors = 0;
let timerInterval; // Gère le timer globalement

// Volume de l'audio de fond
document.getElementById('background-audio').volume = 0.1;

// Chargement des sons spécifiques pour les positions correctes
const teteSound = new Audio('clik.mp3');
teteSound.volume = 0.8;
const jambeSound = new Audio('foleywoodaigu.mp3');
jambeSound.volume = 0.7;
const rulesBtn = document.getElementById('rules-btn');
const rulesModal = document.getElementById('rules-modal');
const closeRules = document.getElementById('close-rules');

// Positions initiales
const positions = {
  head: 40,
  'left-arm': 120,
  'right-arm': 120,
  'left-leg': 370,
  'right-leg': 370,
};

// Limites spécifiques pour chaque membre
const limits = {
  head: { min: 10, max: 70 },
  'left-arm': { min: 90, max: 140 },
  'right-arm': { min: 90, max: 140 },
  'left-leg': { min: 350, max: 400 },
  'right-leg': { min: 350, max: 400 },
};

// Solution finale pour chaque partie
const solution = {
  head: 20,
  'left-arm': 100,
  'right-arm': 90,
  'left-leg': 380,
  'right-leg': 350,
};

// Suivi des sons déjà joués pour la tête et la jambe droite
const soundPlayed = {
  head: false,
  'right-leg': false,
};

// Fonction pour déplacer une partie de la marionnette
function move(part, direction) {
  const element = document.getElementById(part);
  const amount = direction === 'up' ? -10 : 10;
  const newPos = positions[part] + amount;

  if (newPos >= limits[part].min && newPos <= limits[part].max) {
    positions[part] = newPos;
    element.style.top = `${positions[part]}px`;

    if (part === 'head' && Math.abs(positions[part] - solution[part]) === 0 && !soundPlayed.head) {
      teteSound.currentTime = 0;
      teteSound.play();
      soundPlayed.head = true;
    }

    if (part === 'right-leg' && Math.abs(positions[part] - solution[part]) === 0 && !soundPlayed['right-leg']) {
      jambeSound.currentTime = 0;
      jambeSound.play();
      soundPlayed['right-leg'] = true;
    }
  }
}

// Fonction pour stopper la musique progressivement
function fadeOutAudio(audioElement, duration = 2000) {
  let volume = audioElement.volume;
  const step = volume / (duration / 50);

  const fadeOutInterval = setInterval(() => {
    if (volume > 0) {
      volume = Math.max(0, volume - step);
      audioElement.volume = volume;
    } else {
      clearInterval(fadeOutInterval);
      audioElement.pause();
    }
  }, 50);
}

// Validation de la posture
function validatePosture() {
  const correct = Object.keys(solution).every(
    (part) => Math.abs(positions[part] - solution[part]) <= 10
  );

  const messageBox = document.getElementById('message-box');
  const marionnette = document.querySelector(".marionnette");
  const backgroundAudio = document.getElementById('background-audio');

  if (correct) {
    messageBox.textContent = "Bravo ! Vous avez réussi ! Le mot est AYATSURI (操り), qui signifie manipulation.";
    messageBox.className = "success";

    // Animation lumineuse autour de la marionnette
    marionnette.style.animation = "success-glow 1.5s ease infinite";

    // Stoppe la musique progressivement
    fadeOutAudio(backgroundAudio);

    // **Arrête le timer global**
    clearInterval(timerInterval);
    localStorage.removeItem('timer');
  } else {
    errors++;
    messageBox.textContent = "Posture incorrecte. Essayez encore.";
    messageBox.className = "error";

    // Animation de tremblement en cas d'erreur
    marionnette.classList.add("shake");
    setTimeout(() => {
      marionnette.classList.remove("shake");
    }, 600);
  }
}

let timer = 10; // 8 minutes en secondes

function loadTimer() {
  const savedTime = localStorage.getItem('timer');
  if (savedTime) {
    timer = Math.max(0, parseInt(savedTime, 10) - 60);
  }
  saveTimer();
}

function saveTimer() {
  localStorage.setItem('timer', timer.toString());
}

function startTimer() {
  const timerDisplay = document.getElementById('timer-display');

  timerInterval = setInterval(() => { // Utilisation de timerInterval
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    saveTimer();

    if (timer <= 0) {
      clearInterval(timerInterval);
      localStorage.removeItem('timer');
      
      // Afficher le message d'agitation
      document.body.innerHTML = '<div style="color: Black; font-size: 1.8em; text-align: center;">La marionnette s’agite violemment...</div>';
      
      // Ajouter un fond noir avec transition
      const fadeDiv = document.createElement('div');
      fadeDiv.style.position = 'fixed';
      fadeDiv.style.top = 0;
      fadeDiv.style.left = 0;
      fadeDiv.style.width = '100%';
      fadeDiv.style.height = '100%';
      fadeDiv.style.backgroundColor = 'black';
      fadeDiv.style.opacity = '0';
      fadeDiv.style.transition = 'opacity 1s ease-in-out';
      document.body.appendChild(fadeDiv);
    
      // Déclencher le fade-out après un court délai
      setTimeout(() => {
        fadeDiv.style.opacity = '1';
      }, 1000);
    
      // Rediriger après le fade-out
      setTimeout(() => {
        window.location.href = 'gameover.html';
      }, 3500); // Délai ajusté pour inclure l'animation
    }        

    timer--;
  }, 1000);
}

window.onload = () => {
  loadTimer();
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  document.getElementById('timer-display').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  startTimer();
};

document.getElementById('torso').addEventListener('click', () => {
  const torso = document.getElementById('torso');
  torso.classList.add('rotate-simple');
  setTimeout(() => {
    torso.classList.remove('rotate-simple');
  }, 400);

  validatePosture();
});

rulesBtn.addEventListener('click', () => {
  rulesModal.classList.remove('hidden');
});

closeRules.addEventListener('click', () => {
  rulesModal.classList.add('hidden');
});

window.addEventListener('click', (event) => {
  if (event.target === rulesModal) {
    rulesModal.classList.add('hidden');
  }
});
