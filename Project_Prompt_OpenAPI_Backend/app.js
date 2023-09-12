const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Variables d'environement !!!
const app = express();

const reqRoute = require("./routes/index");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content, Accept, Content-Type"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const corsOptions = {
  origin: "*", // Remplacer par l'origine de votre application
  optionsSuccessStatus: 200, // Certains navigateurs renvoient un code d'état 204, ce qui peut causer des problèmes, donc nous forçons un code 200 ici.
};

// Activer CORS pour toutes les routes
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", reqRoute);

module.exports = app;
