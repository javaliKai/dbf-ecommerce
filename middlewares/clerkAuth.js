import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/** A middleware that ensures that an auth token is provided */
const clerkAuth = (req, res, next) => {
  // Get token from header
  const tokenHeader = req.header('Authorization');

  // Check if there is no token included
  if (!tokenHeader) {
    const err = new Error('Token authorization is needed.');
    err.status = 401;
    return next(err);
  }

  // Verify token
  const token = tokenHeader.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      const error = new Error('Authentication failed.');
      error.status = 401;
      return next(error);
    }

    // Set the user id to every req session
    if (!decodedToken.clerk_id) {
      const error = new Error('Invalid token.');
      error.status = 401;
      return next(error);
    } else {
      req.clerkId = decodedToken.clerk_id;
      next();
    }
  } catch (error) {
    next(error);
  }
};

export default clerkAuth;
