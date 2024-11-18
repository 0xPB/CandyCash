<script setup>
import { io } from 'socket.io-client';

// Connecte le client à Socket.IO sur le port 6000
const socket = io('http://localhost:4000');

// Écoute les messages du serveur
socket.on('message', (data) => {
  console.log('Message from server:', data);
});

// Rejoindre un salon
function joinRoom(room) {
  socket.emit('join_room', room);
  console.log(`Joined room: ${room}`);
}

// Envoyer un message
function sendMessage(room, message) {
  socket.emit('send_message', { room, message, user: 'User1' });
}
</script>


<template>
  <div>
    <h1>Chat Room: {{ currentRoom }}</h1>

    <!-- Sélection du salon -->
    <div>
      <label for="username">Username:</label>
      <input id="username" v-model="username" type="text" placeholder="Enter your username" />

      <label for="room">Select Room:</label>
      <select id="room" v-model="currentRoom" @change="joinRoom(currentRoom)">
        <option value="General">General</option>
        <option value="Stocks">Stocks</option>
        <option value="Precious Metals">Precious Metals</option>
      </select>
    </div>

    <!-- Liste des messages -->
    <div style="border: 1px solid #ddd; padding: 10px; height: 300px; overflow-y: auto;">
      <p v-for="(msg, index) in messages" :key="index">
        <strong>{{ msg.user }}:</strong> {{ msg.message }} <em>({{ msg.time }})</em>
      </p>
    </div>

    <!-- Envoi de message -->
    <div>
      <input
        v-model="message"
        type="text"
        placeholder="Type your message..."
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>
