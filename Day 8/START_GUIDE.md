# Backend Connection Setup Guide

## Prerequisites
- Node.js installed
- MongoDB installed and running

## Setup Instructions

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Start MongoDB
Make sure MongoDB is running on `mongodb://127.0.0.1:27017/rechargeApp`

### 3. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend will run on http://localhost:5173

## API Endpoints Connected

- `POST /api/auth/login` - User login
- `POST /api/transactions` - Add recharge transaction
- `GET /api/transactions` - Get all transactions

## Features Connected
- ✅ User authentication with backend
- ✅ Transaction storage in MongoDB
- ✅ Real-time recharge history
- ✅ API integration with frontend

## Testing
1. Start both servers
2. Go to http://localhost:5173
3. Login with any email/password
4. Make a recharge - it will be saved to MongoDB
5. Check history page for stored transactions