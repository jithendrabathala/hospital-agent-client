# Hospital Booking Agent - Frontend

A modern React application for booking hospital appointments with an intuitive user interface built with Vite, React, and Tailwind CSS.

## 🚀 Features

- **Modern UI**: Built with React 19 and Tailwind CSS
- **Responsive Design**: Mobile-first responsive design
- **Authentication**: User registration and login
- **Hospital Search**: Search and filter hospitals by location and specialty
- **Appointment Booking**: Interactive calendar for booking appointments
- **Analytics Dashboard**: View appointment statistics and insights
- **VoiceFlow Integration**: AI-powered chat interface
- **Dark Mode**: Theme switcher with dark mode support

## 📋 Prerequisites

- **Node.js**: v18 or higher
- **pnpm**: Package manager (or npm/yarn)
- **Backend Server**: Running backend API server

## 🔧 Dependencies Overview

### Core Dependencies

- **react**: ^19.2.0 - UI library
- **react-dom**: ^19.2.0 - React DOM renderer
- **react-router-dom**: ^7.13.0 - Client-side routing
- **axios**: ^1.13.4 - HTTP client for API requests

### UI Components & Styling

- **tailwindcss**: ^3.4.6 - Utility-first CSS framework
- **@radix-ui/react-\***: Accessible UI components
  - `@radix-ui/react-checkbox` - Checkbox components
  - `@radix-ui/react-popover` - Popover components
- **lucide-react**: ^0.563.0 - Icon library
- **framer-motion**: ^12.29.2 - Animation library
- **next-themes**: ^0.2.0 - Theme management

### Data & Forms

- **react-day-picker**: ^9.13.0 - Calendar and date picker
- **date-fns**: ^4.1.0 - Date manipulation utilities
- **recharts**: ^3.7.0 - Charting library for analytics

### Utilities

- **clsx**: ^2.1.1 - Conditional className utility
- **tailwind-merge**: ^3.4.0 - Tailwind class merging utility

### Development Tools

- **vite**: ^7.2.4 - Build tool and dev server
- **@vitejs/plugin-react**: ^5.1.1 - React plugin for Vite
- **eslint**: ^9.39.1 - Code linting
- **autoprefixer**: ^10.4.23 - CSS autoprefixer
- **postcss**: ^8.5.6 - CSS processing

## 🛠️ Installation

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

   Or using npm:

   ```bash
   npm install
   ```

2. **Configure API endpoint:**

   Create or update the API configuration in `src/lib/api.js`:

   ```javascript
   // Ensure the baseURL points to your backend server
   const api = axios.create({
     baseURL: "http://localhost:5000/api", // Update if different
   });
   ```

## 🚀 Running the Application

### Development Mode

```bash
pnpm dev
```

The app will start on `http://localhost:5173` (default Vite port)

### Build for Production

```bash
pnpm build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
pnpm preview
```

Serves the production build locally for testing.

### Lint Code

```bash
pnpm lint
```

## 🌐 Backend API Integration

The frontend requires the backend server to be running. Configure the API endpoint:

1. **Development**: Update `baseURL` in `src/lib/api.js`:

   ```javascript
   baseURL: "http://localhost:5000/api";
   ```

2. **Production**: Update the API URL for your deployed backend:
   ```javascript
   baseURL: "https://your-backend-domain.com/api";
   ```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Application entry point
