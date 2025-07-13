# WebsiteBoss Project Setup Guide

This project consists of two main components: a backend API and a frontend application.

## 📁 Project Structure

```
project-root/
├── backend/
└── frontend/
```

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL database instance
- Cloudinary account

### Backend Setup

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Fill in the required environment variables according to the example file

4. **Database Setup**
   - Get a PostgreSQL instance from providers like:
     - [Neon.tech](https://neon.tech)
     - [Aiven.io](https://aiven.io)
     - Or any other PostgreSQL provider
   - Update your `.env` file with the database connection details
   - **Migrate your database:**
     ```bash
     npx prisma migrate dev
     ```

5. **Cloudinary Setup**
   - Create a Cloudinary account
   - Add your Cloudinary credentials to the `.env` file

6. **Seed the Database**
   ```bash
   npm run seed
   ```

### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

Make sure to configure the following environment variables in your backend `.env` file:

- Database connection details
- Cloudinary API credentials
- Any other required configuration (refer to `.env.example`)

## 📝 Additional Notes

- Ensure your PostgreSQL database is running and accessible
- The backend should be started before the frontend for full functionality
- Check the console for any error messages during setup

---

**Happy coding! 🎉**