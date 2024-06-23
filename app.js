const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');

const accountRoutes = require('./routes/accountRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const dataHandlerRoutes = require('./routes/dataHandlerRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/accounts', accountRoutes);
app.use('/destinations', destinationRoutes);
app.use('/server', dataHandlerRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
