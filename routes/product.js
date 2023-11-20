import Express from 'express';
import { getAllProducts, populateProduct } from '../controller/product.js';

const router = Express.Router();

/**
 * @Route     /product/all
 * @Method    GET
 * @Access    Public
 * @Desc      Fetch all product from the FakeStore API
 */
router.get('/all', getAllProducts);

/**
 * @Route     /product/populate
 * @Method    GET
 * @Access    Admin
 * @Desc      Fetch all product from the FakeStore API and insert them to database (development only)
 */
// router.get('/populate', populateProduct);

/** The whole routes of the product module. */
export const productRoutes = router;
