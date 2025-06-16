module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.STRING,
    date_start: DataTypes.DATE,
    date_end: DataTypes.DATE,
    price: DataTypes.DECIMAL,
    image_url: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    lieu_id: DataTypes.INTEGER
  }, {
    tableName: 'Events'
  });

  // ✅ Association → très important
  Event.associate = (models) => {
    Event.belongsTo(models.Lieu, { foreignKey: 'lieu_id', as: 'lieu' });
  };

  return Event;
};
