// models/location.js

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    
 name: { type: DataTypes.STRING, allowNull: false },
address: { type: DataTypes.TEXT, allowNull: false },
city: { type: DataTypes.STRING, allowNull: false },
country: { type: DataTypes.STRING, allowNull: false },

    description: {
      type: DataTypes.TEXT
    },
    image_url: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'locations'
  });

  Location.associate = models => {
    Location.hasMany(models.Parcours, { foreignKey: 'location_id' });
  };

  return Location;
};