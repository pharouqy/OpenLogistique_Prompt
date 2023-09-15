const rateLimit = require("express-rate-limit"); // Limite le nombre de requêtes et éviter les attaques (Brute Force & DDOS)

module.exports = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 3, // Limit each IP to 10 requests per `window` (here, per 30 minutes)
  message:
    "Too many requests sended from this IP, please try again after 30 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: true, // Disable the `X-RateLimit-*` headers
});
