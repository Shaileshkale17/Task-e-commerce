import { connectMainDB } from "../DataBase/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const CreateUser = async (req, res) => {
  try {
    const { Phone, FullName, Email, Password, Category_DataBase } = req.body;
    if (!Phone || !FullName || !Email || !Password || !Category_DataBase) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const connection = await connectMainDB();

    const DynamicDataBase = `CREATE DATABASE IF NOT EXISTS ${Category_DataBase}`;
    await connection.execute(DynamicDataBase);

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        FullName VARCHAR(100),
        Email VARCHAR(100) UNIQUE,
        Phone VARCHAR(15),
        Password VARCHAR(255),
        Category_DataBase VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await connection.execute(createTableQuery);

    const [existing] = await connection.execute(
      `SELECT * FROM users WHERE Email = ?`,
      [Email]
    );
    if (existing.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    await connection.execute(
      `INSERT INTO users (FullName, Email, Phone, Password, Category_DataBase) VALUES (?, ?, ?, ?, ?)`,
      [FullName, Email, Phone, hashedPassword, Category_DataBase]
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const LoginUser = async (req, res) => {
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const connection = await connectMainDB();
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE Email = ?",
      [Email]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.Email,
        Category_DataBase: user.Category_DataBase,
      },
      process.env.JWT_SECRET || "ABCHDGSKshsu"
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        FullName: user.FullName,
        Email: user.Email,
        Phone: user.Phone,
        Category_DataBase: user.Category_DataBase,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const allUser = async (req, res) => {
  try {
    const connection = await connectMainDB();
    const [rows] = await connection.query("SELECT * FROM users");
    res.status(200).json({
      message: "Successful",
      data: rows,
    });
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await connectMainDB();
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Fetch single user error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { FullName, Phone, Email, Password } = req.body;

  try {
    const connection = await connectMainDB();

    const [existing] = await connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    if (existing.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = Password
      ? await bcrypt.hash(Password, 10)
      : existing[0].Password;

    await connection.execute(
      `UPDATE users SET FullName = ?, Email = ?, Phone = ?, Password = ? WHERE id = ?`,
      [
        FullName || existing[0].FullName,
        Email || existing[0].Email,
        Phone || existing[0].Phone,
        hashedPassword,
        id,
      ]
    );

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Update user error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await connectMainDB();
    const [existing] = await connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    if (existing.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    await connection.execute("DELETE FROM users WHERE id = ?", [id]);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
