import connectDB from '../util/connectDB.js';

const conn = connectDB();

export const fetchAllProducts = async () => {
  const [row] = await conn.query(`SELECT * FROM product`);
  return row;
};

export const insertNewProduct = async ({
  productId,
  productName,
  productDescription,
  productImage,
  productPrice,
  productCategory,
}) => {
  const sql = `
    INSERT INTO product
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [
    productId,
    productName,
    productDescription,
    productImage,
    productPrice,
    productCategory,
  ];

  await conn.query(sql, values);

  const newProduct = {
    product_id: productId,
    produc_name: productName,
    product_description: productDescription,
    product_image: productImage,
    product_price: productPrice,
    product_category: productCategory,
  };

  return newProduct;
};

export const updateProduct = async ({
  productId,
  productName,
  productDescription,
  productImage,
  productPrice,
  productCategory,
}) => {
  const sql = `
      UPDATE product SET 
        product_name=?,
        product_description=?,
        product_image=?,
        product_price=?,
        product_category=?
      WHERE product_id=?
  `;

  const values = [
    productName,
    productDescription,
    productImage,
    productPrice,
    productCategory,
    productId,
  ];

  await conn.query(sql, values);

  const updatedProduct = {
    product_id: productId,
    product_name: productName,
    product_description: productDescription,
    product_image: productImage,
    product_price: productPrice,
    product_category: productCategory,
  };

  return updatedProduct;
};

export const deleteProduct = async (productId) => {
  const sql = `DELETE FROM product WHERE product_id=?`;
  const values = [productId];

  const [row] = await conn.query(sql, values);

  return row.affectedRows;
};
