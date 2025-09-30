import * as React from "react";

import { cn } from "./utils";

// Define and export the props interface for better reusability and clarity
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// Wrap the component in React.forwardRef to allow it to receive a ref
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        // Pass the received ref to the underlying DOM input element
        ref={ref}
        {...props}
      />
    );
  }
);
// Add a display name for better debugging
Input.displayName = "Input";

export { Input };
