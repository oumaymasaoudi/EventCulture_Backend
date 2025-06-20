module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define('Program', {
    event_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    site_id: { type: DataTypes.INTEGER },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    start_time: { type: DataTypes.STRING, allowNull: false },
    end_time: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    category: { type: DataTypes.STRING }
  }, {
    tableName: 'Programs',
  });

 
  Program.associate = (models) => {
  Program.belongsTo(models.Event, { foreignKey: 'event_id', as: 'event' });
  Program.belongsTo(models.Site, { foreignKey: 'site_id', as: 'site' });

  if (models.Favoris) {
    Program.hasMany(models.Favoris, {
      foreignKey: 'programId',
      as: 'Favoris'
    });
  }
};



  return Program;
};
