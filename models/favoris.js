module.exports = (sequelize, DataTypes) => {
  const Favoris = sequelize.define('Favoris', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    programId: {
      type: DataTypes.INTEGER,
      allowNull: true, // ✅ autorise null pour les favoris de type autre
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    siteId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Favoris.associate = (models) => {
    Favoris.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User',
    });

    Favoris.belongsTo(models.Program, {
      foreignKey: 'programId',
      as: 'Program',
    });

    Favoris.belongsTo(models.Event, {
      foreignKey: 'eventId',
      as: 'Event',
    });

    Favoris.belongsTo(models.Site, {
      foreignKey: 'siteId',
      as: 'FavoriSite', // ce nom est utilisé pour les inclusions dans les requêtes
    });
  };

  return Favoris;
};
