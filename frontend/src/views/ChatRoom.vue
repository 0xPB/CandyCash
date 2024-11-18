<script setup>
import { ref, reactive, onMounted } from 'vue';
import { io } from 'socket.io-client';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

// Connexion au serveur Socket.IO
const socket = io('http://localhost:4000'); // Remplacez par l'URL appropriée

// État réactif pour les messages et la sélection de salons
const state = reactive({
  currentRoom: 'general',
  message: '',
  messages: [],
  rooms: ['general', 'crypto', 'stocks', 'precious-metals'], // Liste des salons
});

// Fonction pour rejoindre un salon
function joinRoom() {
  socket.emit('join_room', state.currentRoom);
  state.messages = []; // Réinitialise les messages pour le nouveau salon
}

// Fonction pour envoyer un message
function sendMessage() {
  if (state.message.trim() !== '') {
    socket.emit('send_message', {
      room: state.currentRoom,
      message: state.message,
    });
    state.message = ''; // Vide le champ de saisie
  }
}

// Listener Socket.IO
socket.on('connect', () => {
  console.log('Connected to socket server:', socket.id);
  // Envoie le username au serveur
  socket.emit('set_username', authStore.username || 'Anonymous');
});

// Récupération des anciens messages lors du changement de room
socket.on('load_messages', (loadedMessages) => {
  state.messages = loadedMessages.map((msg) => ({
    user: msg.user,
    message: msg.message,
    time: msg.time,
  }));
});

// Réception des nouveaux messages en temps réel
socket.on('receive_message', (data) => {
  state.messages.push(data);
  console.log('Message received:', data);
});

// Rejoindre un salon lors du montage initial
onMounted(() => {
  joinRoom(); // Rejoint le salon par défaut
});
</script>

<template>
  <div>
    <h1>Chat Room</h1>
    <label for="rooms">Select a Room:</label>
    <select v-model="state.currentRoom" @change="joinRoom" id="rooms">
      <option v-for="room in state.rooms" :key="room" :value="room">
        {{ room }}
      </option>
    </select>

    <div class="chat-window" style="border: 1px solid #ccc; padding: 10px; margin-top: 10px; height: 300px; overflow-y: scroll;">
      <div v-for="(msg, index) in state.messages" :key="index">
        <strong>{{ msg.user }}:</strong> {{ msg.message }} <span style="font-size: 0.8em;">({{ msg.time }})</span>
      </div>
    </div>

    <div class="chat-input" style="margin-top: 10px;">
      <input
        type="text"
        v-model="state.message"
        placeholder="Type your message..."
        @keyup.enter="sendMessage"
        style="width: 80%;"
      />
      <button @click="sendMessage" style="width: 18%;">Send</button>
    </div>
  </div>
</template>
