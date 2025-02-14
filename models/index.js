const sequelize = require('../config/db');
const User = require('./User');
const Task = require('./Task');
const Todo = require('./Todo');
const Comment = require('./Comment');
const Conversation = require('./Conversation'); // Importer le modèle Conversation


User.hasMany(Task, { foreignKey: 'idUser', as: 'tasks', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'idUser', as: 'user' });

Task.hasMany(Todo, { foreignKey: 'idTask', as: 'todos', onDelete: 'CASCADE' });
Todo.belongsTo(Task, { foreignKey: 'idTask', as: 'task' });

User.hasMany(Comment, { foreignKey: 'idUser', as: 'comments', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'idUser', as: 'user' });

Task.hasMany(Comment, { foreignKey: 'idTask', as: 'comments', onDelete: 'CASCADE' });
Comment.belongsTo(Task, { foreignKey: 'idTask', as: 'task' });

// Relations many-to-many entre Task et User (partage de tâches)
Task.belongsToMany(User, {
  through: Conversation, // Utiliser la table de liaison TaskUser
  foreignKey: 'idTask', // Clé étrangère dans TaskUser qui référence Task
  otherKey: 'idUser',
  as: 'sharedWith',
  unique: false, // Alias pour accéder aux utilisateurs avec qui la tâche est partagée
});

User.belongsToMany(Task, {
  through: Conversation, // Utiliser la table de liaison TaskUser
  foreignKey: 'idUser', // Clé étrangère dans TaskUser qui référence User
  as: 'sharedTasks', // Alias pour accéder aux tâches partagées avec l'utilisateur
  unique: false,
});
module.exports = {
  sequelize,
  User,
  Task,
  Todo,
  Comment,
  Conversation,
};