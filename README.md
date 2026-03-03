# Occasio 🎉

**A Modern Wedding Management Platform Backend**

Occasio is a comprehensive, enterprise-grade wedding management system built with Node.js and Express.js. It provides complete control over wedding events, vendor management, guest coordination, and real-time collaboration tools for seamless wedding planning and execution.

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/occasio.git
cd occasio

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start server
npm start
```

Server runs on `http://localhost:5000`

---

## 📖 Table of Contents

1. [Features](#-features)
2. [Technology Stack](#-technology-stack)
3. [Architecture](#-architecture)
4. [Installation Guide](#-installation-guide)
5. [Configuration](#-configuration)
6. [API Documentation](#-api-documentation)
7. [Authentication](#-authentication)
8. [Usage Examples](#-usage-examples)
9. [Database Schema](#-database-schema)
10. [Middleware Pipeline](#-middleware-pipeline)
11. [Error Handling](#-error-handling)
12. [Security](#-security)
13. [Performance](#-performance)
14. [Deployment](#-deployment)
15. [Development](#-development)
16. [Troubleshooting](#-troubleshooting)
17. [Contributing](#-contributing)
18. [FAQ](#-faq)
19. [Support](#-support)
20. [License](#-license)

---

## ✨ Features

### 🔐 Authentication & Security
- **JWT Token Authentication** - Secure, stateless authentication
- **Bcrypt Password Hashing** - Industry-standard password encryption
- **Refresh Token Mechanism** - Long-lived sessions with token rotation
- **Two-Factor Authentication Ready** - Framework for 2FA implementation
- **Rate Limiting** - Protection against brute force attacks
- **CORS Configuration** - Cross-origin resource sharing control

### 👥 User Management
- **User Registration & Login** - Secure account creation and authentication
- **Profile Management** - Edit user information and preferences
- **Role Assignment** - Dynamic user role management
- **Account Status Control** - Active/Inactive/Suspended states
- **User Directory** - Complete user listing and search
- **Permission Inheritance** - Automatic permissions based on roles

### 🎭 Role-Based Access Control (RBAC)
- **Role Hierarchy** - Multiple role levels (Admin, Manager, Coordinator, Vendor, Guest)
- **Permission Management** - Granular, resource-based permissions
- **Dynamic Role Assignment** - Assign/revoke roles in real-time
- **Role Templates** - Pre-configured role templates for common scenarios
- **Permission Inheritance** - Roles inherit parent permissions
- **Audit Logging** - Track all role and permission changes

### 🔑 Permission System
- **Resource-Based Permissions** - Control access at resource level
- **Action-Based Permissions** - Create, Read, Update, Delete controls
- **Dynamic Permission Sync** - Auto-sync permissions on startup
- **Permission Groups** - Organize permissions into logical groups
- **Delegation Support** - Allow users to delegate permissions
- **Permission Expiry** - Temporary permission grants with expiration

### ✅ Data Validation
- **Joi Schema Validation** - Comprehensive request body validation
- **Type Checking** - Strict data type validation
- **Custom Error Messages** - User-friendly validation errors
- **Nested Object Validation** - Complex object structure validation
- **Conditional Validation** - Context-aware validation rules
- **Sanitization** - Automatic input sanitization

### 🛡️ Error Handling
- **Centralized Error Handler** - Consistent error responses
- **Custom Error Classes** - Specific error types for different scenarios
- **Detailed Error Logging** - Comprehensive error tracking
- **User-Friendly Messages** - Non-technical error messages for clients
- **Error Stack Traces** - Development mode error details
- **HTTP Status Codes** - Correct HTTP status for each error type

### 📊 Advanced Features
- **Audit Trail** - Track all system actions and changes
- **Request Logging** - Detailed request/response logging
- **Performance Monitoring** - Track API performance metrics
- **Database Indexing** - Optimized query performance
- **Connection Pooling** - Efficient database connections
- **Async/Await** - Modern async operation handling

---

## 🛠 Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Runtime** | Node.js | 18.x+ | JavaScript runtime environment |
| **Framework** | Express.js | 4.18.2+ | Web application framework |
| **Database** | MongoDB | 4.4+ | NoSQL document database |
| **ODM** | Mongoose | 9.1.3+ | MongoDB object modeling |
| **Authentication** | JWT | 9.0.3 | Secure token-based auth |
| **Hashing** | Bcrypt | 6.0.0 | Password encryption |
| **Validation** | Joi | 18.0.2+ | Schema validation library |
| **Config** | Dotenv | 17.2.3+ | Environment variable management |
| **Development** | Nodemon | 3.1.11+ | Auto-restart development server |
| **Testing** | Jest | Latest | Unit testing framework (optional) |
| **Logging** | Winston | Latest | Application logging (optional) |

---

## 🏗 Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (Frontend)                        │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/HTTPS
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              OCCASIO API SERVER (Express.js)               │
├─────────────────────────────────────────────────────────────┤
│  Middleware Layer                                            │
│  ├─ Request Logger      ├─ Error Handler   ├─ CORS         │
│  ├─ Auth Middleware     ├─ Validation     ├─ Rate Limit   │
│  └─ Authorization       └─ Body Parser     └─ Compression  │
├─────────────────────────────────────────────────────────────┤
│  Route Layer                                                 │
│  ├─ /api/user/*         ├─ /api/role/*     ├─ /api/event/* │
│  └─ /api/permission/*   └─ /api/vendor/*   └─ /api/guest/* │
├─────────────────────────────────────────────────────────────┤
│  Controller Layer                                            │
│  (Request handlers & business logic orchestration)          │
├─────────────────────────────────────────────────────────────┤
│  Service Layer                                               │
│  (Business logic & data processing)                         │
├─────────────────────────────────────────────────────────────┤
│  Data Access Layer (Models)                                 │
│  (Mongoose schemas & database interactions)                │
└────────────────────┬────────────────────────────────────────┘
                     │ TCP Connection
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   MongoDB Database                           │
│  ├─ Users Collection    ├─ Roles Collection                 │
│  ├─ Permissions         ├─ Events                           │
│  ├─ Vendors             ├─ Guests                           │
│  └─ Audit Logs          └─ Sessions                         │
└─────────────────────────────────────────────────────────────┘
```

### Design Patterns Used

- **MVC Pattern** - Model-View-Controller separation
- **Service Layer Pattern** - Business logic encapsulation
- **Middleware Pattern** - Request/response processing pipeline
- **Singleton Pattern** - Database connection
- **Factory Pattern** - Error and response creation
- **Observer Pattern** - Event-driven operations

### Project Directory Structure

```
occasio/
│
├── src/
│   ├── app.js                              # Express app setup
│   ├── server.js                           # Server entry point
│   │
│   ├── config/                             # Configuration files
│   │   ├── database.js                     # MongoDB connection
│   │   ├── environment.js                  # Env variables
│   │   └── constants.js                    # App constants
│   │
│   ├── controllers/                        # Request handlers
│   │   ├── userController.js               # User operations
│   │   ├── roleController.js               # Role operations
│   │   ├── permissionController.js         # Permission operations
│   │   ├── eventController.js              # Event operations
│   │   ├── vendorController.js             # Vendor operations
│   │   └── guestController.js              # Guest operations
│   │
│   ├── middleware/                         # Express middleware
│   │   ├── authenticateToken.js            # JWT verification
│   │   ├── authorizeRole.js                # Role authorization
│   │   ├── validateRequest.js              # Joi validation
│   │   ├── errorHandler.js                 # Error handling
│   │   ├── requestLogger.js                # Request logging
│   │   ├── cors.js                         # CORS configuration
│   │   ├── rateLimit.js                    # Rate limiting
│   │   └── permissionSync.js               # Permission sync
│   │
│   ├── models/                             # Mongoose schemas
│   │   ├── User.js                         # User schema
│   │   ├── Role.js                         # Role schema
│   │   ├── Permission.js                   # Permission schema
│   │   ├── Event.js                        # Event schema
│   │   ├── Vendor.js                       # Vendor schema
│   │   ├── Guest.js                        # Guest schema
│   │   ├── AuditLog.js                     # Audit log schema
│   │   └── Session.js                      # Session schema
│   │
│   ├── routes/                             # API routes
│   │   ├── userRoutes.js                   # User endpoints
│   │   ├── roleRoutes.js                   # Role endpoints
│   │   ├── permissionRoutes.js             # Permission endpoints
│   │   ├── eventRoutes.js                  # Event endpoints
│   │   ├── vendorRoutes.js                 # Vendor endpoints
│   │   ├── guestRoutes.js                  # Guest endpoints
│   │   └── index.js                        # Route aggregator
│   │
│   ├── services/                           # Business logic
│   │   ├── userService.js                  # User business logic
│   │   ├── roleService.js                  # Role business logic
│   │   ├── permissionService.js            # Permission logic
│   │   ├── eventService.js                 # Event business logic
│   │   ├── vendorService.js                # Vendor business logic
│   │   ├── guestService.js                 # Guest business logic
│   │   ├── authService.js                  # Auth logic
│   │   ├── tokenService.js                 # JWT operations
│   │   └── notificationService.js          # Notifications
│   │
│   └── utils/                              # Utility functions
│       ├── responseFormatter.js            # Response formatting
│       ├── validationSchemas.js            # Joi schemas
│       ├── asyncWrapper.js                 # Async/error wrapper
│       ├── logger.js                       # Logging utility
│       ├── errorClasses.js                 # Custom errors
│       ├── constants.js                    # App constants
│       └── helpers.js                      # Helper functions
│
├── tests/                                  # Test files
│   ├── unit/                               # Unit tests
│   ├── integration/                        # Integration tests
│   └── fixtures/                           # Test data
│
├── logs/                                   # Application logs
│   ├── app.log                             # General logs
│   ├── error.log                           # Error logs
│   └── access.log                          # Access logs
│
├── .env.example                            # Environment template
├── .gitignore                              # Git ignore rules
├── .eslintrc.json                          # ESLint configuration
├── package.json                            # Dependencies
├── package-lock.json                       # Lock file
└── README.md                               # This file
```

---

## 💻 Installation Guide

### System Requirements

```
✓ Node.js v18.0.0 or higher
✓ MongoDB v4.4 or higher
✓ NPM v9.0.0 or higher
✓ 512MB RAM minimum
✓ 1GB free disk space
✓ Modern web browser
```

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/occasio.git
cd occasio
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages from package.json

### Step 3: Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env  # or use your preferred editor
```

### Step 4: Database Setup

```bash
# Ensure MongoDB is running
mongod

# In another terminal, seed initial data (optional)
npm run seed
```

### Step 5: Start Server

```bash
# Development mode (with auto-reload)
npm start

# Production mode
npm run prod

# Debug mode
npm run dev:debug
```

**Output:**
```
✓ Server running on http://localhost:5000
✓ MongoDB connected successfully
✓ Permissions synchronized
✓ Ready for requests
```

---

## ⚙️ Configuration

### Environment Variables (.env)

Create a `.env` file in the root directory:

```env
# ==================== SERVER ====================
NODE_ENV=development
PORT=5000
API_PREFIX=/api

# ==================== DATABASE ====================
MONGODB_URI=mongodb://localhost:27017/occasio
MONGODB_USERNAME=
MONGODB_PASSWORD=
MONGODB_MAX_POOL_SIZE=10
MONGODB_TIMEOUT=5000

# ==================== JWT ====================
JWT_SECRET=your_super_secret_key_minimum_32_characters_long_here
JWT_EXPIRE=24h
JWT_REFRESH_SECRET=your_refresh_secret_key_also_32_characters_minimum
JWT_REFRESH_EXPIRE=7d

# ==================== SECURITY ====================
BCRYPT_ROUNDS=10
MAX_LOGIN_ATTEMPTS=5
LOCK_TIME=15m
CORS_ORIGIN=http://localhost:3000,http://localhost:5000
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX_REQUESTS=100

# ==================== LOGGING ====================
LOG_LEVEL=info
LOG_FILE=logs/app.log
LOG_ERROR_FILE=logs/error.log
LOG_MAX_SIZE=10m
LOG_MAX_FILES=14

# ==================== EMAIL (Optional) ====================
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
EMAIL_FROM=noreply@occasio.com

# ==================== EXTERNAL SERVICES ====================
STRIPE_API_KEY=sk_test_...
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...

# ==================== FEATURES ====================
ENABLE_EMAIL_VERIFICATION=true
ENABLE_2FA=false
ENABLE_AUDIT_LOG=true
ENABLE_REQUEST_LOGGING=true
MAINTENANCE_MODE=false

# ==================== PAGINATION ====================
DEFAULT_PAGE_SIZE=10
MAX_PAGE_SIZE=100

# ==================== TIMEZONE ====================
APP_TIMEZONE=UTC
```

### Environment Variables Reference

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `NODE_ENV` | String | development | Environment mode |
| `PORT` | Number | 5000 | Server port |
| `MONGODB_URI` | String | - | Database connection string |
| `JWT_SECRET` | String | - | JWT signing secret (min 32 chars) |
| `JWT_EXPIRE` | String | 24h | Token expiration time |
| `BCRYPT_ROUNDS` | Number | 10 | Password hashing rounds |
| `LOG_LEVEL` | String | info | Logging verbosity |
| `CORS_ORIGIN` | String | - | Allowed CORS origins |
| `RATE_LIMIT_MAX_REQUESTS` | Number | 100 | Requests per window |

---

## 📡 API Documentation

### Base URL

```
Development:  http://localhost:5000/api
Production:   https://api.occasio.com/api
```

### Authentication

Include JWT token in request header:

```
Authorization: Bearer <your_jwt_token_here>
```

### Response Format

All responses follow this format:

```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Doe"
  },
  "message": "User fetched successfully",
  "timestamp": "2026-03-03T10:30:00Z"
}
```

Error response:

```json
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "Email is required",
  "details": ["Email field is missing"],
  "status": 400,
  "timestamp": "2026-03-03T10:30:00Z"
}
```

### User Endpoints

#### 1. Register User
```
POST /api/user/register

Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass@123",
  "phone": "+1234567890",
  "role": "guest"
}

Response: 201
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "john@example.com",
    "token": "eyJhbGc..."
  }
}
```

#### 2. Login User
```
POST /api/user/login

Request:
{
  "email": "john@example.com",
  "password": "SecurePass@123"
}

Response: 200
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "expiresIn": "24h"
  }
}
```

#### 3. Get User Profile
```
GET /api/user/:id
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "roles": ["guest"],
    "createdAt": "2026-03-01T10:00:00Z"
  }
}
```

#### 4. Update User
```
PUT /api/user/:id
Authorization: Bearer <token>

Request:
{
  "name": "John Smith",
  "phone": "+9876543210"
}

Response: 200
{
  "success": true,
  "data": { ... }
}
```

#### 5. Delete User
```
DELETE /api/user/:id
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "message": "User deleted successfully"
}
```

#### 6. List All Users (Admin)
```
GET /api/user?page=1&limit=10&role=vendor
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "total": 50,
    "page": 1,
    "pages": 5,
    "limit": 10
  }
}
```

### Role Endpoints

#### 1. Create Role
```
POST /api/role
Authorization: Bearer <token>

Request:
{
  "name": "Wedding Planner",
  "description": "Manages wedding events",
  "permissions": ["event:create", "event:update", "vendor:approve"]
}

Response: 201
{
  "success": true,
  "data": { ... }
}
```

#### 2. Get All Roles
```
GET /api/role?page=1&limit=10
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": [ ... ],
  "pagination": { ... }
}
```

#### 3. Get Role Details
```
GET /api/role/:id
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": {
    "id": "role_123",
    "name": "Wedding Planner",
    "permissions": [ ... ]
  }
}
```

#### 4. Update Role
```
PUT /api/role/:id
Authorization: Bearer <token>

Request:
{
  "name": "Senior Wedding Planner",
  "permissions": [ ... ]
}

Response: 200
{
  "success": true,
  "data": { ... }
}
```

#### 5. Delete Role
```
DELETE /api/role/:id
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "message": "Role deleted successfully"
}
```

### Permission Endpoints

#### 1. Create Permission
```
POST /api/permission
Authorization: Bearer <token>

Request:
{
  "name": "Create Event",
  "code": "event:create",
  "description": "Allow user to create events",
  "resource": "event",
  "action": "create"
}

Response: 201
{
  "success": true,
  "data": { ... }
}
```

#### 2. List Permissions
```
GET /api/permission?resource=event
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": [ ... ]
}
```

#### 3. Update Permission
```
PUT /api/permission/:id
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": { ... }
}
```

#### 4. Delete Permission
```
DELETE /api/permission/:id
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "message": "Permission deleted successfully"
}
```

---

## 🔐 Authentication

### JWT Flow

```
1. User submits credentials (email/password)
          ↓
2. Server validates credentials
          ↓
3. Password verification with Bcrypt
          ↓
4. Server generates JWT token & refresh token
          ↓
5. Client receives tokens
          ↓
6. Client includes token in Authorization header for future requests
          ↓
7. Server validates token with authenticateToken middleware
          ↓
8. Request proceeds or returns 401 Unauthorized
```

### Token Structure

**Access Token (JWT)**
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "user_123",
    "email": "john@example.com",
    "roles": ["guest"],
    "permissions": ["event:read"],
    "iat": 1646304600,
    "exp": 1646391000
  },
  "signature": "..."
}
```

### Refresh Token Flow

```
Access Token Expired?
          ↓
Yes: Send refresh token to /api/auth/refresh
          ↓
Server validates refresh token
          ↓
Generate new access token
          ↓
Return new access token to client
          ↓
Client continues with new token
```

### Authorization Levels

```
Role Hierarchy (Top to Bottom):
1. Admin          - Full system access
2. Manager        - Manage events, vendors, users
3. Coordinator    - Create/edit events, manage guests
4. Vendor         - View own events, manage services
5. Guest          - View assigned events only
```

---

## 📚 Usage Examples

### Example 1: User Registration Flow

```bash
# 1. Register new user
curl -X POST http://localhost:5000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah Wedding",
    "email": "sarah@example.com",
    "password": "SecurePass@2026",
    "phone": "+1-555-0123"
  }'

# Response:
# {
#   "success": true,
#   "data": {
#     "id": "user_507f1f77bcf86cd799439011",
#     "email": "sarah@example.com",
#     "token": "eyJhbGc..."
#   }
# }

# 2. Store token in client storage
# 3. Use token for authenticated requests
```

### Example 2: Create Event with Authorization

```bash
# Create new event (requires event:create permission)
curl -X POST http://localhost:5000/api/event \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{
    "title": "Sarah & Tom Wedding",
    "date": "2026-06-15",
    "location": "Riverside Venue",
    "guestCount": 150,
    "budget": 50000,
    "coordinators": ["user_123", "user_456"]
  }'
```

### Example 3: Role Assignment

```bash
# Assign role to user (requires role:assign permission)
curl -X PATCH http://localhost:5000/api/user/user_123/role \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{
    "role": "coordinator"
  }'
```

### Example 4: Vendor Management

```bash
# List vendors with pagination and filters
curl "http://localhost:5000/api/vendor?page=1&limit=10&category=catering&verified=true" \
  -H "Authorization: Bearer eyJhbGc..."
```

### Example 5: Permission Check

```bash
# The middleware automatically checks permissions
# If user doesn't have required permission:

# Response: 403
{
  "success": false,
  "error": "FORBIDDEN",
  "message": "You don't have permission to access this resource",
  "requiredPermission": "event:create",
  "status": 403
}
```

---

## 🗄️ Database Schema

### User Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  phone: String,
  avatar: String (URL),
  roles: [ObjectId], // References to Role
  permissions: [ObjectId], // Direct permissions
  status: String (active/inactive/suspended),
  emailVerified: Boolean,
  twoFactorEnabled: Boolean,
  lastLogin: Date,
  loginAttempts: Number,
  lockUntil: Date,
  createdAt: Date (auto),
  updatedAt: Date (auto),
  deletedAt: Date (soft delete)
}
```

### Role Schema
```javascript
{
  _id: ObjectId,
  name: String (required, unique),
  description: String,
  permissions: [ObjectId], // References to Permission
  status: String (active/inactive),
  hierarchy: Number, // For role inheritance
  createdAt: Date,
  updatedAt: Date
}
```

### Permission Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  code: String (required, unique), // e.g., "event:create"
  description: String,
  resource: String, // e.g., "event"
  action: String, // e.g., "create"
  status: String (active/inactive),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔄 Middleware Pipeline

### Request Flow Diagram

```
HTTP Request (with JWT token)
     ↓
[CORS Middleware] - Check origin
     ↓
[Rate Limiter] - Check request limits
     ↓
[Body Parser] - Parse JSON body
     ↓
[Request Logger] - Log request details
     ↓
[authenticateToken] - Verify JWT
     ↓
[authorizeRole] - Check permissions
     ↓
[validateRequest] - Validate request body with Joi
     ↓
[Controller Handler] - Process business logic
     ↓
[errorHandler] - Catch and format errors
     ↓
HTTP Response (with status & data)
```

### Middleware Details

| Middleware | Purpose | Order | Auth Required |
|-----------|---------|-------|--------------|
| CORS | Handle cross-origin requests | 1 | No |
| Rate Limiter | Prevent abuse | 2 | No |
| Body Parser | Parse request body | 3 | No |
| Request Logger | Log all requests | 4 | No |
| authenticateToken | Verify JWT token | 5 | Yes |
| authorizeRole | Check user permissions | 6 | Yes |
| validateRequest | Validate with Joi schema | 7 | Route-specific |
| Controller | Handle business logic | Route | - |
| Error Handler | Format error responses | Final | - |

---

## ⚠️ Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human readable message",
  "details": ["Additional detail 1", "Additional detail 2"],
  "status": 400,
  "timestamp": "2026-03-03T10:30:00Z",
  "path": "/api/user/register"
}
```

### Common Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| VALIDATION_ERROR | 400 | Request validation failed |
| INVALID_CREDENTIALS | 401 | Wrong email or password |
| TOKEN_EXPIRED | 401 | JWT token has expired |
| UNAUTHORIZED | 401 | Missing or invalid token |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Resource already exists |
| SERVER_ERROR | 500 | Internal server error |
| SERVICE_UNAVAILABLE | 503 | Service temporarily down |

### Error Handling Example

```javascript
// Try-catch with custom error handling
try {
  const user = await userService.getUserById(id);
  res.json({ success: true, data: user });
} catch (error) {
  if (error instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      error: "VALIDATION_ERROR",
      message: error.message,
      status: 400
    });
  }
  // Other error types...
}
```

---

## 🔒 Security

### Password Security
- ✓ Bcrypt hashing with 10 salt rounds
- ✓ Password strength requirements
- ✓ Password reset with token validation
- ✓ Login attempt limiting (5 attempts)
- ✓ Account lockout (15 minutes)

### JWT Security
- ✓ HS256 algorithm
- ✓ Secure secret key (min 32 characters)
- ✓ Token expiration (24 hours)
- ✓ Refresh token rotation
- ✓ Token blacklisting support

### Request Security
- ✓ Input sanitization
- ✓ SQL injection prevention (via Mongoose)
- ✓ XSS protection headers
- ✓ CORS whitelist
- ✓ Rate limiting

### Data Protection
- ✓ HTTPS only (production)
- ✓ Sensitive data encryption
- ✓ Safe error messages (no internals)
- ✓ Audit logging
- ✓ Soft delete (data retention)

### Best Practices
```
✓ Use environment variables for secrets
✓ Keep dependencies updated
✓ Use HTTPS in production
✓ Implement CSRF tokens for state-changing operations
✓ Log security events
✓ Regular security audits
✓ Penetration testing
✓ Web Application Firewall (WAF)
```

---

## ⚡ Performance

### Optimization Techniques
- Database indexing on frequently queried fields
- Connection pooling for MongoDB
- Response compression (gzip)
- Request caching strategies
- Pagination for large datasets
- Lazy loading of related data
- Query optimization

### Performance Monitoring
```bash
# Monitor response times
npm run monitor

# Check database performance
npm run db:stats

# Profile CPU usage
npm run profile

# Load testing
npm run load-test
```

---

## 🚀 Deployment

### Deployment Checklist

```
Pre-Deployment:
☐ Update NODE_ENV to 'production'
☐ Generate strong JWT secrets (min 32 chars)
☐ Set up production MongoDB instance
☐ Configure CORS origins for frontend domain
☐ Enable HTTPS/SSL certificates
☐ Set up environment variables on server
☐ Run tests: npm test
☐ Build Docker image (if using Docker)
☐ Set up monitoring and logging
☐ Configure backup strategy

Deployment:
☐ Deploy code to server
☐ Install dependencies: npm install --production
☐ Run database migrations
☐ Start application: npm start
☐ Verify all endpoints
☐ Check logs for errors
☐ Monitor system resources

Post-Deployment:
☐ Verify API endpoints
☐ Check authentication flow
☐ Monitor error logs
☐ Test database connections
☐ Verify backups
☐ Set up alerts
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY src ./src
EXPOSE 5000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t occasio:latest .
docker run -p 5000:5000 --env-file .env occasio:latest
```

---

## 🛠 Development

### Development Scripts

```bash
# Start with auto-reload (Nodemon)
npm start

# Production mode
npm run prod

# Debug mode
npm run dev:debug

# Test
npm test

# Test with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format

# Database seed
npm run seed

# Database reset
npm run db:reset

# Generate API docs
npm run docs
```

### Development Workflow

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes in src/
# 3. Nodemon auto-reloads

# 4. Test your changes
curl http://localhost:5000/api/user/...

# 5. Lint and format
npm run lint
npm run format

# 6. Run tests
npm test

# 7. Commit
git commit -m "feat: add new feature"

# 8. Push
git push origin feature/new-feature

# 9. Create Pull Request
```

### Code Structure Rules

```
✓ Controllers: Handle HTTP requests only
✓ Services: Contain all business logic
✓ Models: Define database schemas
✓ Middleware: Handle cross-cutting concerns
✓ Utils: Reusable helper functions
✓ Routes: Define API endpoints
```

---

## 🐛 Troubleshooting

### Issue: MongoDB Connection Failed

```
Error: connect ECONNREFUSED 127.0.0.1:27017

Solution:
1. Ensure MongoDB is running:
   mongod

2. Check MONGODB_URI in .env:
   MONGODB_URI=mongodb://localhost:27017/occasio

3. Test connection:
   mongo "mongodb://localhost:27017/occasio"

4. Check MongoDB status:
   sudo systemctl status mongod  # macOS/Linux
   net start MongoDB             # Windows
```

### Issue: JWT Token Expired

```
Error: TokenExpiredError: jwt expired

Solution:
1. User must login again
2. Implement refresh endpoint
3. Check JWT_EXPIRE in .env

Alternative: Use refresh token
POST /api/auth/refresh
Body: { "refreshToken": "..." }
```

### Issue: Port Already in Use

```
Error: listen EADDRINUSE :::5000

Solution:
1. Kill process using port:
   lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

2. Or change PORT in .env:
   PORT=5001

3. Check what's using port:
   netstat -tulpn | grep :5000
```

### Issue: Validation Error

```
Error: "email" is required

Solution:
1. Check request body format
2. Review validation schemas:
   src/utils/validationSchemas.js

3. Use example requests from API docs

4. Enable debug mode:
   DEBUG=occasio:* npm start
```

### Issue: Permission Denied

```
Error: FORBIDDEN - You don't have permission

Solution:
1. Check user's roles:
   GET /api/user/:id

2. Check role permissions:
   GET /api/role/:roleId

3. Verify token contains permissions

4. Re-login to refresh token
```

### Debug Mode

```bash
# Enable debug logging
DEBUG=occasio:* npm start

# View specific logs
tail -f logs/app.log
tail -f logs/error.log

# Monitor in real-time
npm run monitor
```

---

## 🤝 Contributing

### Contribution Guidelines

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/occasio.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes**
   - Follow coding standards
   - Write meaningful comments
   - Update tests

4. **Commit Changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

5. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open Pull Request**
   - Describe changes clearly
   - Reference related issues
   - Ensure tests pass

### Code Standards

```javascript
// ✓ Good examples

// Use const/let, not var
const userName = "John";

// Use async/await
async function getUser(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new ValidationError("User not found");
  }
}

// Use descriptive names
const isValidEmail = (email) => /[\w\.\-]+@[\w\.\-]+\.\w+/.test(email);

// Add JSDoc comments
/**
 * Create a new user
 * @param {Object} userData - User data
 * @returns {Promise<User>} Created user
 * @throws {ValidationError} If validation fails
 */
async function createUser(userData) { }
```

---

## ❓ FAQ

**Q: How do I reset my password?**
A: Use the forgot password endpoint (to be implemented) or contact admin.

**Q: Can I assign multiple roles to a user?**
A: Yes, users can have multiple roles. The most permissive role determines access.

**Q: How often should I rotate JWT secrets?**
A: At least every 90 days in production. Update and redeploy to invalidate old tokens.

**Q: Is MongoDB connection string secure in .env?**
A: Yes, .env is gitignored. Never commit .env to version control.

**Q: How do I enable 2FA?**
A: Set `ENABLE_2FA=true` in .env (requires implementation extension).

**Q: What's the maximum request size?**
A: Default 1MB. Change with `express.json({ limit: '10mb' })`.

**Q: How are rate limits configured?**
A: Via environment variables RATE_LIMIT_WINDOW and RATE_LIMIT_MAX_REQUESTS.

**Q: Can I use MongoDB Atlas?**
A: Yes! Use MongoDB Atlas connection string in MONGODB_URI.

**Q: Does this support horizontal scaling?**
A: Yes! Use environment-based configuration and session management.

**Q: How do I monitor performance?**
A: Use `npm run monitor` or integrate with APM tools like New Relic.

---

## 📞 Support

### Getting Help

- **📧 Email**: support@occasio.com
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/yourusername/occasio/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/yourusername/occasio/discussions)
- **📖 Documentation**: [Wiki](https://github.com/yourusername/occasio/wiki)
- **🆘 Emergency**: security@occasio.com (security issues)

### Community

- Join our Discord server
- Follow on Twitter/X
- Read blog posts
- Attend webinars

---

## 📜 License

This project is licensed under the **ISC License**.

```
Copyright © 2026 Occasio Team

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
```

See [LICENSE](LICENSE) file for full details.

---

## 🙏 Acknowledgments

- Express.js community
- MongoDB & Mongoose teams
- JWT best practices contributors
- All open-source contributors

---

## 📱 Social & Contact

- Website: https://www.occasio.com
- Email: hello@occasio.com
- Twitter: @occasio_official
- GitHub: github.com/occasio
- LinkedIn: linkedin.com/company/occasio

---

**Made with ❤️ by Occasio Development Team**

**Version:** 1.0.0  
**Last Updated:** March 3, 2026  
**Status:** 🟢 Active Development

---

**Happy Wedding Planning! 🎉💕**
