# Mobile Recharge Web Application

A modern React application for mobile recharge services built with Tailwind CSS, React Router, and form validation.

## Features

### Day 7 Requirements ✅
- **Tailwind CSS**: Complete styling and responsive design
- **Props**: Dynamic components with data passing
- **State Management**: Interactive components using useState
- **Context API**: Global authentication state management
- **Component Structure**: Organized components in src/components/

### Day 8 Requirements ✅
- **React Router v6**: Client-side routing implementation
- **Pages**: Landing, Login, Signup, and Recharge Plans pages
- **Navigation**: Dynamic navbar with authentication state
- **Folder Structure**: Organized project structure
- **Authentication Context**: Global auth state management



## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation with auth state
│   ├── Footer.jsx          # Footer component
│   └── PlanCard.jsx        # Reusable plan display card
├── pages/
│   ├── LandingPage.jsx     # Home page with hero section
│   ├── Login.jsx           # Login form with validation
│   ├── Signup.jsx          # Signup form with validation
│   └── RechargePlans.jsx   # Plans listing with filters
├── context/
│   └── AuthContext.jsx     # Global authentication state
├── App.jsx                 # Main app with routing
└── main.jsx               # Entry point
```

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Key Technologies

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

- **Vite** - Build tool

## Features Implemented

### Authentication
- Login/Signup forms with state management
- Global authentication state
- Protected navigation

### UI/UX
- Responsive design with Tailwind CSS
- Interactive components with hover effects
- Clean and modern interface
- Mobile-friendly layout

### Functionality
- Plan filtering (All/Prepaid/Postpaid)
- Form handling with useState
- Navigation between pages
- State management across components



## Usage

1. **Home Page**: Browse featured plans and app features
2. **Login/Signup**: Create account or sign in
3. **Plans Page**: View and filter recharge plans
4. **Navigation**: Seamless routing between pages

The application demonstrates all required concepts from Days 7 and 8 including Tailwind CSS styling, React state management, Context API, and React Router.