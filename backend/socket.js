import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 4000; // Port pour Socket.IO
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/candycash';

// Connexion à MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schéma pour les messages
const messageSchema = new mongoose.Schema({
  room: String,
  user: String,
  message: String,
  time: String,
});

const Message = mongoose.model('Message', messageSchema);

const io = new Server(PORT, {
  cors: {
    origin: '*', // Permettre toutes les origines
  },
});

const users = new Map(); // Map pour stocker les associations socketId <-> username

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Lorsque l'utilisateur fournit son username après la connexion
  socket.on('set_username', (username) => {
    users.set(socket.id, username); // Associe le username à l'ID du socket
    console.log(`Username set for ${socket.id}: ${username}`);
  });

  // Rejoindre un salon
  socket.on('join_room', async (room) => {
    socket.join(room);
    const username = users.get(socket.id) || 'Anonymous';
    console.log(`User ${username} joined room ${room}`);

    // Récupérer les messages de la room depuis MongoDB
    const messages = await Message.find({ room }).sort({ _id: 1 }); // Trie par ordre d'ajout
    socket.emit('load_messages', messages); // Envoie les messages au client

    // Notifie les autres utilisateurs
    io.to(room).emit('message', `${username} joined ${room}`);
  });

  // Gérer l'envoi d'un message
  socket.on('send_message', async ({ room, message }) => {
    const username = users.get(socket.id) || 'Anonymous';
    const data = { user: username, message, time: new Date().toLocaleTimeString() };

    // Sauvegarde du message dans MongoDB
    try {
      const newMessage = new Message({ room, user: username, message, time: data.time });
      await newMessage.save();
      console.log(`Message saved in room ${room} by ${username}`);
    } catch (err) {
      console.error('Error saving message to MongoDB:', err);
    }

    io.to(room).emit('receive_message', data); // Envoie le message aux utilisateurs dans la room
  });

  // Déconnexion
  socket.on('disconnect', () => {
    const username = users.get(socket.id) || 'Anonymous';
    console.log(`User disconnected: ${username}`);
    users.delete(socket.id); // Supprime l'association socketId <-> username
  });
});

console.log(`Socket.IO server is running on port ${PORT}`);

export default io;
