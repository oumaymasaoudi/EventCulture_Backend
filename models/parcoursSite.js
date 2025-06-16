module.exports = (sequelize, DataTypes) => {
  const ParcoursSite = sequelize.define('ParcoursSite', {
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30
    }
  }, {
    tableName: 'ParcoursSite'
  });

  return ParcoursSite;
};
