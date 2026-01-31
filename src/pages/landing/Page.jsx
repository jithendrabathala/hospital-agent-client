import { useNavigate } from "react-router-dom";
import {
    Activity,
    Phone,
    Calendar,
    Clock,
    Shield,
    Zap,
    Globe,
    BarChart3,
    CheckCircle,
    ArrowRight,
    Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
    const navigate = useNavigate();

    const features = [
        {
            icon: Phone,
            title: "AI Voice Booking",
            description:
                "Natural language processing enables patients to book appointments via phone in any language",
            color: "text-[#1dd1a1]",
            bgColor: "bg-[#1dd1a1]/10",
        },
        {
            icon: Calendar,
            title: "Real-Time Scheduling",
            description:
                "Instant appointment confirmation with live hospital availability updates",
            color: "text-blue-400",
            bgColor: "bg-blue-400/10",
        },
        {
            icon: Shield,
            title: "HIPAA Compliant",
            description:
                "Enterprise-grade security protecting patient data and medical information",
            color: "text-purple-400",
            bgColor: "bg-purple-400/10",
        },
        {
            icon: Globe,
            title: "Multi-Language Support",
            description:
                "Serve diverse patient populations with support for 50+ languages",
            color: "text-green-400",
            bgColor: "bg-green-400/10",
        },
        {
            icon: Zap,
            title: "Instant Processing",
            description:
                "Average booking time under 3 minutes with 94% success rate",
            color: "text-yellow-400",
            bgColor: "bg-yellow-400/10",
        },
        {
            icon: BarChart3,
            title: "Advanced Analytics",
            description:
                "Deep insights into booking patterns, call volumes, and performance metrics",
            color: "text-pink-400",
            bgColor: "bg-pink-400/10",
        },
    ];

    const stats = [
        { value: "50K+", label: "Appointments Booked" },
        { value: "200+", label: "Hospitals Connected" },
        { value: "94%", label: "Success Rate" },
        { value: "2.5min", label: "Avg. Booking Time" },
    ];

    const howItWorks = [
        {
            step: "1",
            title: "Patient Calls",
            description:
                "Patient dials your dedicated booking number and is greeted by our AI agent",
            icon: Phone,
        },
        {
            step: "2",
            title: "AI Understanding",
            description:
                "Natural language AI understands intent, location, and medical specialty needs",
            icon: Sparkles,
        },
        {
            step: "3",
            title: "Smart Matching",
            description:
                "System finds available hospitals and time slots based on patient requirements",
            icon: Calendar,
        },
        {
            step: "4",
            title: "Instant Booking",
            description:
                "Appointment confirmed in real-time with automated notifications sent",
            icon: CheckCircle,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-sm bg-[#0f172a]">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1dd1a1]/10">
                                <Activity className="w-6 h-6 text-[#1dd1a1]" />
                            </div>
                            <div>
                                <h2 className="font-black text-[#ffffff]">
                                    Care Call AI Agent
                                </h2>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/login")}
                                className="px-4 py-2 transition-colors text-muted-[#ffffff] hover:text-[#ffffff]"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => navigate("/register")}
                                className="px-6 py-2 transition-all rounded-lg bg-[#1dd1a1] hover:bg-[#1dd1a1]/90 text-[#1dd1a1]-[#ffffff]"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1dd1a1]/5 to-blue-400/5" />
                <div className="relative px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm border rounded-full bg-[#1dd1a1]/10 border-[#1dd1a1]/20 text-[#1dd1a1]">
                            <Sparkles className="w-4 h-4" />
                            <span>AI-Powered Healthcare Booking</span>
                        </div>
                        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl text-[#ffffff]">
                            Transform Patient Booking with{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1dd1a1] to-blue-400">
                                AI Voice Technology
                            </span>
                        </h1>
                        <p className="max-w-2xl mx-auto mb-12 text-xl text-muted-[#ffffff]">
                            Automate hospital appointment scheduling with
                            intelligent voice agents. Available 24/7, speaking
                            50+ languages, handling unlimited calls
                            simultaneously.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <button
                                onClick={() => navigate("/login")}
                                className="inline-flex items-center gap-2 px-8 py-4 text-lg transition-all rounded-lg shadow-lg bg-[#1dd1a1] hover:bg-[#1dd1a1]/90 text-[#1dd1a1]-[#ffffff] shadow-[#1dd1a1]/20"
                            >
                                Start Free Trial
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => navigate("/voice-flow")}
                                className="inline-flex items-center gap-2 px-8 py-4 text-lg transition-all border rounded-lg bg-[#1e293b] hover:bg-[#1e293b]/80 text-[#ffffff] border-border"
                            >
                                <Phone className="w-5 h-5" />
                                See Demo
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="border-y border-border/50 bg-[#1e293b]/30 backdrop-blur-sm">
                <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <h3 className="mb-2 text-4xl font-bold md:text-5xl text-[#1dd1a1]">
                                    {stat.value}
                                </h3>
                                <p className="text-muted-[#ffffff]">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-4xl font-bold md:text-5xl text-[#ffffff]">
                            Everything You Need to Scale
                        </h2>
                        <p className="max-w-2xl mx-auto text-xl text-muted-[#ffffff]">
                            Powerful features designed for modern healthcare
                            facilities
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 transition-all border bg-[#1e293b] border-border rounded-xl hover:border-[#1dd1a1]/50 group"
                            >
                                <div
                                    className={`w-14 h-14 ${feature.bgColor} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                                >
                                    <feature.icon
                                        className={`w-7 h-7 ${feature.color}`}
                                    />
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-[#ffffff]">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-[#ffffff]">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-[#1e293b]/30">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-4xl font-bold md:text-5xl text-[#ffffff]">
                            How It Works
                        </h2>
                        <p className="max-w-2xl mx-auto text-xl text-muted-[#ffffff]">
                            Simple, seamless booking process from call to
                            confirmation
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {howItWorks.map((item, index) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="relative"
                            >
                                <div className="p-6 transition-all border bg-[#1e293b] border-border rounded-xl hover:border-[#1dd1a1]/50">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex items-center justify-center w-12 h-12 text-xl font-bold rounded-full bg-[#1dd1a1]/10 text-[#1dd1a1]">
                                            {item.step}
                                        </div>
                                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#1dd1a1]/5">
                                            <item.icon className="w-6 h-6 text-[#1dd1a1]" />
                                        </div>
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold text-[#ffffff]">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-muted-[#ffffff]">
                                        {item.description}
                                    </p>
                                </div>
                                {index < howItWorks.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#1dd1a1]/30" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-12 text-center border bg-gradient-to-r from-[#1dd1a1]/10 to-blue-400/10 border-[#1dd1a1]/20 rounded-2xl"
                    >
                        <h2 className="mb-4 text-4xl font-bold md:text-5xl text-[#ffffff]">
                            Ready to Transform Your Hospital Booking?
                        </h2>
                        <p className="max-w-2xl mx-auto mb-8 text-xl text-muted-[#ffffff]">
                            Join 200+ hospitals already using AI to provide
                            better patient experiences
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <button
                                onClick={() => navigate("/login")}
                                className="inline-flex items-center gap-2 px-8 py-4 text-lg transition-all rounded-lg shadow-lg bg-[#1dd1a1] hover:bg-[#1dd1a1]/90 text-[#1dd1a1]-[#ffffff] shadow-[#1dd1a1]/20"
                            >
                                Start Free Trial
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="inline-flex items-center gap-2 px-8 py-4 text-lg transition-all border rounded-lg bg-[#1e293b] hover:bg-[#1e293b]/80 text-[#ffffff] border-border"
                            >
                                View Dashboard Demo
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border/50 bg-[#1e293b]/30">
                <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-4">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1dd1a1]/10">
                                    <Activity className="w-6 h-6 text-[#1dd1a1]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#ffffff]">
                                        Care Call
                                    </h3>
                                    <p className="text-xs text-muted-[#ffffff]">
                                        AI Agent
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-[#ffffff]">
                                AI-powered appointment booking for modern
                                healthcare facilities.
                            </p>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold text-[#ffffff]">
                                Product
                            </h4>
                            <ul className="space-y-2 text-sm text-muted-[#ffffff]">
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-[#1dd1a1]"
                                    >
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-[#1dd1a1]"
                                    >
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-[#1dd1a1]"
                                    >
                                        Demo
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-[#1dd1a1]"
                                    >
                                        API
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold text-[#ffffff]">
                                Company
                            </h4>
                            <ul className="space-y-2 text-sm text-muted-[#ffffff]">
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-[#1dd1a1]"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-[#1dd1a1]"
                                    >
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-[#1dd1a1]"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-[#1dd1a1]"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold text-[#ffffff]">
                                Legal
                            </h4>
                            <ul className="space-y-2 text-sm text-muted-[#ffffff]">
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-[#1dd1a1]"
                                    >
                                        Privacy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-[#1dd1a1]"
                                    >
                                        Terms
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-[#1dd1a1]"
                                    >
                                        HIPAA
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-[#1dd1a1]"
                                    >
                                        Security
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 pt-8 border-t border-border md:flex-row">
                        <p className="text-sm text-slate-300">
                            © 2026 Hospital Booking Agent. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a
                                href="#"
                                className="transition-colors text-slate-400 hover:text-teal-400"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="transition-colors text-slate-400 hover:text-teal-400"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="transition-colors text-slate-400 hover:text-teal-400"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
