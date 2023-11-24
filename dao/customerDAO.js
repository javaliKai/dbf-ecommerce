import connectDB from '../util/connectDB.js';

const conn = connectDB();

export const getAllCustomers = async () => {
  const [row] = await conn.query('SELECT * FROM customer');
  return row;
};

export const insertNewCustomer = async (name, phone, email, password) => {
  // Prepare sql statement
  const sql = `
    INSERT INTO customer(cust_name, cust_phone, cust_email, cust_password) 
    VALUES (?, ?, ?, ?)
  `;

  const values = [name, phone, email, password];

  // Execute the query
  const [row] = await conn.query(sql, values);

  // Construct the new customer object and return
  const customer = {
    cust_id: row.insertId,
    cust_name: name,
    cust_phone: phone,
    cust_email: email,
    cust_password: password,
  };

  return customer;
};

export const findCustomerByEmail = async (email) => {
  const sql = `
    SELECT * FROM customer WHERE cust_email=?
  `;
  const values = [email];

  const [row] = await conn.query(sql, values);

  return row.length === 0 ? null : row[0];
};

export const updateCustomer = async ({ customerId, name, phone, email }) => {
  const sql = `
    UPDATE customer SET
      cust_name=?,
      cust_phone=?,
      cust_email=?
    WHERE cust_id=? 
  `;
  const values = [name, phone, email, customerId];

  await conn.query(sql, values);

  const updatedCustomer = {
    cust_id: customerId,
    cust_name: name,
    cust_phone: phone,
    cust_email: email,
  };

  return updatedCustomer;
};
