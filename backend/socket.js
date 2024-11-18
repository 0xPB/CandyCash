import { Server } from 'socket.io';

const PORT = 4000; // Définissez un port séparé pour Socket.IO

const io = new Server(PORT, {
  cors: {
    origin: '*', // Permettre toutes les origines
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Rejoindre un salon
  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
    io.to(room).emit('message', `User ${socket.id} joined ${room}`);
  });

  // Gérer l'envoi d'un message
  socket.on('send_message', ({ room, message, user }) => {
    const data = { user, message, time: new Date().toLocaleTimeString() };
    io.to(room).emit('receive_message', data);
  });

  // Déconnexion
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

console.log(`Socket.IO server is running on port ${PORT}`);

export default io;
