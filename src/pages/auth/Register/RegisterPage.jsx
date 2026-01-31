import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({
        hospitalName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        latitude: "",
        longitude: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [locationLoading, setLocationLoading] = useState(true);
    const [locationError, setLocationError] = useState("");

    // Auto-fetch geolocation on component mount
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setForm((prev) => ({
                        ...prev,
                        latitude: latitude.toFixed(6),
                        longitude: longitude.toFixed(6),
                    }));
                    setLocationLoading(false);
                },
                (error) => {
                    console.warn("Geolocation error:", error);
                    setLocationError(
                        "Could not get your location. Please enter it manually.",
                    );
                    setLocationLoading(false);
                },
            );
        } else {
            setLocationError("Geolocation is not supported by your browser.");
            setLocationLoading(false);
        }
    }, []);

    const updateField = (field) => (event) => {
        setForm((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const latitude = Number.parseFloat(form.latitude);
        const longitude = Number.parseFloat(form.longitude);

        if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
            setError("Please provide valid latitude and longitude values.");
            return;
        }

        if (
            longitude < -180 ||
            longitude > 180 ||
            latitude < -90 ||
            latitude > 90
        ) {
            setError(
                "Longitude must be between -180 and 180 and latitude between -90 and 90.",
            );
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/api/auth/signup", {
                hospitalName: form.hospitalName,
                email: form.email,
                password: form.password,
                phone: form.phone,
                location: {
                    type: "Point",
                    coordinates: [longitude, latitude],
                    address: form.address,
                    city: form.city,
                    state: form.state,
                    zipCode: form.zipCode,
                    country: form.country,
                },
            });

            const data = response?.data?.data;
            if (data?.token) {
                login(data.token);
                localStorage.setItem("hospitalProfile", JSON.stringify(data));
                navigate("/dashboard");
            } else {
                navigate("/login");
            }
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                "Unable to register. Please try again.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
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
                className="relative z-10 w-full max-w-xl"
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
                        Create account
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-zinc-400"
                    >
                        Register your hospital to start accepting reservations
                    </motion.p>
                </div>

                {/* Register Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="p-8 border bg-zinc-900/50 backdrop-blur-xl border-zinc-800 rounded-2xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-4"
                        >
                            {/* Hospital Name */}
                            <motion.div
                                variants={itemVariants}
                                className="space-y-2"
                            >
                                <Label
                                    htmlFor="hospitalName"
                                    className="text-zinc-300"
                                >
                                    Hospital name
                                </Label>
                                <Input
                                    id="hospitalName"
                                    placeholder="City General Hospital"
                                    value={form.hospitalName}
                                    onChange={updateField("hospitalName")}
                                    className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53]"
                                    required
                                />
                            </motion.div>

                            {/* Email & Phone */}
                            <motion.div
                                variants={itemVariants}
                                className="grid gap-4 md:grid-cols-2"
                            >
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-zinc-300"
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="hospital@example.com"
                                        value={form.email}
                                        onChange={updateField("email")}
                                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53]"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="phone"
                                        className="text-zinc-300"
                                    >
                                        Phone
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="(555) 123-4567"
                                        value={form.phone}
                                        onChange={updateField("phone")}
                                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53]"
                                        required
                                    />
                                </div>
                            </motion.div>

                            {/* Address */}
                            <motion.div
                                variants={itemVariants}
                                className="space-y-2"
                            >
                                <Label
                                    htmlFor="address"
                                    className="text-zinc-300"
                                >
                                    Street address
                                </Label>
                                <Input
                                    id="address"
                                    placeholder="123 Main St"
                                    value={form.address}
                                    onChange={updateField("address")}
                                    className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#1dd1a1]"
                                />
                            </motion.div>

                            {/* City, State, Zip */}
                            <motion.div
                                variants={itemVariants}
                                className="grid gap-4 md:grid-cols-3"
                            >
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="city"
                                        className="text-zinc-300"
                                    >
                                        City
                                    </Label>
                                    <Input
                                        id="city"
                                        placeholder="San Francisco"
                                        value={form.city}
                                        onChange={updateField("city")}
                                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#1dd1a1]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="state"
                                        className="text-zinc-300"
                                    >
                                        State
                                    </Label>
                                    <Input
                                        id="state"
                                        placeholder="CA"
                                        value={form.state}
                                        onChange={updateField("state")}
                                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#1dd1a1]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="zipCode"
                                        className="text-zinc-300"
                                    >
                                        Zip
                                    </Label>
                                    <Input
                                        id="zipCode"
                                        placeholder="94103"
                                        value={form.zipCode}
                                        onChange={updateField("zipCode")}
                                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#1dd1a1]"
                                    />
                                </div>
                            </motion.div>

                            {/* Country, Latitude, Longitude */}
                            <motion.div
                                variants={itemVariants}
                                className="grid gap-4 md:grid-cols-3"
                            >
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="country"
                                        className="text-zinc-300"
                                    >
                                        Country
                                    </Label>
                                    <Input
                                        id="country"
                                        placeholder="USA"
                                        value={form.country}
                                        onChange={updateField("country")}
                                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#1dd1a1]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="latitude"
                                        className="flex items-center justify-between text-zinc-300"
                                    >
                                        <span>Latitude</span>
                                        {locationLoading && (
                                            <span className="text-xs text-[#1dd1a1]">
                                                Getting location...
                                            </span>
                                        )}
                                        {!locationLoading && form.latitude && (
                                            <span className="text-xs text-green-400">
                                                ✓ Auto-detected
                                            </span>
                                        )}
                                    </Label>
                                    <Input
                                        id="latitude"
                                        type="number"
                                        step="any"
                                        min="-90"
                                        max="90"
                                        placeholder="37.7749"
                                        value={form.latitude}
                                        onChange={updateField("latitude")}
                                        readOnly={
                                            locationLoading ||
                                            (form.latitude && !locationError)
                                        }
                                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#1dd1a1] read-only:bg-zinc-700/50 read-only:cursor-not-allowed"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="longitude"
                                        className="flex items-center justify-between text-zinc-300"
                                    >
                                        <span>Longitude</span>
                                        {locationLoading && (
                                            <span className="text-xs text-[#1dd1a1]">
                                                Getting location...
                                            </span>
                                        )}
                                        {!locationLoading && form.longitude && (
                                            <span className="text-xs text-green-400">
                                                ✓ Auto-detected
                                            </span>
                                        )}
                                    </Label>
                                    <Input
                                        id="longitude"
                                        type="number"
                                        step="any"
                                        min="-180"
                                        max="180"
                                        placeholder="-122.4194"
                                        value={form.longitude}
                                        onChange={updateField("longitude")}
                                        readOnly={
                                            locationLoading ||
                                            (form.longitude && !locationError)
                                        }
                                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#1dd1a1] read-only:bg-zinc-700/50 read-only:cursor-not-allowed"
                                        required
                                    />
                                </div>
                            </motion.div>

                            {/* Password & Confirm */}
                            <motion.div
                                variants={itemVariants}
                                className="grid gap-4 md:grid-cols-2"
                            >
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="password"
                                        className="text-zinc-300"
                                    >
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Create a password"
                                        value={form.password}
                                        onChange={updateField("password")}
                                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#1dd1a1]"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="confirmPassword"
                                        className="text-zinc-300"
                                    >
                                        Confirm password
                                    </Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Repeat your password"
                                        value={form.confirmPassword}
                                        onChange={updateField(
                                            "confirmPassword",
                                        )}
                                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#1dd1a1]"
                                        required
                                    />
                                </div>
                            </motion.div>

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 text-sm text-red-300 border rounded-lg bg-red-900/20 border-red-800/50"
                                >
                                    {error}
                                </motion.div>
                            )}

                            {/* Location Error Warning */}
                            {locationError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 text-sm text-teal-300 border rounded-lg bg-teal-900/20 border-teal-500/30"
                                >
                                    ⚠️ {locationError}
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                            >
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#1dd1a1] hover:bg-[#12b981] text-black font-semibold py-3 rounded-xl transition-all duration-200"
                                >
                                    {loading
                                        ? "Creating account..."
                                        : "Create account"}
                                </Button>
                            </motion.div>
                        </motion.div>
                    </form>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                        className="mt-6 text-center"
                    >
                        <p className="text-sm text-zinc-400">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-[#1dd1a1] hover:text-[#12b981] font-semibold"
                            >
                                Sign in
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
