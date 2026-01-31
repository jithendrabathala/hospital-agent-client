import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "@/lib/icons";

export default function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <section className="relative flex flex-col min-h-screen overflow-hidden">
            <div className="container relative z-10 flex flex-col flex-1 px-4 py-24 mx-auto sm:py-32">
                <div className="flex flex-col justify-center flex-1 max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <Badge
                            variant="secondary"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm"
                        >
                            <Sparkles className="w-4 h-4" />
                            Latest component
                        </Badge>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-8"
                    >
                        <h1
                            id="main-title"
                            className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
                        >
                            Reach <strong>developers</strong> <span>&</span>{" "}
                            <br />
                            <strong>creators</strong>{" "}
                            <em className="italic">effortlessly</em>
                        </h1>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-2xl mx-auto mb-12 text-lg text-muted-foreground"
                    >
                        Beautiful, accessible components built with Tailwind CSS
                        and Framer Motion. Copy, paste, and customize to build
                        your next project faster.
                    </motion.p>

                    {/* Call-to-action */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col items-center gap-6"
                    >
                        {/* Decorative SVG */}
                        <svg
                            width="100"
                            height="50"
                            viewBox="0 0 100 50"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mt-8 text-foreground"
                        >
                            {/* ...paths here... */}
                        </svg>

                        {/* Get Started Button */}
                        <a href="/docs/components/theme-toggle-animations">
                            <div className="group cursor-pointer border border-border bg-card gap-2 h-[60px] flex items-center p-[10px] rounded-full">
                                <div className="border border-border bg-primary h-[40px] rounded-full flex items-center justify-center text-primary-foreground">
                                    <p className="flex items-center justify-center gap-2 ml-3 mr-3 text-base font-medium tracking-tight">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-globe animate-spin"
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                            ></circle>
                                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                                            <path d="M2 12h20"></path>
                                        </svg>
                                        Get started
                                    </p>
                                </div>
                                <div className="text-muted-foreground group-hover:ml-4 ease-in-out transition-all size-[24px] flex items-center justify-center rounded-full border-2 border-border">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="transition-all ease-in-out lucide lucide-arrow-right group-hover:rotate-180"
                                    >
                                        <path d="M5 12h14"></path>
                                        <path d="m12 5 7 7-7 7"></path>
                                    </svg>
                                </div>
                            </div>
                        </a>
                    </motion.div>
                </div>

                {/* Social Proof */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="pb-8 mt-auto"
                >
                    <div className="text-center">
                        <p className="mb-6 text-sm text-muted-foreground">
                            Trusted by developers at
                        </p>
                        <div className="flex items-center justify-center gap-8">
                            {/* Logos */}
                            <div className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300">
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 512 512"
                                    className="w-8 h-8 fill-current text-foreground"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M256,48,496,464H16Z"
                                    />
                                </svg>
                            </div>

                            <div className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all duration-300">
                                <img
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tailwind_CSS_Logo.svg-6xxjTKleFAC9zoBBGesuy0rIESAcXA.png"
                                    alt="Tailwind CSS"
                                    className="object-contain h-8"
                                />
                            </div>

                            <div className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300">
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    className="w-8 h-8 fill-current text-foreground"
                                >
                                    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
                                </svg>
                            </div>

                            <div className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300">
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 256 256"
                                    className="w-8 h-8 fill-current text-foreground"
                                >
                                    <path
                                        d="M119.616813,0.0688905149 C119.066276,0.118932037 117.314565,0.294077364 115.738025,0.419181169 ... (truncated for brevity) ..."
                                        fill="#ffffff"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
