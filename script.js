const canvas = document.getElementById("dogCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

let dogPosition = 0;
let animationId;

function drawDog(x) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a simple stick dog (similar to your image)
    ctx.beginPath();
    // Head
    ctx.rect(x + 150, 120, 50, 50);
    // Body
    ctx.moveTo(x + 175, 170);
    ctx.lineTo(x + 175, 250);
    // Legs
    ctx.moveTo(x + 175, 250);
    ctx.lineTo(x + 160, 300);
    ctx.moveTo(x + 175, 250);
    ctx.lineTo(x + 190, 300);
    // Tail
    ctx.moveTo(x + 200, 230);
    ctx.lineTo(x + 220, 210);
    ctx.stroke();

    // Ears and eyes
    ctx.beginPath();
    ctx.moveTo(x + 150, 120);
    ctx.lineTo(x + 140, 110); // Left ear
    ctx.moveTo(x + 200, 120);
    ctx.lineTo(x + 210, 110); // Right ear
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x + 165, 140, 5, 0, Math.PI * 2); // Left eye
    ctx.arc(x + 185, 140, 5, 0, Math.PI * 2); // Right eye
    ctx.stroke();
}

function animateDog() {
    animationId = requestAnimationFrame(animateDog);
    dogPosition += 2; // Speed of movement
    if (dogPosition > canvas.width) dogPosition = -50; // Reset position
    drawDog(dogPosition);
}

document.getElementById("startButton").addEventListener("click", () => {
    if (!animationId) {
        animateDog();
    }
});