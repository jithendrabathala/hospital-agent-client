export const Button = ({
    children,
    className,
    variant = "default",
    ...props
}) => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors";
    const variantStyles = {
        default:
            "bg-[#1dd1a1] text-black hover:bg-[#12b981] disabled:opacity-50",
        outline: "border border-zinc-700 text-white hover:bg-zinc-800",
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${className || ""}`}
            {...props}
        >
            {children}
        </button>
    );
};
