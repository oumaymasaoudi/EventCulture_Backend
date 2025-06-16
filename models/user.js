module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('participant', 'professionnel', 'admin')
    },
    organization: DataTypes.STRING,
    address: DataTypes.STRING, // Assurez-vous d'inclure tous les champs nécessaires
    siret: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  return User;
};
