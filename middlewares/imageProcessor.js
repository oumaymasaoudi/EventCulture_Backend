const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const processImage = async (req, res, next) => {
  try {
    if (!req.file) return next(); // Aucune image à traiter

    const inputPath = req.file.path;
    const outputFilename = 'processed-' + req.file.filename + '.jpg';
    const outputPath = path.join('uploads', outputFilename);

    // ✅ Traitement image avec Sharp
    await sharp(inputPath)
      .resize(500, 500, { fit: 'cover' })
      .toFormat('jpeg')
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    // ✅ Suppression sécurisée du fichier temporaire
    fs.access(inputPath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(inputPath, (err) => {
          if (err) console.warn("Impossible de supprimer l'image originale :", err.message);
        });
      }
    });

    // ✅ Remplacer par le nouveau nom
    req.file.filename = outputFilename;
    req.file.path = outputPath;

    next();
  } catch (error) {
    console.error('Erreur traitement image:', error);
    next(error);
  }
};

module.exports = processImage;
