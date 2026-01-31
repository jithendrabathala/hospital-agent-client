export const Input = ({ className, ...props }) => {
    return (
        <input
            className={`w-full px-3 py-2.5 bg-zinc-800/50 border border-zinc-700 text-white rounded-lg focus:outline-none focus:border-[#1dd1a1] focus:ring-2 focus:ring-[#1dd1a1]/20 placeholder-zinc-500 transition-colors ${className || ""}`}
            {...props}
        />
    );
};