│   ├── assets/                    # Static assets
│   ├── components/                # Reusable components
│   │   ├── faq-section.jsx
│   │   ├── features.jsx
│   │   ├── hero.jsx
│   │   ├── pricing-section.jsx
│   │   ├── testimonials.jsx
│   │   ├── theme-provider.jsx
│   │   ├── home/
│   │   ├── magicui/               # Magic UI components
│   │   └── ui/                    # UI components
│   │       ├── badge.jsx
│   │       ├── button.jsx
│   │       ├── calendar.jsx
│   │       ├── card.jsx
│   │       ├── checkbox.jsx
│   │       ├── input.jsx
│   │       └── ...
│   ├── context/                   # React contexts
│   │   └── AuthContext.jsx        # Authentication context
│   ├── hooks/                     # Custom React hooks
│   │   ├── use-mobile.js
│   │   └── use-toast.js
│   ├── lib/                       # Utilities and configs
│   │   ├── api.js                 # Axios API configuration
│   │   ├── fonts.js
│   │   ├── icons.jsx
│   │   ├── load-script.js
│   │   └── utils.js
│   ├── pages/                     # Page components
│   │   ├── VoiceFlowPage.jsx      # VoiceFlow chat interface
│   │   ├── analytics/
│   │   │   ├── AnalyticsDashboard.jsx
│   │   │   └── AnalyticsPage.jsx
│   │   ├── auth/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   └── dashboard/
│   │   └── landing/
│   │       └── Page.jsx
│   └── styles/                    # Global styles
│       └── alignment.css
├── public/                        # Public assets
├── index.html                     # HTML entry point
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── eslint.config.js               # ESLint configuration
└── package.json                   # Project dependencies
```

## 🎨 Styling

This project uses:

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Pre-built UI components in `src/components/ui/`
- **Theme Support**: Light/dark mode with `next-themes`
- **Animations**: Framer Motion for smooth animations

## 🔐 Authentication

The app uses context-based authentication:

- **AuthContext**: Manages user authentication state
- **Protected Routes**: Requires login for dashboard and booking features
- **JWT Tokens**: Stored in localStorage (consider httpOnly cookies for production)

## 📱 Key Features

### Landing Page

- Hero section with call-to-action
- Features showcase
- Pricing information
- Testimonials
- FAQ section

### Authentication

- User registration
- Login with JWT
- Protected dashboard

### Dashboard

- Dashboard overview
- User profile management
- Appointment history

### Hospital Search & Booking

- Search hospitals by location
- Filter by specialty
- View hospital details
- Interactive calendar for appointment booking

### Analytics

- Appointment statistics
- Visual charts using Recharts
- Dashboard insights

### VoiceFlow Integration

- AI-powered chat interface
- Real-time conversation
- Hospital booking assistance

## 🚀 Deployment

### Vercel (Recommended)

The project includes a `vercel.json` configuration file.

1. Install Vercel CLI:

   ```bash
   pnpm add -g vercel
   ```

2. Deploy:

   ```bash
   vercel
   ```

3. Configure environment variables in Vercel dashboard:
   - Set the backend API URL

### Other Platforms

Build the project and serve the `dist/` folder:

```bash
pnpm build
```

The build output can be deployed to:

- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Any static hosting service

## 🔧 Configuration Files

### Vite Configuration

- React plugin configuration
- Build settings
- Server configuration

### Tailwind Configuration

- Custom theme colors
- Plugins and extensions
- Content paths

### ESLint Configuration

- Code style rules
- React-specific linting

## 🐛 Troubleshooting

**Build Errors:**

- Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

**API Connection Issues:**

- Verify backend server is running
- Check API baseURL in `src/lib/api.js`
- Check browser console for CORS errors

**Styling Issues:**

- Rebuild Tailwind: `pnpm dev` (Tailwind compiles on dev server start)
- Check Tailwind configuration in `tailwind.config.js`

## 📝 Environment Variables

For production deployment, set these environment variables:

```env
VITE_API_URL=https://your-backend-api.com/api
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🎯 Development Tips

1. **Hot Module Replacement**: Vite provides instant HMR for fast development
2. **Component Organization**: Keep components small and reusable
3. **State Management**: Use Context API for global state
4. **API Integration**: Centralize API calls in `src/lib/api.js`
5. **Styling**: Use Tailwind utilities, create custom components for reusability

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Components](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)

## 🤝 Integration with Backend

Ensure your backend is running before starting the frontend:

1. Start backend server (from backend directory):

   ```bash
   cd ../backend
   pnpm dev
   ```

2. Start frontend server (from frontend directory):
   ```bash
   cd ../frontend
   pnpm dev
   ```

The frontend will communicate with the backend API for:

- User authentication
- Hospital data
- Appointment booking
- Analytics data
