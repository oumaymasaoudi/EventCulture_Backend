module.exports = (sequelize, DataTypes) => {
  const Participation = sequelize.define('Participation', {
    event_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    statut: { type: DataTypes.STRING },
    date_inscription: { type: DataTypes.DATEONLY },
    motivation: { type: DataTypes.TEXT },
    oeuvres_images: { type: DataTypes.JSON } // ex: liste d'URLs d'images
  }, {
    tableName: 'Participations',
  });



  return Participation;
};
