# MERN Practical – Authentication & Testing

This is the backend implementation for Full Stack Development Practical 8. It features JSON Web Token (JWT) authentication, file uploads, a mock payment system, and RESTful API architecture.

## Features Covered
- **JWT Authentication**: Secure registration and login flow with password hashing using `bcryptjs`.
- **Protected Routes**: Custom middleware verifying JWT token integrity across restricted API endpoints.
- **Image Uploads**: Form-data handling managed safely with `multer`.
- **Mock Payment API**: Standardized endpoint evaluating mock transactions.
- **Modular Project Structure**: Complete separation of concerns (Models, Configs, Contexts, Midddlewares).

## Installation & Setup

1. Make sure you have latest **Node.js** and **MongoDB** installed successfully on your machine.
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Run the development server (MongoDB must be running locally):
   ```bash
   npm run dev
   ```

## Testing Evidence
All screenshots proving operational success inside Postman and MongoDB Compass are permanently archived inside the `Testing_Evidence` directory of this repository!
