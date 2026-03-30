const jwt = require("jsonwebtoken");
const Admin = require("../models/authModel");
const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleWare = async (req, res, next) => {
  const authorization = req.headers.authorization;
  try {
    if (!authorization || !authorization.startsWith("Bearer "))
      return res.status(401).json({ message: "Invalid Token", success: false });

    const token = authorization.split(" ")[1];

    const verifiedToken = jwt.verify(token, SECRET_KEY);

    if (!verifiedToken)
      return res.status(401).json({ message: "Invalid Token", success: false });

    const verifiedUser = await Admin.findOne({
      email: verifiedToken?.email,
    }).select("-password");

    if (!verifiedUser)
      return res
        .status(401)
        .json({ message: "Not A Valid User", success: false });

    req.user = verifiedUser;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res
        .status(401)
        .json({ message: "Token Expired ! ", success: false });

    if (error.name === "JsonWebTokenError")
      return res
        .status(401)
        .json({ message: "Invalid Token! ", success: false });

    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = authMiddleWare;
