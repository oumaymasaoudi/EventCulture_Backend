module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define('Program', {
  event_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  site_id: { type: DataTypes.INTEGER }, // ➜ AJOUTER
  date: { type: DataTypes.DATEONLY, allowNull: false },
  start_time: { type: DataTypes.STRING, allowNull: false },
  end_time: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  category: { type: DataTypes.STRING }
}, {
  tableName: 'Programs',
});


  return Program;
};
