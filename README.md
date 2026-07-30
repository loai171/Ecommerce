# E-Commerce RESTful API 🛒

A scalable backend RESTful API for an E-Commerce platform built with **Node.js**, **Express 5**, **TypeScript**, and **MongoDB**.

---

## 🚀 Features

- 🏗️ **Modular Architecture**: Feature-driven modular layout (Controller, Service, Repository, Validator, Schema, DTO).
- 🔑 **Authentication & Authorization**: JWT-based authentication using **Access Tokens** & **Refresh Tokens**.
- 🔄 **Refresh Token Rotation & Security**: 
  - Token hashing (`SHA-256`) before database storage.
  - Token revocation support (Single Token Revoke & Revoke All User Sessions).
- 🔒 **Password Hashing**: Secure password hashing with `bcrypt` salt rounds.
- ✅ **Input Validation**: Request body and parameter validation using `express-validator`.
- ⚡ **TypeScript First**: Strict type checking and modern ES module syntax.
- 🛠️ **Centralized Error Handling**: Custom `AppError` class with standard HTTP status codes and global error handling middleware.

---

## 🛠️ Tech Stack

- **Runtime & Framework**: Node.js & Express 5
- **Language**: TypeScript
- **Database & ODM**: MongoDB & Mongoose
- **Authentication**: JSON Web Tokens (`jsonwebtoken`)
- **Security & Utilities**: bcrypt, ms, express-validator
- **Development Tools**: tsx, nodemon

---

## 📁 Project Structure

```text
ecommerce/
├── src/
│   ├── config/             # Database connection & env variable setups
│   │   ├── db.ts
│   │   └── env.ts
│   ├── constants/          # Application constants
│   ├── middlewares/        # Custom Express middlewares (Auth, Error handling, Validation)
│   │   ├── auth.middleware.ts
│   │   ├── error-handler.ts
│   │   └── validate.middleware.ts
│   ├── modules/            # Feature modules
│   │   ├── auth/           # Authentication module
│   │   │   ├── dto/
│   │   │   ├── repository/
│   │   │   ├── schema/
│   │   │   ├── services/
│   │   │   ├── validations/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.route.ts
│   │   │   └── auth.service.ts
│   │   └── user/           # User module
│   │       ├── dto/
│   │       ├── repository/
│   │       ├── schema/
│   │       ├── validations/
│   │       ├── user.controller.ts
│   │       ├── user.route.ts
│   │       └── user.service.ts
│   ├── routes/             # Core API route registry
│   │   └── index.ts
│   ├── types/              # Global TypeScript interfaces & types
│   ├── utils/              # Helper functions & AppError
│   ├── app.ts              # Express application setup
│   └── server.ts           # Server entry point
├── .env.example
├── package.json
└── tsconfig.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory based on the following template:

```env
PORT=3000

DB_HOST=127.0.0.1
DB_PORT=27017
DB_NAME=ecommerce

SALT_ROUNDS=10

# JWT Settings
JWT_SECRET=your_access_token_secret
JWT_EXPIRES_IN=15m

# Refresh Token Settings
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=7d
```

---

## 🔧 Installation & Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run in Development Mode:**

   ```bash
   npm run dev
   ```

3. **Start Production Server:**

   ```bash
   npm start
   ```

---

## 📡 API Endpoints

All API endpoints are prefixed with `/api/v1`.

### 🔐 Authentication Endpoints (`/api/v1/auth`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Register a new user | ❌ No |
| `POST` | `/api/v1/auth/login` | Login user & return Access + Refresh Tokens | ❌ No |
| `POST` | `/api/v1/auth/refresh` | Refresh Access Token & rotate Refresh Token | ❌ No |
| `POST` | `/api/v1/auth/logout` | Revoke current Refresh Token | ❌ No |
| `POST` | `/api/v1/auth/logout-all` | Revoke all active Refresh Tokens for a user | ❌ No |

### 👤 User Endpoints (`/api/v1/users`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/users` | Create a user | ❌ No |
| `GET` | `/api/v1/users` | Retrieve all users | ❌ No |
| `GET` | `/api/v1/users/profile` | Get current authenticated user profile | ✅ Yes |
| `GET` | `/api/v1/users/:id` | Fetch a user by ID | ❌ No |
| `PATCH` | `/api/v1/users/:id` | Update user details | ❌ No |
| `DELETE` | `/api/v1/users/:id` | Delete a user | ❌ No |
| `POST` | `/api/v1/users/address` | Add user address | ❌ No |

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).
