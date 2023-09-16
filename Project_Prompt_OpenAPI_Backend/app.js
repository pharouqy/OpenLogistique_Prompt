const http = require("http");
const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Variables d'environement !!!
const helmet = require("helmet");
require("./db/connexion");

const app = express();

const userRoute = require("./routes/user");
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

// En désactivant cette option avec la valeur false, nous permettons aux ressources d'être chargées à partir de différents domaines et origines.
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(express.json());

app.use("/api", reqRoute);
app.use("/auth", userRoute);

const server = http.createServer(app);

server.on("listening", () => {
  console.log(`listening on ${process.env.PORT}`);
});

server.listen(process.env.PORT);
