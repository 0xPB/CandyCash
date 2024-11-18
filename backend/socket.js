import { Server } from 'socket.io';

const PORT = 4000; // Port séparé pour Socket.IO

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
  socket.on('join_room', (room) => {
    socket.join(room);
    const username = users.get(socket.id) || 'Anonymous';
    console.log(`User ${username} joined room ${room}`);
    io.to(room).emit('message', `${username} joined ${room}`);
  });

  // Gérer l'envoi d'un message
  socket.on('send_message', ({ room, message }) => {
    const username = users.get(socket.id) || 'Anonymous';
    const data = { user: username, message, time: new Date().toLocaleTimeString() };
    console.log(`Message from ${username} in room ${room}: ${message}`);
    io.to(room).emit('receive_message', data);
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
