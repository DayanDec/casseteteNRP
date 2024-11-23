document.addEventListener('DOMContentLoaded', () => {
  const coffreImg = document.getElementById('coffre-img');
  const codeSection = document.querySelector('.code-section');
  const codeInput = document.getElementById('code-input');
  const validateBtn = document.getElementById('validate-btn');
  const messageBox = document.getElementById('message-box');
  const message = document.getElementById('message');
  const transitionOverlay = document.getElementById('transition-overlay');

  const secretCode = '7384'; // Code secret

  // Étape 1 : Montrer le champ de saisie au clic sur le coffre
  coffreImg.addEventListener('click', () => {
    coffreImg.style.transform = 'scale(1.1)';
    codeSection.classList.remove('hidden');
    codeInput.focus();
  });
  document.getElementById('background-music').volume = 0.2;

  // Étape 2 : Validation du code
  validateBtn.addEventListener('click', () => {
    if (codeInput.value === secretCode) {
      transitionOverlay.classList.remove('hidden'); // Affiche l'animation

      setTimeout(() => {
        window.location.href = 'views/regles.html'; // Redirige vers la nouvelle page dans le dossier `levrai`
      }, 3000); // Redirection après 3 secondes
    } else {
      message.textContent = 'Code incorrect. Réessayez !';
      message.style.color = 'red';
      messageBox.classList.remove('hidden');
    }
  });
});

// Ajout de l'écouteur d'événement pour le clic sur le "torso"
document.getElementById('torso').addEventListener('click', () => {
  validatePosture();
});

