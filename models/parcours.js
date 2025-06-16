module.exports = (sequelize, DataTypes) => {
  const Parcours = sequelize.define('Parcours', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lieu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'Parcours'
  });

  // Ajoute l'association ici !
  Parcours.associate = (models) => {
    Parcours.hasMany(models.Site, { foreignKey: 'parcours_id', as: 'Sites' });
    Parcours.belongsTo(models.User, { foreignKey: 'user_id' });
    Parcours.belongsTo(models.Lieu, { foreignKey: 'lieu_id' });
    // si tu utilises la table de liaison :

  };

  return Parcours;
};
