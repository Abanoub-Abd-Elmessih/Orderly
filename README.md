# React E-Commerce Order Management System

## Overview
This project is an **E-Commerce Order Management System** built entirely using **React**. The application simulates an order management system on the frontend without backend integration. It includes features for **user management**, **product inventory management**, and **order management**, all while supporting **localization** with both **English** and **Arabic** (with RTL layout adjustments for Arabic).

---

## Key Features
- **User Management**:
  - Mock login and registration.
  - Role-based access for **Admin** and **Customer**.
  - Session management using **local storage**.

- **Product Inventory Management**:
  - Display a catalog of products with advanced filtering (by category, price range, and availability).
  - Admin can add, update, or delete products in the inventory.

- **Order Management**:
  - Customers can add products to the cart, place orders, and track their order history.
  - Admin can manage orders, update statuses, and view order history.

- **Localization**:
  - **Dynamic language switching** between **English** and **Arabic**.
  - **RTL** (Right-To-Left) layout support for Arabic language.

---

## Project Structure
The project is structured with the following modules:

- **src/components**:
  - **Auth**: Contains components related to user authentication and session management.
  - **Products**: Handles product catalog, product details, and admin product management.
  - **Orders**: Manages shopping cart, order placement, and order tracking.
  - **Dashboard**: Contains the layout for the main dashboard with language switcher and RTL adjustments.
  - **Services**: Includes services to simulate backend data for users, products, and orders.
  - **Assets**: Stores static files such as images and localization files.

---

## Setup Instructions

### Prerequisites
Ensure you have **Node.js** and **npm** installed on your machine.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/react-ecommerce-order-management.git
   cd react-ecommerce-order-management
