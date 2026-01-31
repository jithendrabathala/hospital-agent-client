"use client";

export function StickyFooter() {
    return (
        <footer className="w-full bg-gradient-to-r from-[#1a1f3a] via-[#1a1f3a] to-[#1a1f3a] border-t border-teal-500/20 text-white">
            <div className="relative px-8 py-12 mx-auto max-w-7xl">
                {/* Links */}
                <div className="flex justify-between items-center md:justify-end gap-16 text-sm md:text-base">
                    <ul className="space-y-2">
                        {["Features", "Pricing", "Security"].map((item) => (
                            <li
                                key={item}
                                className="transition cursor-pointer text-teal-200/60 hover:text-[#1dd1a1]"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>

                    <ul className="space-y-2">
                        {["GitHub", "LinkedIn", "Twitter"].map((item) => (
                            <li
                                key={item}
                                className="transition cursor-pointer text-teal-200/60 hover:text-[#1dd1a1]"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-6 border-t border-teal-500/10 text-center text-teal-200/40 text-xs">
                    <p>© 2026 UniHealing. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
