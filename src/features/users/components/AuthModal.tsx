import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { useAuth } from "@/contexts/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultForm?: "login" | "register";
}

export function AuthModal({
  isOpen,
  onClose,
  defaultForm = "login",
}: AuthModalProps) {
  const [currentForm, setCurrentForm] = useState<"login" | "register">(
    defaultForm
  );
  const { clearError } = useAuth();

  // This hook ensures the form always opens in the correct state
  useEffect(() => {
    if (isOpen) {
      setCurrentForm(defaultForm);
    }
  }, [isOpen, defaultForm]);

  // This function is called when the user clicks the "Sign up" or "Sign in" link
  const handleToggleForm = () => {
    clearError();
    setCurrentForm(currentForm === "login" ? "register" : "login");
  };

  // This function is called when the dialog's open state changes (e.g., user clicks the 'X' or outside)
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      clearError();
      onClose();
    }
  };

  return (
    // Use our new handler for the onOpenChange event
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {currentForm === "login" ? "Sign In" : "Create Account"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {currentForm === "login"
              ? "Enter your credentials to sign in to your account."
              : "Fill out the form to create a new account."}
          </DialogDescription>
        </DialogHeader>

        {currentForm === "login" ? (
          <LoginForm onToggleForm={handleToggleForm} onClose={onClose} />
        ) : (
          <RegisterForm onToggleForm={handleToggleForm} onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}
