import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { useAuth } from "../contexts/AuthContext";
import {
  User as UserIcon,
  Settings,
  LogOut,
  Save,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { User } from "@/types/user";

// Step 1: Define a validation schema for the profile update form
const profileUpdateSchema = z.object({
  // Match the fields from your User type
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  phoneNumber: z.string().optional(), // Phone number is optional
});

type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;

export function UserProfile() {
  const { user, logout, updateProfile, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Step 2: Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset, // We'll use this to sync the form with the user data
    formState: { errors },
  } = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
  });

  // Step 3: Synchronize form state with user data from context
  // This ensures the form updates if the user object changes.
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user, reset]);

  // Step 4: Handle form submission with validated data
  const onSave = async (data: ProfileUpdateFormData) => {
    try {
      await updateProfile(data);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original user data
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber || "",
      });
    }
  };

  if (!user) return null; // No user, don't render anything

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <UserIcon className="h-5 w-5" />
          <CardTitle>My Profile</CardTitle>
        </div>
        <CardDescription>Manage your account information</CardDescription>
      </CardHeader>
      {/* Step 5: Use handleSubmit to wrap the onSave function */}
      <form onSubmit={handleSubmit(onSave)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              disabled
              className="bg-muted"
            />
          </div>

          {/* Step 6: Use separate fields for first and last name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...register("firstName")}
                disabled={!isEditing}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...register("lastName")}
                disabled={!isEditing}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              {...register("phoneNumber")}
              disabled={!isEditing}
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500 mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <Separator />

          <div className="text-sm text-muted-foreground">
            <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          {isEditing ? (
            <div className="flex w-full space-x-2">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="w-full"
            >
              <Settings className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}

          <Button
            onClick={logout}
            variant="destructive"
            className="w-full"
            disabled={isLoading}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
