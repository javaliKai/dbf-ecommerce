import connectDB from '../util/connectDB.js';

const conn = connectDB();

export const getCustomerAddress = async (customerId) => {
  const sql = `SELECT * FROM customer_address WHERE cust_id=? AND is_selected=1`;
  const values = [customerId];

  const [row] = await conn.query(sql, values);

  return row.length === 0 ? null : row[0];
};

export const insertNewAddress = async ({
  customerId,
  country,
  province,
  state,
  addressDetail,
}) => {
  // Make the all existing customer address is_selected value to 0, meaning, the newly created
  // address will automatically be the selected address
  let sql = `UPDATE customer_address SET is_selected=0 WHERE cust_id=?`;
  let values = [customerId];

  await conn.query(sql, values);

  // Insert new address
  sql = `
    INSERT INTO customer_address(cust_id, country, province, state, address_detail, is_selected) 
    VALUES (?, ?, ?, ?, ?, 1)
  `;
  values = [customerId, country, province, state, addressDetail];

  const [row] = await conn.query(sql, values);

  // Return back the newly created address with address ID
  const newAddress = {
    address_id: row.insertId,
    customer_id: customerId,
    country,
    province,
    state,
    address_detail: addressDetail,
    is_selected: 1,
  };

  return newAddress;
};

export const selectCustomerAddress = async (customerId, addressId) => {
  // Reset all addresses is_selected to 0
  let sql = `UPDATE customer_address SET is_selected=0 WHERE cust_id=?`;
  let values = [customerId];

  await conn.query(sql, values);

  // Set the selected addressId is_selected attribute to 1
  sql = `UPDATE customer_address SET is_selected=1 WHERE address_id=?`;
  values = [addressId];

  await conn.query(sql, values);

  const selectedAddressObj = {
    address_id: addressId,
    customer_id: customerId,
    is_selected: 1,
  };

  return selectedAddressObj;
};

export const findSelectedCustomerAddressId = async (customerId) => {
  const sql = `SELECT address_id FROM customer_address WHERE cust_id=? AND is_selected=1`;
  const values = [customerId];

  const [row] = await conn.query(sql, values);

  return row.length === 0 ? null : row[0].address_id;
};
