const express = require('express');
const cors = require('cors');

const UserRoutes = require('./routes/UserRoutes');
const PetRoutes = require('./routes/PetRoutes');

const app = express();

// Config JSON response
app.use(express.json());

// Solve CORS
app.use(cors({
  credentials: true,
  origin: 'https://localhost:3000'
}));

// Public folder for images
app.use(express.static('public'));

// Routes
app.use('/users', UserRoutes);
app.use('/pets', PetRoutes);

app.listen(5000);