export const Label = ({ className, ...props }) => {
    return (
        <label
            className={`block text-sm font-medium text-zinc-300 ${className || ""}`}
            {...props}
        />
    );
};
