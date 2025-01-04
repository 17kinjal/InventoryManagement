
# Inventory Management System

This is a web-based Inventory Management System built using **Vite**, **ReactJS**, and **TypeScript**. The system allows users to manage inventory products efficiently with different access levels (User and Admin).

## Features

- **List Inventory**: Display inventory products in a table format.
- **Edit Product**: Admin can edit product details.
- **Disable Product**: Admin can disable a product.
- **Delete Product**: Admin can delete a product from the inventory.
- **Role-based Access**:
  - **User**: Can only view the inventory list and summary.
  - **Admin**: Can perform all actions (edit, enable/disable, delete) on the inventory data.

## Tech Stack

- **ReactJS**: Frontend library for building user interfaces.
- **TypeScript**: Type safety for JavaScript.
- **Vite**: Fast and modern development environment for building React applications.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/inventory-management.git
   ```

2. Navigate into the project directory:
   ```bash
   cd inventory-management
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit [http://localhost:5173](http://localhost:5173) to access the application.

## Usage

### User Role

- Users can view the inventory list, product details, and a summary of the inventory.
- Users cannot perform any editing, enabling/disabling, or deleting actions on the inventory.

### Admin Role

- Admins have full access to perform actions on inventory data:
  - **Edit**: Modify product details directly from the table.
  - **Disable**: Disable a product by updating its status.
  - **Delete**: Permanently remove a product from the inventory.
  
Actions are accessible via options in the table UI.
