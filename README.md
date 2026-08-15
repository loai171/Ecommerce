# E-Commerce RESTful API 🛒

A scalable backend RESTful API for an E-Commerce platform built with **Node.js**, **Express 5**, **TypeScript**, and **MongoDB**.

---

## 🚀 Features

- 🏗️ **Modular Architecture**: Feature-driven modular layout (Controller, Service, Repository, Validator, Schema, DTO).
- 💉 **Dependency Injection (DI)**: Decoupled service layer using container-based dependency instantiation (`src/container/`).
- 🔑 **Authentication & Authorization**: JWT-based authentication using **Access Tokens** & **Refresh Tokens**.
- 🔄 **Refresh Token Rotation & Security**:
  - Token hashing (`SHA-256`) before database storage.
  - Token revocation support (Single Token Revoke & Revoke All User Sessions).
- 📦 **Product Management**: Full CRUD for Products, Product Categories, and Product Variants.
  - Products are linked to a Category that defines allowed attributes.
  - Variants hold the actual `price`, `stock`, `sku`, and typed `attributesValue` per product.
  - Cascade delete: deleting a product also deletes all its variants.
- 🛒 **Shopping Cart Management**:
  - User-specific persistent cart (One cart per user).
  - Add items using variant `variantSku` with stock validation.
  - Update item quantities dynamically by SKU.
  - Remove specific items by SKU or clear the entire cart.
- 👤 **User & Address Management**: User registration, profile management, and multi-address support.
- 🔒 **Password Hashing**: Secure password hashing with `bcrypt` salt rounds.
- ✅ **Input Validation**: Request body, params, and query validation using `express-validator`.
- ⚡ **TypeScript First**: Strict type checking and modern ES module syntax.
- 🛠️ **Centralized Error Handling**: Custom `AppError` class with standard HTTP status codes and global error handling middleware.

---

## 🛠️ Tech Stack

- **Runtime & Framework**: Node.js & Express 5
- **Language**: TypeScript
- **Database & ODM**: MongoDB & Mongoose
- **Authentication**: JSON Web Tokens (`jsonwebtoken`)
- **Security & Utilities**: bcrypt, ms, express-validator, cookie-parser
- **Development Tools**: tsx, nodemon

---

## 📁 Project Structure

```text
ecommerce/
├── src/
│   ├── config/             # Database connection, cookie & env setups
│   │   ├── cookie.ts
│   │   ├── db.ts
│   │   └── env.ts
│   ├── constants/          # Application constants
│   ├── container/          # Dependency Injection (DI) containers
│   │   ├── auth.container.ts
│   │   ├── cart.container.ts
│   │   ├── product.container.ts
│   │   └── user.container.ts
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
│   │   ├── cart/           # Shopping Cart module
│   │   │   ├── dto/
│   │   │   ├── repository/
│   │   │   ├── schema/
│   │   │   ├── validations/
│   │   │   ├── cart.controller.ts
│   │   │   ├── cart.route.ts
│   │   │   └── cart.service.ts
│   │   ├── product/        # Product module
│   │   │   ├── controllers/          # Category & Variant controllers
│   │   │   ├── dto/                  # DTOs for Product, Category, Variant
│   │   │   ├── repository/           # Product, Category, Variant repositories
│   │   │   ├── schema/               # Mongoose schemas (Product, Category, Variant)
│   │   │   ├── service/              # Category & Variant services
│   │   │   ├── validation/           # Validators for all product resources
│   │   │   ├── product.controller.ts
│   │   │   ├── product.route.ts
│   │   │   └── product.service.ts
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
├── tsconfig.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory based on the following template:

```env
PORT=3000

# Database
DB_NAME=ecommerce
DB_HOST=127.0.0.1
DB_PORT=27017

# Hashing
SALT_ROUNDS=10

# JWT Settings
JWT_SECRET=your_access_token_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=7d

# Pagination Defaults
PAGINATION_DEFAULT_PAGE=1
PAGINATION_DEFAULT_LIMIT=10
PAGINATION_MAX_LIMIT=100
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
| `POST` | `/api/v1/auth/logout` | Revoke current Refresh Token | ✅ Yes |
| `POST` | `/api/v1/auth/logout-all` | Revoke all active Refresh Tokens for a user | ✅ Yes |

