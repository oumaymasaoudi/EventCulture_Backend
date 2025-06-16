const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log("🧪 Token reçu :", token);

  if (!token) {
    return res.status(403).json({ message: 'Token manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token décodé :", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Token invalide :", err.message);
    return res.status(401).json({ message: 'Token invalide' });
  }
};
