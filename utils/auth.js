const { sign, verify } = require("jsonwebtoken");
const { compare } = require("bcryptjs");

const KEY = "youwillneverguess";

function createJWToken(email) {
  return sign({ email }, KEY, { expiresIn: "1h" });
}

function validateJWToken(token) {
  return verify(token, KEY);
}

function isValidPwd(password, storedPassword) {
  return compare(password, storedPassword);
}

function AuthMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    return next;
  }
  if (!req.headers.authorization) {
    console.log("NOT AUTHORISED. AUTHORISATION HEADER MISSING.");
    return next(new Error("Not Authenticated"));
  }

  const authFragments = req.headers.authorization.split(" ");

  if (authFragments.length !== 2) {
    console.log("NOT AUTH. AUTH HEADER INVALID.");
    return next(new Error("Not authenticated."));
  }

  const authToken = authFragments[1];
  try {
    const validateToken = validateJWToken(authToken);
    req.token = validateToken;
  } catch (err) {
    console.log("NOT AUTH. TOKEN INVALID.");
    return next(new Error("Not authenticated."));
  }
  next();
}

exports.createJWToken = createJWToken;
exports.validateJWToken = validateJWToken;
exports.isValidPwd = isValidPwd;
exports.AuthMiddleware = AuthMiddleware;
