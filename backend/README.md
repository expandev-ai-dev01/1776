# Catálogo de Carros - Backend API

## Description
Backend REST API for car catalog application with vehicle listing, details viewing, and contact form functionality.

## Features
- Vehicle listing with filtering and sorting
- Detailed vehicle information
- Contact form submission

## Technology Stack
- Node.js
- TypeScript
- Express.js
- In-memory data storage (no database)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd catalogo-carros-backend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```

4. Start development server
```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### API Version 1
Base URL: `/api/v1`

#### External Routes (Public)
- Available at `/api/v1/external`

#### Internal Routes (Authenticated)
- Available at `/api/v1/internal`

## Project Structure

```
src/
├── api/                    # API controllers
│   └── v1/                 # Version 1 endpoints
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
│   └── v1/                 # Version 1 routes
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── constants/              # Application constants
└── server.ts               # Application entry point
```

## Development Guidelines

### Code Style
- Use TypeScript strict mode
- Follow ESLint configuration
- Use 2 spaces for indentation
- Maximum line length: 120 characters

### Naming Conventions
- Files: camelCase (e.g., `userService.ts`)
- API routes: kebab-case (e.g., `/vehicle-details`)
- Functions: camelCase with action verbs
- Types/Interfaces: PascalCase

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3000)
- `API_VERSION` - API version (default: v1)
- `CORS_ORIGINS` - Allowed CORS origins (comma-separated)

## License
ISC
