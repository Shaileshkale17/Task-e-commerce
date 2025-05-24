import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./Routers/User.routes.js";
import CategoryRoutes from "./Routers/Category.routes.js";
import productsRoutes from "./Routers/Products.routes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN || "*",
  })
);

app.use("/api/category", CategoryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productsRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Connected to MySQL");
  console.log(`Server running on http://localhost:${PORT}`);
});
