require('dotenv').config({ path: './secret.env' });

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');

// Importer vos routes
const authRoutes = require('./router/Auth/authRoutes');
const addUserRoutes = require('./router/Auth/addUserRoutes');
const addTaskRoutes = require('./router/Task/addTaskRoutes');
const listTaskRoutes = require('./router/Task/listTaskRoutes');
const addTodo = require('./router/Todo/addTodoRoutes');
const listTodo = require('./router/Todo/listTodoRoutes');
const removeTodo = require('./router/Todo/removeTodoRoutes');
const updateTodo = require('./router/Todo/updateTodoRoutes');
const removeTask = require('./router/Task/removeTaskRoutes');
const updateTask = require('./router/Task/updateTaskRoutes');
const getTask = require('./router/Task/getTaskRoutes');
const addComment = require('./router/Comment/addCommentRoutes');
const getUser = require('./router/Auth/getUserRoutes');
const shareTasks = require('./router/Task/shareTaskRoute');
const getSharedTasks = require('./router/Task/getSharedTaskRoutes');
const getCommentByTask = require('./router/Comment/getCommentByIDTask');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', // Remplacez par l'origine de votre application frontend
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

// Configuration de CORS pour les routes Express
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions)); // Appliquer CORS à toutes les routes
app.use(bodyParser.json());

// Définir les routes
app.use('/api', authRoutes);
app.use('/api', addUserRoutes);
app.use('/api', addTaskRoutes);
app.use('/api', listTaskRoutes);
app.use('/api', addTodo);
app.use('/api', listTodo);
app.use('/api', removeTodo);
app.use('/api', updateTodo);
app.use('/api', removeTask);
app.use('/api', updateTask);
app.use('/api', getTask);
app.use('/api', addComment);
app.use('/api', shareTasks);
app.use('/api', getUser);
app.use('/api', getSharedTasks);
app.use('/api', getCommentByTask);

const port = 3000;

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');

  socket.on('newComment', (data) => {
    // Émettre le message à tous les clients sauf l'expéditeur
    socket.broadcast.emit('newComment', data);
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur est déconnecté');
  });
});


// Synchronisation des modèles avec la base de données
sequelize.sync({ force:false})  
  .then(() => {
    console.log('Tables synchronisées avec succès');
    server.listen(port, () => {
      console.log(`Serveur démarré sur http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation :', error);
  });