const socketio = require('socket.io');

exports.initSocket = (server) => {
  const io = socketio(server, { cors: { origin: '*' } });
  io.on('connection', (socket) => {
    console.log('Nouvelle connexion:', socket.id);

    socket.on('joinAlertRoom', (alertId) => {
      socket.join(alertId);
    });

    socket.on('sendMessage', ({ alertId, message }) => {
      io.to(alertId).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('Déconnexion:', socket.id);
    });
  });
};
