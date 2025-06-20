module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define('Site', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categorie: DataTypes.STRING,
    description: DataTypes.TEXT,
    adresse: DataTypes.STRING,
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    heure_ouverture: DataTypes.STRING,
    tarif: DataTypes.STRING,
    telephone: DataTypes.STRING,
    email: DataTypes.STRING,
    site_web: DataTypes.STRING,
    services: DataTypes.TEXT,
    transport: DataTypes.STRING,
    periode_historique: DataTypes.STRING,
    style_architectural: DataTypes.STRING,
    points_interet: DataTypes.TEXT,
    lieu_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    parcours_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    
  });

  Site.associate = (models) => {
    Site.belongsTo(models.Lieu, { foreignKey: 'lieu_id' });
    Site.belongsTo(models.User, { foreignKey: 'user_id' });
    Site.belongsTo(models.Parcours, {
      foreignKey: 'parcours_id',
      as: 'parcours'
    });
  };

  return Site;
};
