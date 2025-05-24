import { connectUserDB } from "../DataBase/index.js";

export const createProduct = async (req, res) => {
  const { Name, Category_Name, Price } = req.body;

  if (!Name || !Category_Name || !Price) {
    return res.status(400).json({ message: "Missing or invalid fields" });
  }

  try {
    const { Category_DataBase, id: userId } = req.user;
    const connection = await connectUserDB(Category_DataBase);

    await connection.execute(`
        CREATE TABLE IF NOT EXISTS products (
          id INT AUTO_INCREMENT PRIMARY KEY,
          Name VARCHAR(255) NOT NULL,
          CategoryName VARCHAR(255) NOT NULL,
          Price DECIMAL(10, 2) NOT NULL,
          status ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
          UserId VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

    const [categoryRows] = await connection.execute(
      "SELECT Name, status FROM categories WHERE UserId = ?",
      [userId]
    );

    if (categoryRows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    const { Name: categoryName, status } = categoryRows[0];

    const [result] = await connection.execute(
      "INSERT INTO products (Name, CategoryName, Price, status, UserId) VALUES (?, ?, ?, ?, ?)",
      [Name, categoryName, Price, status, userId]
    );

    res.status(201).json({
      message: "Product created successfully",
      productId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { Category_DataBase, id: userId } = req.user;
    const connection = await connectUserDB(Category_DataBase);

    const [rows] = await connection.execute(
      "SELECT * FROM products WHERE UserId = ?",
      [userId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const { Category_DataBase, id: userId } = req.user;
    const connection = await connectUserDB(Category_DataBase);

    const [rows] = await connection.execute(
      "SELECT * FROM products WHERE id = ? AND UserId = ?",
      [id, userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { Name, Category_Name, Price, status } = req.body;

  try {
    const { Category_DataBase, id: userId } = req.user;
    const connection = await connectUserDB(Category_DataBase);

    const [existing] = await connection.execute(
      "SELECT * FROM products WHERE id = ? AND UserId = ?",
      [id, userId]
    );
    if (existing.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Optional: validate category again
    let categoryName = existing[0].CategoryName;
    if (Category_Name) {
      const [categoryRows] = await connection.execute(
        "SELECT Name FROM categories WHERE Name = ? AND UserId = ?",
        [Category_Name, userId]
      );
      if (categoryRows.length === 0) {
        return res.status(404).json({ message: "Category not found" });
      }
      categoryName = categoryRows[0].Name;
    }

    await connection.execute(
      `UPDATE products SET 
          Name = COALESCE(?, Name),
          CategoryName = COALESCE(?, CategoryName),
          Price = COALESCE(?, Price),
          status = COALESCE(?, status)
        WHERE id = ? AND UserId = ?`,
      [Name, categoryName, Price, status, id, userId]
    );

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const { Category_DataBase, id: userId } = req.user;
    const connection = await connectUserDB(Category_DataBase);

    const [result] = await connection.execute(
      "DELETE FROM products WHERE id = ? AND UserId = ?",
      [id, userId]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Product not found or unauthorized" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};
