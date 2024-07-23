  # DISHDRIFT

DISHDRIFT is a full-stack food delivery application built using the MERN (MongoDB, Express, React, Node.js) stack. The project consists of three main parts: the backend, the client frontend, and the admin panel.

## Project Structure

- **Backend**: Handles the server-side logic, user authentication, and database interactions.
- **Client Frontend**: The user-facing part of the application where customers can browse, add products to the cart, and place orders.
- **Admin Panel**: Allows administrators to manage food products and track orders.

## Admin Panel

The admin panel includes the following pages:
1. **Add New Food Product**: The admin can add new food items to the database.
2. **List Current Food Products**: Displays all the existing food products.
3. **List, Track, and Modify Orders**: Displays all orders and allows the admin to update their status.

## Client Frontend

The client-facing part of the application provides the following functionalities:
1. **User Authentication**: Users must sign up and log in. Upon login, a JWT token is created and stored locally to maintain the user's session.
2. **Product Management**: Users can browse and add products to their cart.
3. **Checkout Process**: Users can view their cart, enter their shipping information, and proceed to payment.
4. **Stripe Integration**: Users are redirected to a Stripe payment page to complete their purchase.

## Used Packages

The following packages are used in the project:

- Backend:
  - `bcrypt`: "^5.1.1" - For hashing passwords.
  - `body-parser`: "^1.20.2" - Middleware for parsing incoming request bodies.
  - `cors`: "^2.8.5" - Middleware for enabling CORS (Cross-Origin Resource Sharing).
  - `dotenv`: "^16.4.5" - For loading environment variables from a `.env` file.
  - `express`: "^4.19.2" - Web framework for Node.js.
  - `jsonwebtoken`: "^9.0.2" - For creating and verifying JSON Web Tokens (JWT).
  - `mongoose`: "^8.5.1" - ODM (Object Data Modeling) library for MongoDB.
  - `multer`: "^1.4.5-lts.1" - Middleware for handling file uploads.
  - `nodemon`: "^3.1.4" - Utility for automatically restarting the server during development.
  - `stripe`: "^16.2.0" - For integrating Stripe payment gateway.
  - `validator`: "^13.12.0" - For validating and sanitizing strings.

- Client Frontend:
  - `axios`: "^1.7.2" - Promise-based HTTP client for the browser and Node.js.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dishdrift.git
   cd dishdrift

2. **Install dependencies**
  ### Backend
    ```bash
    cd backend
    npm install

  ### Client Frontend
    ```bash
    cd frontend
    npm install

  ### Admin Panel
    ```bash
    cd admin
    npm install

3. **Install dependencies**
  Create a .env file in the backend directory and add the following environment variables:
    ```env
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key


4. **Run the application**
  ### Backend
    ```bash
    cd backend
    npm run server

  ### Client Frontend
    ```bash
    cd frontend
    npm start

  ### Admin Panel
    ```bash
    cd admin
    npm start


