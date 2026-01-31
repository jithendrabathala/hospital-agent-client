import { useState } from "react";
import {
    Phone,
    PhoneIncoming,
    MessageSquare,
    Search,
    MapPin,
    Building2,
    CheckCircle,
    ChevronRight,
    Volume2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VoiceFlowPage() {
    const [currentStep, setCurrentStep] = useState("incoming");

    const steps = [
        { id: "incoming", label: "Incoming Call" },
        { id: "greeting", label: "AI Greeting" },
        { id: "intent", label: "Patient Intent" },
        { id: "results", label: "Hospital Results" },
        { id: "confirmation", label: "Booking" },
        { id: "success", label: "Success" },
    ];

    const getCurrentStepIndex = () =>
        steps.findIndex((s) => s.id === currentStep);

    const hospitals = [
        {
            name: "City General Hospital",
            distance: "2.3 mi",
            specialty: "Cardiology",
            available: "Today at 3:00 PM",
        },
        {
            name: "St. Mary Medical Center",
            distance: "3.1 mi",
            specialty: "Cardiology",
            available: "Tomorrow at 10:00 AM",
        },
        {
            name: "Metro Health Clinic",
            distance: "4.5 mi",
            specialty: "Cardiology",
            available: "Today at 5:00 PM",
        },
    ];

    const renderStepContent = () => {
        switch (currentStep) {
            case "incoming":
                return (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <div className="w-32 h-32 mx-auto mb-8 bg-[#1dd1a1]/10 rounded-full flex items-center justify-center relative">
                            <motion.div
                                className="absolute inset-0 rounded-full bg-[#1dd1a1]/20"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                            <PhoneIncoming className="w-16 h-16 text-[#1dd1a1] relative z-10" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Incoming Call
                        </h2>
                        <p className="text-gray-400 mb-2">
                            Phone: +1 (555) 123-4567
                        </p>
                        <p className="text-sm text-gray-400 mb-8">
                            Patient initiating appointment request...
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-[#1dd1a1] mb-8">
                            <div className="w-2 h-2 bg-[#1dd1a1] rounded-full animate-pulse" />
                            <span>Call connecting...</span>
                        </div>
                        <button
                            onClick={() => setCurrentStep("greeting")}
                            className="px-8 py-3 bg-[#1dd1a1] hover:bg-[#1dd1a1]/90 text-[#0f172a] rounded-lg transition-all inline-flex items-center gap-2"
                        >
                            Answer Call
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                );

            case "greeting":
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-center"
                    >
                        <div className="w-24 h-24 mx-auto mb-8 bg-[#1dd1a1]/10 rounded-full flex items-center justify-center">
                            <Volume2 className="w-12 h-12 text-[#1dd1a1]" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-6">
                            AI Agent Speaking
                        </h2>

                        <div className="bg-[#1e293b]/50 border border-[#1dd1a1]/20 rounded-xl p-8 mb-8 max-w-2xl mx-auto">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-[#1dd1a1]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <MessageSquare className="w-5 h-5 text-[#1dd1a1]" />
                                </div>
                                <div className="text-left">
                                    <p className="text-lg text-white mb-4">
                                        "Welcome to Hospital Booking Agent! I'm
                                        here to help you schedule an
                                        appointment. How can I assist you
                                        today?"
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <div className="flex gap-1">
                                            <motion.div
                                                className="w-1 h-4 bg-[#1dd1a1] rounded-full"
                                                animate={{
                                                    scaleY: [1, 1.5, 1],
                                                }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 0.8,
                                                    delay: 0,
                                                }}
                                            />
                                            <motion.div
                                                className="w-1 h-4 bg-[#1dd1a1] rounded-full"
                                                animate={{
                                                    scaleY: [1, 1.5, 1],
                                                }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 0.8,
                                                    delay: 0.1,
                                                }}
                                            />
                                            <motion.div
                                                className="w-1 h-4 bg-[#1dd1a1] rounded-full"
                                                animate={{
                                                    scaleY: [1, 1.5, 1],
                                                }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 0.8,
                                                    delay: 0.2,
                                                }}
                                            />
                                        </div>
                                        <span>AI speaking...</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setCurrentStep("intent")}
                            className="px-8 py-3 bg-[#1dd1a1] hover:bg-[#1dd1a1]/90 text-[#0f172a] rounded-lg transition-all inline-flex items-center gap-2"
                        >
                            Patient Responds
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                );

            case "intent":
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-center"
                    >
                        <div className="w-24 h-24 mx-auto mb-8 bg-blue-400/10 rounded-full flex items-center justify-center">
                            <Search className="w-12 h-12 text-blue-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Patient Request Detected
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setCurrentStep("results")}
                                className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 hover:border-[#1dd1a1]/50 transition-all text-left"
                            >
                                <div className="w-12 h-12 bg-[#1dd1a1]/10 rounded-lg flex items-center justify-center mb-4">
                                    <MapPin className="w-6 h-6 text-[#1dd1a1]" />
                                </div>
                                <h3 className="font-semibold text-white mb-2">
                                    By Location
                                </h3>
                                <p className="text-sm text-gray-400 mb-3">
                                    "Find me a cardiologist near downtown"
                                </p>
                                <span className="text-xs text-[#1dd1a1]">
                                    Select this intent →
                                </span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setCurrentStep("results")}
                                className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 hover:border-[#1dd1a1]/50 transition-all text-left"
                            >
                                <div className="w-12 h-12 bg-blue-400/10 rounded-lg flex items-center justify-center mb-4">
                                    <Building2 className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="font-semibold text-white mb-2">
                                    By Specialty
                                </h3>
                                <p className="text-sm text-gray-400 mb-3">
                                    "I need a cardiology appointment"
                                </p>
                                <span className="text-xs text-blue-400">
                                    Select this intent →
                                </span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setCurrentStep("results")}
                                className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 hover:border-[#1dd1a1]/50 transition-all text-left"
                            >
                                <div className="w-12 h-12 bg-purple-400/10 rounded-lg flex items-center justify-center mb-4">
                                    <MapPin className="w-6 h-6 text-purple-400" />
                                </div>
                                <h3 className="font-semibold text-white mb-2">
                                    Nearby
                                </h3>
                                <p className="text-sm text-gray-400 mb-3">
                                    "What hospitals are near me?"
                                </p>
                                <span className="text-xs text-purple-400">
                                    Select this intent →
                                </span>
                            </motion.button>
                        </div>

                        <p className="text-sm text-gray-400">
                            Click any option to see AI-powered search results
                        </p>
                    </motion.div>
                );

            case "results":
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="text-center mb-8">
                            <div className="w-24 h-24 mx-auto mb-6 bg-[#1dd1a1]/10 rounded-full flex items-center justify-center">
                                <Building2 className="w-12 h-12 text-[#1dd1a1]" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">
                                Available Hospitals
                            </h2>
                            <p className="text-gray-400">
                                AI found {hospitals.length} matching hospitals
                                for cardiology
                            </p>
                        </div>

                        <div className="max-w-3xl mx-auto space-y-4 mb-8">
                            {hospitals.map((hospital, index) => (
                                <motion.div
                                    key={hospital.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 hover:border-[#1dd1a1]/50 transition-all"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white text-lg mb-2">
                                                {hospital.name}
                                            </h3>
                                            <div className="flex flex-wrap gap-3 text-sm">
                                                <span className="flex items-center gap-1 text-gray-400">
                                                    <MapPin className="w-4 h-4" />
                                                    {hospital.distance}
                                                </span>
                                                <span className="flex items-center gap-1 text-[#1dd1a1]">
                                                    <Building2 className="w-4 h-4" />
                                                    {hospital.specialty}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-400 mb-2">
                                                Next Available
                                            </p>
                                            <p className="text-sm font-medium text-green-400">
                                                {hospital.available}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setCurrentStep("confirmation")
                                        }
                                        className="w-full px-6 py-3 bg-[#1dd1a1]/10 hover:bg-[#1dd1a1]/20 text-[#1dd1a1] rounded-lg transition-all"
                                    >
                                        Select This Hospital
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                );

            case "confirmation":
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-center"
                    >
                        <div className="w-24 h-24 mx-auto mb-8 bg-yellow-400/10 rounded-full flex items-center justify-center">
                            <MessageSquare className="w-12 h-12 text-yellow-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Confirming Booking
                        </h2>

                        <div className="bg-[#1e293b] border border-[#1dd1a1]/20 rounded-xl p-8 mb-8 max-w-2xl mx-auto">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-[#1dd1a1]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Volume2 className="w-5 h-5 text-[#1dd1a1]" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-lg text-white mb-2">
                                            "Great! I'll book you an appointment
                                            at City General Hospital for
                                            cardiology. The appointment is
                                            available today at 3:00 PM. Can I
                                            get your name and phone number?"
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t border-[#334155] pt-6">
                                    <div className="bg-[#0f172a] rounded-lg p-6 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">
                                                Hospital:
                                            </span>
                                            <span className="text-white font-medium">
                                                City General Hospital
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">
                                                Department:
                                            </span>
                                            <span className="text-white font-medium">
                                                Cardiology
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">
                                                Date & Time:
                                            </span>
                                            <span className="text-white font-medium">
                                                Today at 3:00 PM
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">
                                                Patient:
                                            </span>
                                            <span className="text-white font-medium">
                                                Sarah Johnson
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setCurrentStep("success")}
                            className="px-8 py-3 bg-[#1dd1a1] hover:bg-[#1dd1a1]/90 text-[#0f172a] rounded-lg transition-all inline-flex items-center gap-2"
                        >
                            Confirm Booking
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                );

            case "success":
                return (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className="w-32 h-32 mx-auto mb-8 bg-green-400/10 rounded-full flex items-center justify-center"
                        >
                            <CheckCircle className="w-16 h-16 text-green-400" />
                        </motion.div>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Booking Confirmed!
                        </h2>

                        <div className="bg-[#1e293b] border border-green-400/20 rounded-xl p-8 mb-8 max-w-2xl mx-auto">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-10 h-10 bg-green-400/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Volume2 className="w-5 h-5 text-green-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-lg text-white">
                                        "Perfect! Your appointment is confirmed
                                        for today at 3:00 PM at City General
                                        Hospital, Cardiology Department. You'll
                                        receive a confirmation text message
                                        shortly. Is there anything else I can
                                        help you with?"
                                    </p>
                                </div>
                            </div>

                            <div className="bg-green-400/5 border border-green-400/20 rounded-lg p-6">
                                <h3 className="font-semibold text-white mb-4">
                                    Booking Summary
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">
                                            Booking ID:
                                        </span>
                                        <span className="text-[#1dd1a1] font-medium">
                                            BK001
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">
                                            Patient:
                                        </span>
                                        <span className="text-white">
                                            Sarah Johnson
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">
                                            Hospital:
                                        </span>
                                        <span className="text-white">
                                            City General Hospital
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">
                                            Department:
                                        </span>
                                        <span className="text-white">
                                            Cardiology
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">
                                            Date & Time:
                                        </span>
                                        <span className="text-green-400 font-medium">
                                            Today at 3:00 PM
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setCurrentStep("incoming")}
                                className="px-8 py-3 bg-[#1dd1a1]/10 hover:bg-[#1dd1a1]/20 text-[#1dd1a1] rounded-lg transition-all"
                            >
                                Start New Call
                            </button>
                        </div>
                    </motion.div>
                );
        }
    };

    return (
        <div className="p-8 min-h-screen bg-[#0f172a]">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Voice Booking Flow
                </h1>
                <p className="text-gray-400">
                    Visualize the AI-powered patient voice booking experience
                </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-12 max-w-4xl mx-auto">
                <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="flex items-center flex-1 last:flex-initial"
                        >
                            <div className="flex flex-col items-center flex-1">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                                        index <= getCurrentStepIndex()
                                            ? "bg-[#1dd1a1] border-[#1dd1a1] text-[#0f172a]"
                                            : "bg-[#1e293b] border-[#334155] text-gray-400"
                                    }`}
                                >
                                    {index < getCurrentStepIndex() ? (
                                        <CheckCircle className="w-5 h-5" />
                                    ) : (
                                        <span className="text-sm font-medium">
                                            {index + 1}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-400 mt-2 text-center">
                                    {step.label}
                                </p>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`h-0.5 flex-1 mx-2 transition-all ${
                                        index < getCurrentStepIndex()
                                            ? "bg-[#1dd1a1]"
                                            : "bg-[#334155]"
                                    }`}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Flow Content */}
            <div className="bg-[#1e293b]/30 border border-[#334155] rounded-2xl p-12 max-w-6xl mx-auto">
                <AnimatePresence mode="wait">
                    {renderStepContent()}
                </AnimatePresence>
            </div>
        </div>
    );
}
