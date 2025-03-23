const jwt = require("jsonwebtoken");

const authMiddleware = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const token = authorization.replace("bearer ", "");
      request.user = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      return response.status(401).json({ error: "token invalid or expired" });
    }
  } else {
    return response.status(401).json({ error: "token missing" });
  }
  next();
};

module.exports = authMiddleware;
