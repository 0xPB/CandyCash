import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

// Import the candy images
import bleuImage from './assets/images/bleu.png';
import rougeImage from './assets/images/rouge.png';
import multicoloreImage from './assets/images/multicolore.png';
import violetImage from './assets/images/violet.png';

// Initialize the Vue app
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');

// Candy images array
const candyImages = [
  { name: "bleu", src: bleuImage },
  { name: "rouge", src: rougeImage },
  { name: "multicolore", src: multicoloreImage },
  { name: "violet", src: violetImage }
];

// Function to generate a random number between min and max
function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to create and animate candies
function createCandy(image) {
  const candyContainer = document.getElementById('candy-container');
  if (!candyContainer) {
    console.error('Candy container not found!');
    return;
  }

  // Create the candy element
  const candy = document.createElement('div');
  candy.className = 'candy';
  candy.style.backgroundImage = `url(${image.src})`;
  candy.style.position = 'absolute';
  candy.style.width = '40px';
  candy.style.height = '40px';

  // Set random initial position, rotation, and animation duration
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const randomLeft = getRandomBetween(0, screenWidth - 40);
  const randomDuration = getRandomBetween(3, 7); // Duration between 3 and 7 seconds
  const randomRotation = getRandomBetween(360, 1080); // Rotation between 360° and 1080°

  candy.style.left = `${randomLeft}px`;
  candy.style.top = `-50px`; // Start above the screen
  candy.style.transition = `top ${randomDuration}s linear, transform ${randomDuration}s linear`;

  // Append the candy to the container
  candyContainer.appendChild(candy);

  // Animate the candy to fall and rotate
  setTimeout(() => {
    candy.style.top = `${screenHeight}px`; // Move below the screen
    candy.style.transform = `rotate(${randomRotation}deg)`; // Rotate during the fall
  }, 100); // Small delay to allow the initial position to render

  // Remove the candy after it falls
  setTimeout(() => {
    candy.remove();
  }, randomDuration * 1000);
}

// Function to generate 7 candies with random positions, speeds, and rotations
function generateCandies() {
  for (let i = 0; i < 7; i++) {
    const randomCandy = candyImages[Math.floor(Math.random() * candyImages.length)];
    createCandy(randomCandy);
  }
}

// Infinite candy generation
document.addEventListener('DOMContentLoaded', () => {
  generateCandies(); // Initial generation
  setInterval(generateCandies, 8000); // Generate 7 new candies every 8 seconds
});
