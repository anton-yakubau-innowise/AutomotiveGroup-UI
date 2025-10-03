import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Search,
  Phone,
  Menu,
  Settings,
  LogOut,
  Heart,
  FileText,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "@/features/users/components/AuthModal";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { UserProfile } from "./UserProfile";

export function Header() {
  // --- State Management ---
  // This component manages its own modal states, which is a valid approach.
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [authForm, setAuthForm] = useState<"login" | "register">("login");

  // --- Event Handlers ---
  const handleAuthClick = (form: "login" | "register") => {
    setAuthForm(form);
    setShowAuthModal(true);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    handler?: () => void
  ) => {
    e.preventDefault();
    handler?.();
  };

  const handleShowDashboard = () => {
    navigate("/dashboard");
  };

  // The logout function from our new AuthContext is synchronous,
  // so async/await is not needed here.
  const handleLogout = () => {
    logout();
  };

  // --- Helper Functions ---
  const getUserInitials = (firstName?: string, lastName?: string) => {
    if (!firstName || !lastName) return "??";
    return firstName[0].toUpperCase() + lastName[0].toUpperCase();
  };

  const getFullName = (firstName?: string, lastName?: string) => {
    return `${firstName || ""} ${lastName || ""}`.trim() || user?.email;
  };

  return (
    <>
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                <Link to="/">Automotive Group</Link>
              </h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Catalog
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                About
              </Link>
              <Link
                to="/services"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Services
              </Link>
              <Link
                to="/showrooms"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Showrooms
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Search
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                +48 (800) 123-45-67
              </Button>

              {/* --- Conditional Rendering based on Auth State --- */}
              {user ? (
                // If user exists, show the profile dropdown
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {getUserInitials(user.firstName, user.lastName)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">
                          {getFullName(user.firstName, user.lastName)}
                        </p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleShowDashboard}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowProfileModal(true)}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Profile Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Heart className="mr-2 h-4 w-4" />
                      <span>My Favorites</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>My Inquiries</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                // If no user, show Sign In / Sign Up buttons
                <div className="hidden sm:flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => handleAuthClick("login")}
                  >
                    Sign In
                  </Button>
                  <Button onClick={() => handleAuthClick("register")}>
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultForm={authForm}
      />

      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="sr-only">User Profile</DialogTitle>
          <UserProfile />
        </DialogContent>
      </Dialog>
    </>
  );
}
