import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultForm?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, defaultForm = 'login' }: AuthModalProps) {
  const [currentForm, setCurrentForm] = useState<'login' | 'register'>(defaultForm);

  const handleToggleForm = () => {
    setCurrentForm(currentForm === 'login' ? 'register' : 'login');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="sr-only">
          {currentForm === 'login' ? 'Sign In' : 'Create Account'}
        </DialogTitle>
        {currentForm === 'login' ? (
          <LoginForm onToggleForm={handleToggleForm} onClose={onClose} />
        ) : (
          <RegisterForm onToggleForm={handleToggleForm} onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}