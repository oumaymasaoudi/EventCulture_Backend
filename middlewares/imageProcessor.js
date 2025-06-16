// middlewares/imageProcessor.js
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const processImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(); // aucune image envoyée
    }

    const inputPath = req.file.path;
    const outputFilename = 'processed-' + req.file.filename + '.jpg';
    const outputPath = path.join('uploads', outputFilename);

    await sharp(inputPath)
      .resize(500, 500, { fit: 'cover' }) // carré 500x500 en cropant proprement
      .toFormat('jpeg')
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    // On supprime l'image d'origine (non traitée)
    fs.unlinkSync(inputPath);

    // On modifie req.file pour qu'il pointe vers la nouvelle image
    req.file.filename = outputFilename;
    req.file.path = outputPath;

    next();
  } catch (error) {
    console.error('Erreur traitement image:', error);
    next(error);
  }
};

module.exports = processImage;
