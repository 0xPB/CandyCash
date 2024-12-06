import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

// Importation des images de bonbons
import bleuImage from './assets/images/bleu.png';
import rougeImage from './assets/images/rouge.png';
import multicoloreImage from './assets/images/multicolore.png';
import violetImage from './assets/images/violet.png';

// Initialisation de l'application Vue
const app = createApp(App);
app.use(createPinia()); // Gestion de l'état global avec Pinia
app.use(router); // Gestion de la navigation avec le router Vue
app.mount('#app'); // Montage de l'application sur l'élément DOM avec l'ID #app

// Tableau contenant les informations des bonbons (nom et image associée)
const candyImages = [
  { name: "bleu", src: bleuImage },
  { name: "rouge", src: rougeImage },
  { name: "multicolore", src: multicoloreImage },
  { name: "violet", src: violetImage }
];

// Fonction utilitaire : génère un nombre aléatoire entre min et max
const getRandomBetween = (min, max) => Math.random() * (max - min) + min;

// Fonction pour créer un bonbon et l'animer
const createCandy = (image) => {
  const candyContainer = document.getElementById('candy-container'); // Récupération du conteneur de bonbons
  if (!candyContainer) { // Vérification si le conteneur existe
    console.error('Candy container not found!');
    return;
  }

  const screenWidth = window.innerWidth; // Largeur de l'écran
  const screenHeight = window.innerHeight; // Hauteur de l'écran

  // Propriétés aléatoires pour le bonbon
  const randomProps = {
    left: getRandomBetween(0, screenWidth - 40), // Position horizontale aléatoire
    duration: getRandomBetween(3, 7), // Durée de la chute entre 3 et 7 secondes
    rotation: getRandomBetween(360, 1080), // Rotation aléatoire entre 360° et 1080°
  };

  // Création de l'élément bonbon
  const candy = document.createElement('div');
  candy.className = 'candy'; // Ajout de la classe CSS
  candy.style.backgroundImage = `url(${image.src})`; // Définition de l'image de fond
  candy.style.left = `${randomProps.left}px`; // Position horizontale
  candy.style.top = `-50px`; // Position initiale (au-dessus de l'écran)
  candy.style.transition = `top ${randomProps.duration}s linear, transform ${randomProps.duration}s linear`;

  // Ajout du bonbon au conteneur
  candyContainer.appendChild(candy);

  // Animation du bonbon (chute et rotation)
  setTimeout(() => {
    candy.style.top = `${screenHeight}px`; // Fait tomber le bonbon sous l'écran
    candy.style.transform = `rotate(${randomProps.rotation}deg)`; // Fait tourner le bonbon
  }, 100); // Délai pour permettre le rendu initial

  // Suppression du bonbon après la fin de l'animation
  setTimeout(() => candy.remove(), randomProps.duration * 1000);
};

// Fonction pour générer plusieurs bonbons
const generateCandies = () => {
  for (let i = 0; i < 7; i++) { // Génère 7 bonbons
    const randomCandy = candyImages[Math.floor(Math.random() * candyImages.length)]; // Sélection d'une image aléatoire
    createCandy(randomCandy); // Création et animation du bonbon
  }
};

// Génération infinie de bonbons
document.addEventListener('DOMContentLoaded', () => {
  generateCandies(); // Génération initiale des bonbons
  setInterval(generateCandies, 8000); // Génère 7 bonbons toutes les 8 secondes
});