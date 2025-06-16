const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      phone,
      address,
      role,
      organization,
      siret,
      description
    } = req.body;

    if (!first_name || !email || !password) {
      return res.status(400).json({ error: 'Champs requis manquants' });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email déjà utilisé' });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hash,
      phone,
      address,
      role,
      organization: role === 'professionnel' ? organization : null,
      siret: role === 'professionnel' ? siret : null,
      description: role === 'professionnel' ? description : null
    });

    const { password: _, ...userData } = user.toJSON();
    res.status(201).json(userData);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📥 Données reçues pour connexion :", { email, password });

    if (!email || !password) {
      return res.status(400).json({ error: 'Champs requis' });
    }

    const user = await User.findOne({ where: { email } });
    console.log("🔎 Utilisateur trouvé :", user);

    if (!user) {
      return res.status(401).json({ error: "Email incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔐 Résultat bcrypt.compare :", isMatch);

    if (!isMatch) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
  {
    id: user.id,              // ✅ ID nécessaire pour `req.user.id`
    email: user.email,
    role: user.role
  },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

    const { password: _, ...userData } = user.toJSON();
    res.json({ token, user: userData });

  } catch (e) {
    console.error("❌ Erreur serveur :", e);
    res.status(400).json({ error: e.message });
  }
};




