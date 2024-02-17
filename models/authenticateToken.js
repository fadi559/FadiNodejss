const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key'; // Use the same key as when you signed your JWTs


   
   const authenticateToken = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
    if (token == null) return res.sendStatus(401); // if there's no token
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403); // if the token is invalid or expired
  
      req.user = user; // Add the user to the request object
      next(); // Move to the next middleware or request handler
    });
  };
   
  