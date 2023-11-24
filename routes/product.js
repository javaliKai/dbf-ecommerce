import Express from 'express';
import { body } from 'express-validator';
import clerkAuth from '../middlewares/clerkAuth.js';
import {
  addNewProduct,
  editProduct,
  getAllProducts,
  populateProduct,
  removeProduct,
} from '../controller/product.js';

const router = Express.Router();

/**
 * @Route     /product/all
 * @Method    GET
 * @Access    Public
 * @Desc      Fetch all product from the FakeStore API
 */
router.get('/all', getAllProducts);

/**
 * @Route     /product
 * @Method    POST
 * @Access    Private
 * @Desc      Add new product to the database
 */
router.post(
  '/',
  clerkAuth,
  [
    body('productName')
      .trim()
      .notEmpty()
      .withMessage('Please provide a valid productName.'),
    body('productDescription')
      .trim()
      .notEmpty()
      .withMessage('Please provide a valid productDescription.'),
    body('productImage')
      .trim()
      .notEmpty()
      .withMessage('Please provide a valid productImage.'),
    body('productPrice')
      .isNumeric()
      .withMessage('Please provide a valid productPrice.'),
    body('productCategory')
      .trim()
      .notEmpty()
      .withMessage('Please provide a valid productCategory.'),
  ],
  addNewProduct
);

/**
 * @Route     /product/update
 * @Method    PUT
 * @Access    Private
 * @Desc      Update existing product
 */
router.put(
  '/update',
  clerkAuth,
  [
    body('productId')
      .trim()
      .notEmpty()
      .withMessage('Please provide a valid producId'),
    body('productName')
      .trim()
      .notEmpty()
      .withMessage('Please provide a valid productName.'),
    body('productDescription')
      .trim()
      .notEmpty()
      .withMessage('Please provide a valid productDescription.'),
    body('productImage')
      .trim()
      .notEmpty()
      .withMessage('Please provide a valid productImage.'),
    body('productPrice')
      .isNumeric()
      .withMessage('Please provide a valid productPrice.'),
    body('productCategory')
      .trim()
      .notEmpty()
      .withMessage('Please provide a valid productCategory.'),
  ],
  editProduct
);

/**
 * @Route     /product/:productId
 * @Method    DELETE
 * @Access    Private
 * @Desc      Delete product based on the productId
 */
router.delete('/:productId', clerkAuth, removeProduct);

/**
 * @Route     /product/populate
 * @Method    GET
 * @Access    Admin
 * @Desc      Fetch all product from the FakeStore API and insert them to database (development only)
 */
// router.get('/populate', populateProduct);

/** The whole routes of the product module. */
export const productRoutes = router;
