# Occasio

A robust and scalable Node.js backend for event management, built with Express.js and MongoDB, featuring comprehensive role-based access control (RBAC) and user management capabilities for coordinating events.

## Overview

Occasio is a comprehensive event management platform backend that provides secure authentication, user management, role-based authorization, and permission management. Built with modern Node.js practices, it ensures security, maintainability, and scalability for managing wedding-related operations and stakeholder roles.

## Key Features

- **User Management**: Complete user lifecycle management with secure password handling
- **Role-Based Access Control (RBAC)**: Granular role and permission management system
- **Authentication & Authorization**: JWT-based authentication with middleware-level authorization
- **Permission Management**: Dynamic permission assignment and validation
- **Error Handling**: Comprehensive error handling with custom error responses
- **Request Validation**: Schema-based request body validation using Joi
- **Async Operations**: Wrapped async route handlers for clean error handling
- **Auto-Sync**: Automatic permission synchronization on server startup

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v4.18.2
- **Database**: MongoDB with Mongoose v9.1.3
- **Authentication**: JWT (jsonwebtoken v9.0.3)
- **Password Hashing**: Bcrypt v6.0.0
- **Validation**: Joi v18.0.2
- **Environment Management**: Dotenv v17.2.3
- **Development**: Nodemon v3.1.11
- **Package Manager**: NPM

## Project Structure

```
src/
├── server.js                 # Server entry point (connects DB, runs autoSyncPer)
├── config/
│   └── db.js                 # MongoDB connection setup
├── constants/
│   └── statusCodes.js        # HTTP status codes
├── controller/
│   ├── roleController.js     # Role management logic
│   ├── userController.js     # User management logic
│   └── venueController.js    # Venue preference logic
├── middleware/
│   ├── authenticate.js       # JWT authentication
│   ├── authorize.js          # Role-based authorization
│   ├── autoSyncPer.js        # Permission auto-sync
│   ├── descriptor.js         # Middleware utilities (permission descriptors)
│   ├── errorHandler.js       # Centralized error handling
│   └── validateBody.js       # Request validation
├── model/
│   ├── permission.js         # Permission schema
│   ├── role.js               # Role schema
│   ├── user.js               # User schema
│   └── venuePreference.js    # Venue preference schema
├── routes/
│   ├── permissionRoutes.js   # Payment/permission endpoints (use descriptors)
│   ├── roleRoutes.js         # Role endpoints
│   ├── userRoutes.js         # User endpoints
│   └── venueRoutes.js        # Venue preference endpoints
├── service/
│   ├── roleServices.js       # Role business logic
│   ├── userServices.js       # User business logic
│   └── venueServices.js      # Venue business logic
└── utils/
    ├── response.js           # Response formatting utility
    ├── schema.js             # Validation schemas
    └── wrapAsync.js          # Async error wrapper
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd occasio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=port_number
   MONGO_URI=your_database_link
   JWT_ACCESS_SECRET=your_jwt_access_secret
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   npm start
   ```

The server will start on the configured PORT (default: 5000) and automatically synchronize permissions on startup.

## API Endpoints

Base path: `/api`

### Users
- `POST /api/user/register` — Register a new user
- `POST /api/user/login` — User login (returns JWT)
- `POST /api/user/profile` — Create or update profile (requires Authorization)
- `POST /api/user/weddingInfo` — Submit wedding info (requires Authorization)
- `GET /api/user/view` — Public user view

### Roles
- `POST /api/role/create` — Create a new role

### Payment (permission descriptors)
- `POST /api/payment/make_payment` — Descriptor: `payment.create`
- `POST /api/payment/check_payment` — Descriptor: `payment.check`

### Venue Preference
- `POST /api/venuePreference/add` — Add a venue (requires Authorization, descriptor: `venuePreference.add`)
- `GET /api/venuePreference/view` — List venues

> Note: Protected routes require the header `Authorization: Bearer <token>`. Permissions are declared with `descriptor(...)` middleware and auto-synced to the database on server startup.

How permission sync works
- The `autoSyncPer` middleware scans registered routes for middleware that includes a `permission` descriptor (added by `descriptor(key, description)`).
- Detected permissions are added/updated in the `permissions` collection and automatically pushed to the `ADMIN` role if missing.
- This runs automatically when the server starts and keeps DB permissions in sync with route descriptors.

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Security Features

- **Password Hashing**: Bcrypt for secure password storage
- **JWT Authentication**: Stateless authentication mechanism
- **Role-Based Authorization**: Granular access control
- **Request Validation**: Joi schema validation for incoming requests
- **Error Handling**: Secure error responses without sensitive data leaks

## Development

### Scripts
- `npm start` - Start the development server with hot-reload (Nodemon)
- `npm test` - Run tests (to be configured)

### Dependencies Overview
- **express**: Web framework for routing and middleware
- **mongoose**: MongoDB object modeling
- **jsonwebtoken**: JWT implementation
- **bcrypt**: Password hashing
- **joi**: Schema validation
- **dotenv**: Environment variable management

## Best Practices Implemented

- ✅ Clean code architecture with separation of concerns
- ✅ Middleware-based request processing pipeline
- ✅ Async/await with error wrapping
- ✅ Database models with Mongoose schemas
- ✅ Centralized error handling
- ✅ Environment-based configuration
- ✅ Input validation and sanitization
- ✅ Secure authentication and authorization

## Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/feature-name`)
2. Commit your changes (`git commit -m 'Add feature-name'`)
3. Push to the branch (`git push origin feature/feature-name`)
4. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Support

For support, please contact the development team or open an issue in the repository.

---

**Version**: 1.0.0  
**Last Updated**: February 2, 2026
