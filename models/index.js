const sequelize = require('../config/db');
const User = require('./User');
const Task = require('./Task');
const Todo = require('./Todo');
const Comment= require('./Comment');


User.hasMany(Task, { foreignKey: 'idUser', as: 'tasks', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'idUser', as: 'user' });

Task.hasMany(Todo, { foreignKey: 'idTask', as: 'todos', onDelete: 'CASCADE' });
Todo.belongsTo(Task, { foreignKey: 'idTask', as: 'task' });

User.hasMany(Comment, { foreignKey: 'idUser', as: 'comments', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'idUser', as: 'user' });

Task.hasMany(Comment, { foreignKey: 'idTask', as: 'comments', onDelete: 'CASCADE' });
Comment.belongsTo(Task, { foreignKey: 'idTask', as: 'task' });


module.exports = {
  sequelize,
  User,
  Task,
  Todo,
  Comment,
};