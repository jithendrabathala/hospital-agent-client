import React from "react";

export function Badge({ children, variant = "default", className = "" }) {
    const base =
        "inline-flex items-center px-2 py-0.5 rounded text-sm font-medium";
    const variants = {
        default: "bg-gray-100 text-gray-800",
        primary: "bg-blue-100 text-blue-800",
        secondary: "bg-slate-100 text-slate-800",
    };

    return (
        <span
            className={[
                base,
                variants[variant] || variants.default,
                className,
            ].join(" ")}
        >
            {children}
        </span>
    );
}

export default Badge;
