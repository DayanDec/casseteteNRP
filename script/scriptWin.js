document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const serpent = document.getElementById('serpent');
    const electricEffect = document.getElementById('electric-effect');
    const raitoSound = document.getElementById('raito-sound');
    const disintegrationSound = document.getElementById('disintegration-sound');

    // Timing variables
    const serpentDelay = 2000; // 2 seconds
    const raitonDelay = 4000; // 2 seconds after serpent
    const disintegrationDelay = 6000; // 2 seconds after raiton

    // Show serpent
    setTimeout(() => {
        serpent.style.opacity = '1';
    }, serpentDelay);

    // Trigger Raiton effect
    setTimeout(() => {
        electricEffect.style.display = 'block';
        raitoSound.play();
    }, raitonDelay);

    // Disintegrate serpent
    setTimeout(() => {
        // Hide electric effect
        electricEffect.style.display = 'none';

        // Disintegrate serpent
        serpent.style.transform = 'scale(0.2)';
        serpent.style.opacity = '0';

        // Play disintegration sound
        disintegrationSound.play();
    }, disintegrationDelay);
});
