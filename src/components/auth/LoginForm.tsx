import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useAuth } from "../../contexts/AuthContext";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface LoginFormProps {
  onToggleForm: () => void;
  onClose: () => void;
}

// Step 1: Define the validation schema with Zod
// This is the "contract" that specifies what data we expect from the form.
const loginSchema = z.object({
  loginIdentifier: z
    .string()
    .min(1, { message: "Username or Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// Infer the TypeScript type from the Zod schema
type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({ onToggleForm, onClose }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuth();

  // Step 2: Initialize react-hook-form with our validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    // FIX: Add defaultValues to ensure form fields are initialized as strings, not undefined.
    defaultValues: {
      loginIdentifier: "",
      password: "",
    },
  });

  // Step 3: Create a handler that receives only valid data
  const onSubmit = async (data: LoginFormData) => {
    // --- DIAGNOSTIC LOGGING ---
    // Let's see what data react-hook-form is giving us.
    // Check your browser's developer console for this message.
    console.log("Data received by onSubmit:", JSON.stringify(data));

    try {
      // --- EXTRA SAFEGUARD ---
      // This check should be redundant because of Zod, but let's add it for debugging.
      if (
        typeof data.loginIdentifier !== "string" ||
        typeof data.password !== "string"
      ) {
        toast.error("Form data is invalid. Please try again.");
        console.error(
          "CRITICAL ERROR: Received undefined form data despite validation.",
          data
        );
        return;
      }

      // `data` is an object that has already been validated
      // and contains { loginIdentifier: "...", password: "..." }
      await login(data.loginIdentifier, data.password);
      toast.success("Successfully logged in!");
      onClose();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials.";
      toast.error(errorMessage);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>
          Sign in to your account to access favorites and inquiries
        </CardDescription>
      </CardHeader>
      {/* Step 4: Wrap our handler call in handleSubmit */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="loginIdentifier">Username or Email</Label>
            {/* Step 5: Register the input under the name 'loginIdentifier' */}
            <Input
              id="loginIdentifier"
              type="text"
              placeholder="Enter your username or email"
              {...register("loginIdentifier")}
            />
            {/* Display validation error if it exists */}
            {errors.loginIdentifier && (
              <p className="text-sm text-red-500">
                {errors.loginIdentifier.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          {/* Display general server error */}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 mt-6">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Don't have an account?{" "}
            </span>
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto"
              onClick={onToggleForm}
            >
              Sign up
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
