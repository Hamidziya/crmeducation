// Importing required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { authenticateToken } = require('./middleware/authMiddleware');
const { sequelize } = require('./config/database');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importing routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const customerRoutes = require('./routes/customer');
const leadRoutes = require('./routes/lead');
const taskRoutes = require('./routes/task');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users',authenticateToken, userRoutes);
app.use('/api/customers', authenticateToken, customerRoutes);
app.use('/api/leads', authenticateToken, leadRoutes);
app.use('/api/tasks', authenticateToken, taskRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('CRM Backend API is running');
});

module.exports = app; 
