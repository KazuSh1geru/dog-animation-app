// Load the image
const dogImage = new Image();
dogImage.src = './dog.png'; // Replace with the path to your image

const canvas = document.getElementById('dogCanvas');
const ctx = canvas.getContext('2d');

let dogPosition = 0; // Initialize the position of the dog
let animationId = null; // Initialize the animation ID

function drawDog(x) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the image
    ctx.drawImage(dogImage, x, 120, 50, 50); // Adjust the position and size as needed
}

function animateDog() {
    animationId = requestAnimationFrame(animateDog);
    dogPosition += 2; // Speed of movement
    if (dogPosition > canvas.width) dogPosition = -50; // Reset position
    drawDog(dogPosition);
}

// Ensure the image is loaded before starting the animation
dogImage.onload = () => {
    document.getElementById("startButton").addEventListener("click", () => {
        if (!animationId) {
            animateDog();
        }
    });
};