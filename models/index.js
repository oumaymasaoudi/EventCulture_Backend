const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const sequelize = db;

// Import des modèles
const User = require('./user')(sequelize, DataTypes);
const Event = require('./event')(sequelize, DataTypes);
const Location = require('./location')(sequelize, DataTypes);
const Participation = require('./participation')(sequelize, DataTypes);
const Parcours = require('./parcours')(sequelize, DataTypes);
const Site = require('./site')(sequelize, DataTypes);
const Program = require('./program')(sequelize, DataTypes);
const ParcoursSite = require('./parcoursSite')(sequelize, DataTypes); // 🆕
const Lieu = require('./lieu')(sequelize, DataTypes);


db.User = User;
db.Event = Event;
db.Location = Location;
db.Participation = Participation;
db.Parcours = Parcours;
db.Site = Site;
db.Program = Program;
db.ParcoursSite = ParcoursSite;
db.Lieu = Lieu;


/* ===========================
   Associations des modèles
   =========================== */

   Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Site = require('./site')(sequelize, Sequelize);

// Event -> User (créateur)
User.hasMany(Event, { foreignKey: 'user_id' });
Event.belongsTo(User, { foreignKey: 'user_id' });

Lieu.hasMany(Event, { foreignKey: 'lieu_id' });
Event.belongsTo(Lieu, { foreignKey: 'lieu_id' });


// Participation -> User & Event
User.hasMany(Participation, { foreignKey: 'user_id' });
Participation.belongsTo(User, { foreignKey: 'user_id' });

Event.hasMany(Participation, { foreignKey: 'event_id' });
Participation.belongsTo(Event, { foreignKey: 'event_id' });

// Parcours -> User
User.hasMany(Parcours, { foreignKey: 'user_id' });
Parcours.belongsTo(User, { foreignKey: 'user_id' });

Parcours.hasMany(Site, { foreignKey: 'parcours_id' });
Site.belongsTo(Parcours, { foreignKey: 'parcours_id' });


Event.belongsTo(User, { foreignKey: 'user_id' });
Event.belongsTo(Location, { foreignKey: 'location_id' });
User.hasMany(Event, { foreignKey: 'user_id' });
Location.hasMany(Event, { foreignKey: 'location_id' });



/* ✅ Association correcte via table de liaison */
Parcours.belongsToMany(Site, { through: ParcoursSite });
Site.belongsToMany(Parcours, { through: ParcoursSite });


Parcours.belongsTo(User, { foreignKey: 'user_id' });

Parcours.belongsTo(Lieu, { foreignKey: 'lieu_id' });




// Program -> Event & Site
Event.hasMany(Program, { foreignKey: 'event_id' });
Program.belongsTo(Event, { foreignKey: 'event_id' });

Site.hasMany(Program, { foreignKey: 'site_id' });
Program.belongsTo(Site, { foreignKey: 'site_id' });

/* ===========================
   Export des modèles
   =========================== */
module.exports = {
  sequelize,
  User,
  Event,
  Location,
  Participation,
  Parcours,
  Site,
  Program,
  ParcoursSite,
  Lieu
};
