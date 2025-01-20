require('dotenv').config({ path: './secret.env' });

const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const Todo = require('./models/Todo');
const Task = require('./models/Task');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const authRoutes = require ('./router/Auth/authRoutes');
const addUserRoutes = require ('./router/Auth/addUserRoutes');
const addTaskRoutes = require ('./router/Task/addTaskRoutes');
const listTaskRoutes = require ( './router/Task/listTaskRoutes');
const addTodo = require ( './router/Todo/addTodoRoutes');
const listTodo = require ( './router/Todo/listTodoRoutes');
const removeTodo = require ( './router/Todo/removeTodoRoutes');
const updateTodo = require ( './router/Todo/updateTodoRoutes');
const removeTask = require ( './router/Task/removeTaskRoutes');
const updateTask = require ( './router/Task/updateTaskRoutes');
const getTask = require ( './router/Task/getTaskRoutes');



const app = express();
app.use(bodyParser.json());
app.use(cors());


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



const port = 3001;


// Synchronisation des modèles avec la base de données
sequelize.sync({ force: false })  // `force: false` pour ne pas supprimer les données existantes
  .then(() => {
    console.log('Tables synchronisées avec succès');
    app.listen(port, () => {
      console.log(`Serveur démarré sur http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation :', error);
  });