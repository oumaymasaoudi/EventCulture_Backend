module.exports = (sequelize, DataTypes) => {
 const Lieu = sequelize.define('Lieu', { 
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ville: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pays: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    site_web: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
     }
  }, {
    tableName: 'lieux'
  });


 Lieu.associate = (models) => {
  Lieu.belongsTo(models.User, { foreignKey: 'user_id' });
  Lieu.hasMany(models.Site, { foreignKey: 'lieu_id' });
};

return Lieu;

};
