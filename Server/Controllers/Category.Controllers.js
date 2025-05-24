import { connectUserDB } from "../DataBase/index.js";

export const createCategory = async (req, res) => {
  const { Name, status } = req.body;
  if (!Name || !["Active", "DisActive"].includes(status)) {
    return res.status(400).json({ message: "Invalid Name or status" });
  }
  try {
    const Category_DataBase = req.user?.Category_DataBase;
    const userId = req.user?.id;
    const connection = await connectUserDB(Category_DataBase);

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        status ENUM('Active', 'DisActive') NOT NULL DEFAULT 'Active',
        UserId VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await connection.execute(createTableQuery);

    const [result] = await connection.execute(
      "INSERT INTO categories (Name, status, UserId) VALUES (?, ?, ?)",
      [Name, status, userId]
    );

    res.status(201).json({ message: "Category created", id: result.insertId });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const Category_DataBase = req.user?.Category_DataBase;
    const userId = req.user?.id;
    const connection = await connectUserDB(Category_DataBase);

    const [rows] = await connection.execute(
      "SELECT * FROM categories WHERE UserId = ?",
      [userId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Read all error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const Category_DataBase = req.user?.Category_DataBase;
    const userId = req.user?.id;
    const connection = await connectUserDB(Category_DataBase);

    const [rows] = await connection.execute(
      "SELECT * FROM categories WHERE id = ? AND UserId = ?",
      [id, userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Read one error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { Name, status } = req.body;

  if (!Name || !["Activity", "DisActivity"].includes(status)) {
    return res.status(400).json({ message: "Invalid Name or status" });
  }

  try {
    const Category_DataBase = req.user?.Category_DataBase;
    const userId = req.user?.id;
    const connection = await connectUserDB(Category_DataBase);

    const [result] = await connection.execute(
      "UPDATE categories SET Name = ?, status = ? WHERE id = ? AND UserId = ?",
      [Name, status, id, userId]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Category not found or not authorized" });
    }

    res.status(200).json({ message: "Category updated" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const Category_DataBase = req.user?.Category_DataBase;
    const userId = req.user?.id;
    const connection = await connectUserDB(Category_DataBase);

    const [result] = await connection.execute(
      "DELETE FROM categories WHERE id = ? AND UserId = ?",
      [id, userId]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Category not found or not authorized" });
    }

    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
