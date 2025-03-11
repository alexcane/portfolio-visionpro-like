function showContent(target){
    let contentList = document.getElementsByClassName('toggleable');
    for (let content of contentList) {
        content.style.display = 'none';
        // content.classList.remove('show');
    }
    // let active = document.getElementById('content-'+target);
    // active.style.display = 'grid';
    // active.classList.add('show');
    document.getElementById('content-'+target).style.display = 'grid';
}

let isTicking = false;
document.addEventListener('mousemove', function(e) {
    if (!isTicking) {
        window.requestAnimationFrame(function() {
            const xRatio = (e.clientX / window.innerWidth) - 0.5;
            const yRatio = (e.clientY / window.innerHeight) - 0.5;
            const movementStrength = 30;
            const xOffset = xRatio * movementStrength;
            const yOffset = yRatio * movementStrength;
            document.body.style.backgroundPosition =
                `calc(50% + ${xOffset}px) calc(50% + ${yOffset}px)`;
            isTicking = false;
        });
        isTicking = true;
    }
});


// Fonction de gestion de l'orientation
function handleOrientation(e) {
    // e.gamma : inclinaison gauche/droite (en degrés)
    // e.beta : inclinaison avant/arrière (en degrés)
    const gamma = e.gamma; // Habituellement entre -45 et 45
    const beta = e.beta;   // Habituellement entre -45 et 45 (selon l'utilisation)

    // Ajuste le facteur de sensibilité selon tes préférences
    const movementStrength = 20; // en pixels

    // Calcul des offsets
    const xOffset = (gamma / 45) * movementStrength;
    const yOffset = (beta / 45) * movementStrength;

    // Mise à jour de la position du background
    document.body.style.backgroundPosition =
        `calc(50% + ${xOffset}px) calc(50% + ${yOffset}px)`;
}

// Vérifie la disponibilité de l'événement DeviceOrientation
if (window.DeviceOrientationEvent) {
    // Pour iOS, il faut demander la permission
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation);
                } else {
                    console.log("Permission non accordée pour DeviceOrientation");
                }
            })
            .catch(console.error);
    } else {
        // Pour les autres navigateurs
        window.addEventListener('deviceorientation', handleOrientation);
    }
} else {
    console.log("DeviceOrientationEvent n'est pas supporté sur cet appareil.");
}


// fonction gyro optimisée :
// function handleOrientation(e) {
//     if (!isTicking) {
//         window.requestAnimationFrame(function() {
//             const gamma = e.gamma;
//             const beta = e.beta;
//             const movementStrength = 20;
//             const xOffset = (gamma / 45) * movementStrength;
//             const yOffset = (beta / 45) * movementStrength;
//             document.body.style.backgroundPosition =
//                 `calc(50% + ${xOffset}px) calc(50% + ${yOffset}px)`;
//             isTicking = false;
//         });
//         isTicking = true;
//     }
// }