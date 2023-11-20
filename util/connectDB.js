import mysql from 'mysql2';
import dotenv from 'dotenv';

// Create a config controller to enable environment variable transaction
dotenv.config();

/** Initiate a database connectivity and return the connection pool object if succeed. */
const connectDB = () => {
  // Create a connection pool
  const pool = mysql.createPool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  return pool.promise();
};

export default connectDB;
