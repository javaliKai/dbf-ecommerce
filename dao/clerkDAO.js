import connectDB from '../util/connectDB.js';

const conn = connectDB();

export const insertNewClerk = async (name, email, password) => {
  // Prepare sql statement
  const sql = `
    INSERT INTO clerk(clerk_name, clerk_email, clerk_password) 
    VALUES (?, ?, ?)
  `;

  const values = [name, email, password];

  // Execute the query
  const [row] = await conn.query(sql, values);

  // Construct the new clerk object and return
  const clerk = {
    clerk_id: row.insertId,
    clerk_name: name,
    clerk_email: email,
    clerk_password: password,
  };

  return clerk;
};

export const findClerkByEmail = async (email) => {
  const sql = `
    SELECT * FROM clerk WHERE clerk_email=?
  `;
  const values = [email];

  const [row] = await conn.query(sql, values);

  return row.length === 0 ? null : row[0];
};