### 👤 User Endpoints (`/api/v1/users`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/users` | Create a user | ❌ No |
| `GET` | `/api/v1/users` | Retrieve all users | ❌ No |
| `GET` | `/api/v1/users/profile` | Get current authenticated user profile | ✅ Yes |
| `GET` | `/api/v1/users/:id` | Fetch a user by ID | ❌ No |
| `PATCH` | `/api/v1/users/:id` | Update user details | ❌ No |
| `DELETE` | `/api/v1/users/:id` | Delete a user | ❌ No |
| `POST` | `/api/v1/users/:id/addresses` | Add address to user profile | ❌ No |

### 📦 Product Endpoints (`/api/v1/product`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/product` | Create a new product | ✅ Yes |
| `GET` | `/api/v1/product` | Get all products (filtering by `categoryId` & pagination) | ✅ Yes |
| `GET` | `/api/v1/product/:slug` | Get product by slug | ✅ Yes |
| `PATCH` | `/api/v1/product/:slug` | Update product by slug | ✅ Yes |
| `DELETE` | `/api/v1/product/:slug` | Delete product by slug (cascades to variants) | ✅ Yes |
| `DELETE` | `/api/v1/product` | Delete all products (cascades to variants) | ✅ Yes |

### 🗂️ Product Category Endpoints (`/api/v1/product/product-categories`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/product/product-categories` | Create a new category | ✅ Yes |
| `GET` | `/api/v1/product/product-categories` | Get all categories | ✅ Yes |
| `GET` | `/api/v1/product/product-categories/:id` | Get category by ID | ✅ Yes |
| `PATCH` | `/api/v1/product/product-categories/:id` | Update category by ID | ✅ Yes |
| `DELETE` | `/api/v1/product/product-categories/:id` | Delete category by ID | ✅ Yes |

### 🔀 Product Variant Endpoints (`/api/v1/product/product-variants`)

> Variants represent specific combinations of attributes (e.g. `color: red, size: XL`) with their own `price`, `stock`, and `sku`.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/product/product-variants` | Create a new variant | ✅ Yes |
| `GET` | `/api/v1/product/product-variants/product/:productId` | Get all variants for a product | ✅ Yes |
| `GET` | `/api/v1/product/product-variants/:sku` | Get variant by SKU | ✅ Yes |
| `PATCH` | `/api/v1/product/product-variants/:sku` | Update variant by SKU | ✅ Yes |
| `DELETE` | `/api/v1/product/product-variants/:sku` | Delete variant by SKU | ✅ Yes |

### 🛒 Cart Endpoints (`/api/v1/cart`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/cart` | Get current user's shopping cart | ✅ Yes |
| `DELETE` | `/api/v1/cart` | Clear all items from current user's cart | ✅ Yes |
| `POST` | `/api/v1/cart/items` | Add item to cart (`variantSku`, optional `quantity`) | ✅ Yes |
| `PATCH` | `/api/v1/cart/items/:sku` | Update cart item quantity by variant SKU (`quantity`) | ✅ Yes |
| `DELETE` | `/api/v1/cart/items/:sku` | Remove item from cart by variant SKU | ✅ Yes |

---

## 🏗️ Data Models Architecture

```text
ProductCategory
  └── attributes: string[]                   # e.g. ["color", "size"]

Product
  ├── name: string
  ├── slug: string
  ├── description?: string
  ├── userId: ObjectId → User
  └── categoryId: ObjectId → ProductCategory

ProductVariant
  ├── productId: ObjectId → Product
  ├── sku: string                            # Unique SKU per variant
  ├── attributesValue: Map<string, string>   # e.g. { color: "red", size: "XL" }
  ├── price: number
  └── stock: number

Cart
  ├── userId: ObjectId → User (Unique Index)
  └── items: Array
      ├── variantId: ObjectId → ProductVariant
      └── quantity: number (min: 1)
```

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).
