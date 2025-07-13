
# WebsiteBoss Server

Backend API for the WebsiteBoss website builder application.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` file with your configuration:
   - Set your PostgreSQL database URL
   - Generate a secure JWT secret
   - Configure other environment variables

3. **Database Setup**
   ```bash
   # Generate Prisma client
   npm run generate
   
   # Run database migrations
   npm run migrate
   
   # Seed the database with sample templates
   npm run seed
   ```

4. **Start the Server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login

### Templates
- `GET /api/templates` - Get all templates
- `GET /api/templates/:id` - Get template by ID

### Projects
- `GET /api/projects` - Get user projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/:id/download` - Download project as ZIP

### File Upload
- `POST /api/upload/image` - Upload image
- `GET /api/upload` - Get user uploads
- `DELETE /api/upload/:id` - Delete upload

## Features

- **User Authentication**: JWT-based authentication system
- **Template Management**: Pre-built industry-specific templates
- **Project Management**: Create, edit, and manage website projects
- **File Upload**: Image upload and management
- **Code Generation**: Dynamic HTML/CSS/JS generation
- **ZIP Export**: Download complete website files

## Technologies Used

- **Express.js** - Web framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Multer** - File upload handling
- **Archiver** - ZIP file generation

## Database Schema

The application uses the following main entities:
- **Users** - User accounts and authentication
- **Templates** - Pre-built website templates
- **Projects** - User's website projects
- **Uploads** - File upload records

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- File upload validation
- Input sanitization
- Error handling middleware

## Development

The server includes comprehensive error handling, logging, and development tools for easy debugging and maintenance.
