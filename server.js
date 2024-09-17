// Importing required modules
const app = require('./app');
const { sequelize } = require('./config/database');

// Sync Sequelize models with MySQL and start the server
const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log('All models were synchronized successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error syncing models:', err);
  });
