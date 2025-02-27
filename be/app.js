const express = require('express');
const sequelize = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');
const logger = require('./middlewares/logger');
const validateTitle = require('./middlewares/validateTitle');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(logger);
app.use(validateTitle);
app.use('/tasks', taskRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running on port 3000'));
});
