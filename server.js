import Express from 'express';
import { productRoutes } from './routes/product.js';
import { customerRoutes } from './routes/customer.js';
import { clerkRoutes } from './routes/clerk.js';
import { authRoutes } from './routes/auth.js';

const app = Express();

// BASIC MIDDLEWARE
app.use(Express.json());

// ROUTING MIDDLEWARE
app.use('/product', productRoutes);
app.use('/customer', customerRoutes);
app.use('/clerk', clerkRoutes);
app.use('/auth', authRoutes);

// ERROR MIDDLEWARE
app.use((err, req, res, next) => {
  console.error(err.stack); // log the error for debugging purpose

  const statusCode = err.status || 500;
  const message = err.message;
  const data = err.data;
  res.status(statusCode).json({ message, data });
});

// SERVER INITIALIZATION
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
