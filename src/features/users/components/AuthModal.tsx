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

  useEffect(() => {
    if (isOpen) {
      setCurrentForm(defaultForm);
    }
  }, [isOpen, defaultForm]);

  const handleToggleForm = () => {
    clearError();
    setCurrentForm(currentForm === "login" ? "register" : "login");
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      clearError();
      onClose();
    }
  };

  return (
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
