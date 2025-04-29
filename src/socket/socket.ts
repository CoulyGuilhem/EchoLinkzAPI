import { Server } from 'socket.io'
import http from 'http'

export const initSocket = (server: http.Server) => {
  const io = new Server(server, { cors: { origin: '*' } })
  io.on('connection', socket => {
    socket.on('joinAlertRoom', (alertId: string) => socket.join(alertId))
    socket.on('sendMessage', ({ alertId, message }: any) => io.to(alertId).emit('receiveMessage', message))
  })
}
