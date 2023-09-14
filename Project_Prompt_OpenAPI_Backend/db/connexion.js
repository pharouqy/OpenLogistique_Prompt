const mongoose = require("mongoose");

mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    console.log("Connexion réussie à MongoDB !!!");
  })
  .catch((error) => {
    console.log("Connexion échoué à MongoDB !!!", error);
  });

exports.module = mongoose;
