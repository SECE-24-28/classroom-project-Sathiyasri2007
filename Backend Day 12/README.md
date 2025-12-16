# Mobile Recharge Backend API

## Project Structure

```
Backend Day 12/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   ├── userController.js    # User CRUD operations and authentication
│   └── rechargePlanController.js # Recharge plan CRUD operations
├── middleware/
│   └── auth.js             # JWT authentication and authorization middleware
├── models/
│   ├── User.js             # User schema with password encryption
│   └── RechargePlan.js     # Recharge plan schema
├── routes/
│   ├── userRoutes.js       # User API routes
│   └── rechargePlanRoutes.js # Recharge plan API routes
├── .env                    # Environment variables
├── .gitignore             # Git ignore file
├── package.json           # Project dependencies
├── server.js              # Main server file
└── README.md              # Project documentation
```

## Features

- **User Management**: Registration, login, CRUD operations
- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: bcrypt for password hashing
- **Role-based Authorization**: Admin and user roles
- **Recharge Plan Management**: Full CRUD operations
- **MongoDB Integration**: Mongoose ODM
- **Environment Variables**: Secure configuration

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mobile_recharge_db
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
```

3. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login

### Users (Protected)
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)

### Recharge Plans
- `GET /api/recharge-plans` - Get all active plans
- `GET /api/recharge-plans/:id` - Get plan by ID
- `POST /api/recharge-plans` - Create plan (Admin only)
- `PUT /api/recharge-plans/:id` - Update plan (Admin only)
- `DELETE /api/recharge-plans/:id` - Delete plan (Admin only)

## Testing with Postman

1. Register a new user
2. Login to get JWT token
3. Use token in Authorization header: `Bearer <token>`
4. Test protected routes with valid token

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Environment variable protection
- Input validation with Mongoose