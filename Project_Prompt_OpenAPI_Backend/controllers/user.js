const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé !" });
      }
      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if (!valid) {
          return res.status(401).json({ message: "Mot de passe incorrect !" });
        }
        res.status(200).json({
          userId: user._id,
          token: jwt.sign(
            { email: req.body.email, userId: user._id },
            process.env.SECRET_TOKEN,
            {
              expiresIn: process.env.EXPIRE_TIME_TOKEN,
            }
          ),
        });
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.register = (req, res, next) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      ...req.body,
      password: hash,
    });
    user
      .save()
      .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
      .catch((error) => res.status(400).json({ error }));
  });
};

exports.logout = (req, res, next) => {
  res.status(200).json({ message: "Déconnexion réussie" });
};
