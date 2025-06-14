import mysql2 from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connectMainDB = async () => {
  return await mysql2.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
  });
};
const connectUserDB = async (dbName) => {
  return await mysql2.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: dbName,
  });
};

export { connectMainDB, connectUserDB };
