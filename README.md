# Project Title: E-commerce App (Phase 1)

## Overview

This project is an e-commerce platform built with **Next.js** and **Tailwind CSS**. It focuses on providing a user-friendly shopping experience with essential features like product listing, shopping cart functionality, and a simple checkout system. This is the first phase of a two-phase project, with plans to enhance functionality in the second phase.

---

## Features (Phase 1)

### 1. **Setup and Homepage**

- Set up a **Next.js** project with **Tailwind CSS** integration.
- Built a responsive homepage featuring a product listing page with files containing products.
- Added a footer section allows consistent navigation and branding.
- Implemented a basic login system using local storage.

### 2. **Product Details Page**

- Created dynamic routing for individual product pages (e.g., `/products/[id]`).
- Added an “Add to Cart” button, which uses a function among others from an external context:
  - Adding items to the cart.
  - Removing items from the cart.
  - Clearing the cart.

### 3. **Shopping Cart**

- Created a cart page to display:
  - Selected products.
  - Quantity.
  - Total price.
- Used **LocalStorage** to persist cart data between sessions.

### 4. **Basic Checkout**

- Created a checkout form to simulate order submission.
- Collected user details, including name and address.
- Linked login and register functionality to the checkout process.

### 5. **Polishing**

- Conducted testing using Jest & React Testing Library and fixed any bugs.
- Enhanced the UI using **Tailwind CSS** for:
  - Responsive design.
  - Improved spacing and typography.

---

## Future Enhancements (Phase 2)

### Planned Features

1. **Database Integration**
   - Replace local storage with a backend database for persistent data storage.
2. **Advanced Login System**
   - Implement a secure and robust authentication system.
3. **Product Filtering and Sorting**
   - Enable users to filter products by category, price, and other attributes.
   - Add sorting options for better navigation.
4. **Search Functionality**
   - Implement a search bar for easy product discovery.
5. **Pagination**
   - Add pagination to the product listing page for improved user experience.
6. **Dark Mode**
   - Provide a toggle for users to switch between light and dark themes.
7. **Online Payment**
   - Integrate a secure online payment gateway for seamless transactions.

---

## Installation

### Prerequisites

- **Node.js** (v16+ recommended)
- **npm** or **yarn**

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   ```
2. Navigate to the project directory:
   ```bash
   cd your-repo
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Technologies Used

- **Next.js**: Framework for server-rendered React applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React State Management**: To manage states.
- **LocalStorage**: For temporary data persistence.

---

## Contributions

Contributions are welcome! Please feel free to submit a pull request or raise issues for any bugs or feature requests.

---

## Acknowledgements

Special thanks to the developers and open-source communities of **Next.js**, **Tailwind CSS**, and other tools used in this project.
