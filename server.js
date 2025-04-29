require('dotenv').config();
const express = require('express');
const http = require('http');
const { initSocket } = require('./src/socket/socket');
const connectDB = require('./config/db');
const errorHandler = require('./src/middleware/errorHandler');

connectDB();

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.use('/api/alerts', require('./src/routes/alertRoutes'));
app.use('/api/users',  require('./src/routes/userRoutes'));
app.use('/api/chat',   require('./src/routes/chatRoutes'));

app.use(errorHandler);

initSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
