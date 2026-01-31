import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await api.post("/api/auth/login", {
                email,
                password,
            });

            const data = response?.data?.data;
            if (data?.token) {
                login(data.token);
                localStorage.setItem("hospitalProfile", JSON.stringify(data));
                if (remember) {
                    localStorage.setItem("rememberLogin", "true");
                } else {
                    localStorage.removeItem("rememberLogin");
                }
                navigate("/dashboard");
            } else {
                setError("Login succeeded but no token was returned.");
            }
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                "Unable to login. Please try again.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-[#0f172a] via-[#1a1f3a] to-[#0f172a] overflow-y-auto py-12">
            {/* Back Button */}
            <Link
                to="/"
                className="absolute top-6 left-6 z-20 text-teal-200/60 hover:text-[#1dd1a1] transition-colors duration-200 flex items-center space-x-2 text-sm"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                <span>Back</span>
            </Link>

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1a1f3a] to-[#0a0f22]" />

            {/* Decorative elements */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-[#1dd1a1]/8 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#1dd1a1]/5 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Header */}
                <div className="mb-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center mb-6"
                    ></motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-2 text-3xl font-bold text-white"
                    >
                        Welcome back
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-zinc-400"
                    >
                        Sign in to your hospital dashboard
                    </motion.p>
                </div>

                {/* Login Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="p-8 border bg-[#1a1f3a]/60 backdrop-blur-xl border-teal-500/20 rounded-2xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="space-y-2"
                        >
                            <Label
                                htmlFor="email"
                                className="text-teal-100 text-start"
                            >
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="hospital@example.com"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                className="bg-[#0f172a]/50 border-teal-400/30 text-white placeholder:text-teal-200/40 focus:border-[#1dd1a1] focus:ring-[#1dd1a1]/20"
                                required
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.35 }}
                            className="space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="password"
                                    className="text-zinc-300"
                                >
                                    Password
                                </Label>
                                <a
                                    href="#"
                                    className="text-xs text-[#1dd1a1] hover:text-[#1dd1a1]/80"
                                >
                                    Forgot?
                                </a>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#1dd1a1] focus:ring-[#1dd1a1]/20"
                                required
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                            className="flex items-center space-x-2"
                        >
                            <input
                                type="checkbox"
                                id="remember"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="rounded border-zinc-700 bg-zinc-800 text-[#1dd1a1] focus:ring-[#1dd1a1]/20"
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm cursor-pointer text-zinc-300"
                            >
                                Remember me
                            </label>
                        </motion.div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 text-sm text-red-300 border rounded-lg bg-red-900/20 border-red-800/50"
                            >
                                {error}
                            </motion.div>
                        )}

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.45 }}
                        >
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#1dd1a1] hover:bg-[#12b981] text-black font-semibold py-3 rounded-xl transition-all duration-200"
                            >
                                {loading ? "Signing in..." : "Sign in"}
                            </Button>
                        </motion.div>
                    </form>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                        className="mt-6 text-center"
                    >
                        <p className="text-sm text-zinc-400">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-[#1dd1a1] hover:text-[#12b981] font-semibold"
                            >
                                Sign up
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
