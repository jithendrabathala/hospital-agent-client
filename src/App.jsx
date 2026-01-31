import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/landing/Page";
import Login from "./pages/auth/Login/Login";
import RegisterPage from "./pages/auth/Register/RegisterPage";
import Dashboard from "./pages/auth/dashboard/Dashboard";
import AnalyticsDashboard from "./pages/analytics/AnalyticsDashboard";
import VoiceFlowPage from "./pages/VoiceFlowPage";

// Protected Route Component
function ProtectedRoute({ children, isAuthenticated, isLoading }) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="text-white text-lg">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

// Public Route Component (redirects authenticated users to dashboard)
function PublicRoute({ children, isAuthenticated, isLoading }) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="text-white text-lg">Loading...</div>
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

function AppContent() {
    const { isAuthenticated, isLoading } = useAuth();

    return (
        <Routes>
            {/* Public Routes */}
            <Route
                path="/"
                element={
                    <PublicRoute
                        isAuthenticated={isAuthenticated}
                        isLoading={isLoading}
                    >
                        <Home />
                    </PublicRoute>
                }
            />
            <Route
                path="/login"
                element={
                    <PublicRoute
                        isAuthenticated={isAuthenticated}
                        isLoading={isLoading}
                    >
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <PublicRoute
                        isAuthenticated={isAuthenticated}
                        isLoading={isLoading}
                    >
                        <RegisterPage />
                    </PublicRoute>
                }
            />
            <Route path="/voice-flow" element={<VoiceFlowPage />} />

            {/* Protected Routes */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute
                        isAuthenticated={isAuthenticated}
                        isLoading={isLoading}
                    >
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/analytics"
                element={
                    <ProtectedRoute
                        isAuthenticated={isAuthenticated}
                        isLoading={isLoading}
                    >
                        <AnalyticsDashboard />
                    </ProtectedRoute>
                }
            />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
