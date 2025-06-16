module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define('Site', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categorie: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    adresse: {
      type: DataTypes.STRING,
    },
    heure_ouverture: {
      type: DataTypes.STRING,
    },
    tarif: {
      type: DataTypes.STRING,
    },
    telephone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    site_web: {
      type: DataTypes.STRING,
    },
    services: {
      type: DataTypes.TEXT, // JSON.stringify d’un tableau dans controller
    },
    transport: {
      type: DataTypes.STRING,
    },
    periode_historique: {
      type: DataTypes.STRING,
    },
    style_architectural: {
      type: DataTypes.STRING,
    },
    points_interet: {
      type: DataTypes.TEXT,
    },
    lieu_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // facultatif car tu ne veux plus le champ dans le form
    },
    parcours_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // facultatif
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // obligatoire pour savoir qui a créé le site
    },
  });

  Site.associate = (models) => {
    Site.belongsTo(models.Lieu, { foreignKey: 'lieu_id' });
    Site.belongsTo(models.User, { foreignKey: 'user_id' });
    Site.belongsTo(models.Parcours, { foreignKey: 'parcours_id' });
  };

  return Site;
};
