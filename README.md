# Task-e-commerce

An e-commerce Full Stack built with **React.js**,**Node.js**, **Express**, and **MySQL**. It supports user authentication, product management, and secure API integration using JWT.

---

## 🏗️ Tech Stack

- **Frontend**: React.js, Redux
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JSON Web Tokens (JWT)
- **Environment Management**: dotenv

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/task-e-commerce.git
cd task-e-commerce
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following content:

```env
HOST=localhost
USER=root
PASSWORD=*******
DATABASE_NAME=techstrock_db
JWT_SECRET=djfhdsufsgtuyewieyuwpms;malbdksbfdlshfoi'wqopknsalmn
```

> ⚠️ Do **not** commit your `.env` file to version control.

### 4. Create the Database

Ensure MySQL is running on your system and execute:

```sql
CREATE DATABASE IF NOT EXISTS techstrock_db;
```

You can do this using a MySQL client like MySQL Workbench, phpMyAdmin, or the terminal.

### 5. Run the Server

```bash
npm start
```

Your server should be running at: [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
task-ecommerce/
├── Database/
│   └── index.js            # MySQL connection setup
├── routes/                 # API routes
├── controllers/            # Route logic
├── middleware/             # Authentication middleware
├── models/                 # DB models (if using ORM or queries)
├── .env                    # Environment variables
├── server.js               # Entry point
├── package.json
└── README.md
```

---

## 🔐 JWT Authentication

This project uses JWT for secure authentication. After logging in or signing up, users receive a token to access protected routes.

---

## 📦 Features

- User registration and login
- JWT-based authentication
- Product and order management
- RESTful API architecture
