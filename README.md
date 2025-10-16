# 📦 Inventory Management System — Fullstack (Spring Boot + React + MySQL)

A full-stack web application for managing inventory, suppliers, and transactions with dynamic data visualization.  
The system features a **secure backend built with Spring Boot** and a **modern frontend built with React**, connected through a well-structured REST API and backed by a **MySQL database**.

---

## 🧠 Project Overview

### 🧩 Backend — Powered by Spring Boot

**🔹 Database Architecture**  
Built a structured MySQL schema to manage relationships between products, suppliers, users, and transactions.   
Implemented one-to-many and many-to-many mappings to ensure data consistency and efficient queries.

**🔹 RESTful API Development**  
Developed modular endpoints for all major entities with full CRUD capabilities.   
Integrated pagination and sorting logic in backend queries to handle large data sets effectively.

**🔹 Filtering System**  
Implemented **Spring Data JPA Specifications** for advanced filtering, providing flexible, dynamic search and filtering for transactions.

**🔹 Security and Authentication**  
Configured **Spring Security** and **JWT** to secure the API.   
All protected routes require valid tokens, and role-based access ensures only authorized users can perform sensitive operations.

**🔹 User Roles and Access Control**  
Defined separate user roles (Admin, Manager) with specific privileges, ensuring proper access hierarchy for business operations.

---

### 🎨 Frontend — Built with React

**🔹 Dashboard Design**  
Developed a user-friendly and responsive React interface featuring role-specific dashboards for managing products, suppliers, and transactions.

**🔹 Data Visualization**  
Used **Recharts** to display real-time insights, such as transaction counts, product quantities, and revenue summaries.

**🔹 API Communication**  
Connected the frontend and backend seamlessly with **Axios**, ensuring reliable data synchronization and JWT-based request handling.

---

## 🚀 Features

### 👤 User Management
- Register and log in using **JWT authentication**
- Role-based access control (**Admin**, **Manager**)
- Secure password hashing with Spring Security

### 🧾 Inventory & Transaction Management
- Add, update, and delete **categories**, **products** and **suppliers**
- Record **purchases**, **sales**, and **returns**
- Automatically update product stock quantities after transactions
- Track all transactions with timestamps and statuses

### 📊 Reporting & Filtering
- Paginated and filtered transaction history
- View monthly reports and analytics by date range
- Visual summaries for total transactions, quantity and amount flow

---

## 🖥️ Frontend Overview

### 💻 Tech Stack
| Area | Technology |
|------|-------------|
| **Language** | JavaScript, HTML, CSS |
| **Framework** | React 19 |
| **Routing** | React Router DOM |
| **HTTP Client** | Axios |
| **Data Visualization** | Recharts |
| **State Management** | React Hooks (`useState`, `useEffect`) |
| **Build Tool** | Create React App |

### 🧩 Core Features

#### 🔐 Authentication & Authorization
- Role-aware interface: menus and routes render conditionally based on role (**ADMIN** / **MANAGER**).
- Axios interceptor automatically attaches  
  `Authorization: Bearer <token>` to authenticated requests.
- Automatic logout on token expiration or invalid credentials.

### 🧭 Routing
- **Public Routes:** Login, Register  
- **Private Routes:** Dashboard, Transactions, Category, Product, Supplier, Purchase, Sell, Profile  
- Route guards redirect unauthenticated users to `/login`.
- Role-based route control prevents unauthorized access to protected pages.

### 📊 Dashboard & Analytics
- Displays **monthly and weekly charts** for:
  - Total transactions count  
  - Product quantities  
  - Total sales amounts  
- Built with **Recharts** for smooth, responsive visualizations.

### 🏷️ Inventory Management
- Full **CRUD operations** for:
  - Categories  
  - Products  
  - Suppliers  
- Product image upload supported via **multipart/form-data** with live preview using `FileReader`.
- Real-time stock updates synchronized with backend.

### 💰 Transactions
- Paginated transaction tables with keyword filtering (delegated to backend specifications).
- View transaction details and edit status seamlessly.

---

### 🔗 Backend Repository
**👉 [inventory-management-system-backend](https://github.com/menglanyan/inventory-management-system-backend)**