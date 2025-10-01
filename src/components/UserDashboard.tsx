import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../hooks/useFavorites";
import { useInquiries, VehicleInquiry } from "../hooks/useInquiries";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  User,
  Heart,
  MessageSquare,
  Car,
  Phone,
  Mail,
  Calendar,
  Settings,
  ArrowLeft,
} from "lucide-react";
import { Vehicle as VehicleType } from "@/features/vehicles/types";
import { mockCars } from "../data/mockCars";

interface UserDashboardProps {
  onBack: () => void;
  onViewCarDetails?: (car: VehicleType) => void;
}

export function UserDashboard({
  onBack,
  onViewCarDetails,
}: UserDashboardProps) {
  const { user } = useAuth();
  const { favorites, isFavorite } = useFavorites();
  const { getInquiries } = useInquiries();
  const [inquiries, setInquiries] = useState<VehicleInquiry[]>([]);

  useEffect(() => {
    setInquiries(getInquiries());
  }, [getInquiries]);

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: VehicleInquiry["status"]) => {
    const variants = {
      new: { variant: "default" as const, label: "New" },
      contacted: { variant: "secondary" as const, label: "Contacted" },
      closed: { variant: "outline" as const, label: "Closed" },
    };

    const config = variants[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const favoriteCars = mockCars.filter((car) => isFavorite(car.id));

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Catalog
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {getUserInitials(user.firstName + " " + user.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {user.firstName + " " + user.lastName}
              </h1>
              <p className="text-gray-600">{user.email}</p>
              {user.phoneNumber && (
                <p className="text-gray-600">{user.phoneNumber}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Member since {formatDate(user.createdAt)}
              </p>
            </div>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Favorite Cars
                  </CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {favoriteCars.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Cars in your favorites
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Inquiries
                  </CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {inquiries.filter((i) => i.status !== "closed").length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Pending responses
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Inquiries
                  </CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inquiries.length}</div>
                  <p className="text-xs text-muted-foreground">
                    All time inquiries
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest interactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {inquiries.slice(0, 3).map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="flex items-center justify-between border-b pb-2 last:border-b-0"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        Inquiry for {inquiry.vehicleBrand}{" "}
                        {inquiry.vehicleModel}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(inquiry.timestamp)}
                      </p>
                    </div>
                    {getStatusBadge(inquiry.status)}
                  </div>
                ))}
                {inquiries.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    No recent activity
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            {favoriteCars.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteCars.map((car) => (
                  <Card
                    key={car.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                      <img
                        src={car.images[0]}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg">
                        {car.brand} {car.model}
                      </h3>
                      <p className="text-2xl font-bold text-blue-600">
                        ${new Intl.NumberFormat("en-US").format(car.price)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {car.year} •{" "}
                        {car.mileage === 0
                          ? "New"
                          : `${car.mileage.toLocaleString()} mi`}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => onViewCarDetails?.(car)}
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">
                    No favorite cars yet
                  </h3>
                  <p className="text-muted-foreground">
                    Start browsing our catalog and add cars to your favorites
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries" className="space-y-6">
            {inquiries.length > 0 ? (
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <Card key={inquiry.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {inquiry.vehicleBrand} {inquiry.vehicleModel}
                        </CardTitle>
                        {getStatusBadge(inquiry.status)}
                      </div>
                      <CardDescription>
                        Submitted on {formatDate(inquiry.timestamp)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{inquiry.phone}</span>
                        </div>
                        {inquiry.email && (
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{inquiry.email}</span>
                          </div>
                        )}
                        {inquiry.message && (
                          <div className="pt-2 border-t">
                            <p className="text-sm text-muted-foreground">
                              Message:
                            </p>
                            <p className="text-sm">{inquiry.message}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No inquiries yet</h3>
                  <p className="text-muted-foreground">
                    Your car inquiries will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your account information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <p className="text-sm text-muted-foreground">
                      {user.firstName + " " + user.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  {user.phoneNumber && (
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <p className="text-sm text-muted-foreground">
                        {user.phoneNumber}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium">Member Since</label>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
