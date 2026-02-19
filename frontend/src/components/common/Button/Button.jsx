import clsx from "clsx";

export default function Button({
    children,
    variant = "solid",   // solid | outline | ghost
    color = "primary",   // primary | secondary | danger | success
    size = "md",         // sm | md | lg
    loading = false,
    disabled = false,
    className = "",
    type = "button",
    onClick,
}) {
    const base =
        "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        solid: "text-white",
        outline: "border bg-transparent",
        ghost: "bg-transparent",
    };

    const colors = {
        primary:
            variant === "solid"
                ? "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
                : variant === "outline"
                    ? "border-purple-600 text-purple-600 hover:bg-purple-50"
                    : "text-purple-600 hover:bg-purple-50",

        secondary:
            variant === "solid"
                ? "bg-gray-700 hover:bg-gray-800 focus:ring-gray-500"
                : variant === "outline"
                    ? "border-gray-600 text-gray-700 hover:bg-gray-100"
                    : "text-gray-700 hover:bg-gray-100",

        danger:
            variant === "solid"
                ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                : variant === "outline"
                    ? "border-red-600 text-red-600 hover:bg-red-50"
                    : "text-red-600 hover:bg-red-50",

        success:
            variant === "solid"
                ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                : variant === "outline"
                    ? "border-green-600 text-green-600 hover:bg-green-50"
                    : "text-green-600 hover:bg-green-50",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={clsx(
                base,
                variants[variant],
                colors[color],
                sizes[size],
                (disabled || loading) && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            {loading && (
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}

            {children}
        </button>
    );
}
