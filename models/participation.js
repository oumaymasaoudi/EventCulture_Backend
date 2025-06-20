module.exports = (sequelize, DataTypes) => {
  const Participation = sequelize.define('Participation', {
    event_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    statut: { type: DataTypes.STRING },
    date_inscription: { type: DataTypes.DATEONLY },
    motivation: { type: DataTypes.TEXT },
    demandes_speciales: { type: DataTypes.TEXT }, // ✅ Ajouté
    montant_paye: { type: DataTypes.FLOAT },      // ✅ Ajouté pour paiement
    payment_status: { type: DataTypes.STRING },   // ✅ Ajouté pour suivi du paiement
    oeuvres_images: { type: DataTypes.JSON }      // ex: liste d'URLs d'images
  }, {
    tableName: 'Participations',
  });

  return Participation;
};
