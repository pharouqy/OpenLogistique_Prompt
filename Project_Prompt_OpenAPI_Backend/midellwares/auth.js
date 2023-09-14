const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("🚀 ~ file: auth.js:5 ~ token:", token)
  const decodeToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodeToken.userId;
  try {
    if (!userId) {
      res.status(403).json({ message: "Le userId est invalid !!!" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
