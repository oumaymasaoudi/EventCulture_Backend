const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();
const path = require('path');


const app = express();
const PORT = process.env.PORT || 5000;


// Pour servir les images statiques :
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Synchronisation Sequelize
const models = require('./models');
db.sync({ alter: true })
  .then(() => {
    console.log('✅ Base de données synchronisée');
  })
  .catch((err) => {
    console.error('❌ Erreur de synchronisation :', err);
  });

// Import des routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const eventRoutes = require('./routes/event.routes');
const locationRoutes = require('./routes/location.routes');
const parcoursRoutes = require('./routes/parcours.routes');
const participationRoutes = require('./routes/participation.routes');
const programRoutes = require('./routes/program.routes');
const siteRoutes = require('./routes/site.routes');
const lieuRoutes = require('./routes/lieu.routes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/parcours', parcoursRoutes);
app.use('/api/participations', participationRoutes);
app.use('/api/programs', programRoutes); // Garder UNE SEULE FOIS
app.use('/api/sites', siteRoutes);
app.use('/api/lieux', lieuRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API EventCulture 🎉');
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
