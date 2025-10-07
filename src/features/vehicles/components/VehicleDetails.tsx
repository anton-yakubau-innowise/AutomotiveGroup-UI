import { useState, useMemo } from "react";
import { Vehicle } from "@/features/vehicles/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import {
  ArrowLeft,
  Calendar,
  Fuel,
  Gauge,
  Settings,
  Heart,
  Phone,
  MessageCircle,
  Check,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { BackButton } from "@/components/ui/backbutton"; // 1. Возвращаем BackButton
import { useInquiries } from "@/features/sales/hooks/useInquiries"; // 2. Указываем правильный путь к хуку

interface VehicleDetailsProps {
  vehicle: Vehicle;
  onToggleFavorite?: (vehicleId: string) => void;
  isFavorite?: boolean;
}

export function VehicleDetails({
  vehicle,
  onToggleFavorite,
  isFavorite,
}: VehicleDetailsProps) {
  const initialPhotoIndex = useMemo(() => {
    if (!vehicle.photos || vehicle.photos.length === 0) return 0;
    const primaryIndex = vehicle.photos.findIndex((p) => p.isPrimary);
    return primaryIndex !== -1 ? primaryIndex : 0;
  }, [vehicle.photos]);

  const [selectedImageIndex, setSelectedImageIndex] =
    useState(initialPhotoIndex);

  const selectedPhoto =
    vehicle.photos?.[selectedImageIndex] || vehicle.photos?.[0];

  const [showContactForm, setShowContactForm] = useState(false);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user ? `${user.firstName} ${user.lastName}` : "",
    phone: user?.phoneNumber || "",
    email: user?.email || "",
    message: "",
  });

  const { submitInquiry, isSubmitting } = useInquiries();

  // --- Вся логика ниже остается такой же, как в вашем оригинале ---
  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatMileage = (mileage: number) => {
    if (mileage === 0) return "New car";
    return new Intl.NumberFormat("en-US").format(mileage) + " km";
  };

  const getStatusBadge = () => {
    if (vehicle.status === "Available" && vehicle.mileage === 0) {
      return (
        <Badge className="bg-green-500 hover:bg-green-600 text-white">
          New
        </Badge>
      );
    }
    switch (vehicle.status) {
      case "Available":
        return null;
      case "Reserved":
        return <Badge variant="secondary">Reserved</Badge>;
      case "Sold":
        return <Badge variant="destructive">Sold</Badge>;
      default:
        return null;
    }
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in", {
        description: "You must be logged in to send an inquiry.",
      });
      return;
    }

    const payload = {
      customerId: user.id,
      vehicleId: vehicle.id,
    };

    const result = await submitInquiry(payload);

    if (result.success) {
      toast.success("Inquiry submitted!", {
        description: "Our manager will contact you using your profile details.",
      });
      setShowContactForm(false);
      setFormData((prev) => ({ ...prev, message: "" }));
    } else {
      toast.error("Failed to submit inquiry", {
        description: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <BackButton />
          {onToggleFavorite && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleFavorite(vehicle.id)}
            >
              <Heart
                className={`h-4 w-4 mr-2 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
              {isFavorite ? "In Favorites" : "Add to Favorites"}
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-white shadow-sm">
              <ImageWithFallback
                src={selectedPhoto?.photoUrl}
                alt={`${vehicle.manufacturer} ${vehicle.model} ${vehicle.package}`}
                className="w-full h-full object-cover"
              />
            </div>

            {vehicle.photos && vehicle.photos.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {vehicle.photos.map((photo, index) => (
                  <button
                    key={photo.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? "border-blue-500"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <ImageWithFallback
                      src={photo.photoUrl}
                      alt={`${vehicle.manufacturer} ${vehicle.model} ${
                        vehicle.package
                      } ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {vehicle.description}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {vehicle.manufacturer} {vehicle.model} {vehicle.package}
                    </h1>
                    <div className="text-3xl font-bold text-blue-600 mt-2">
                      {formatPrice(
                        vehicle.basePriceAmount,
                        vehicle.basePriceCurrency
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">{getStatusBadge()}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{vehicle.year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Gauge className="h-4 w-4 text-gray-400" />
                      <span>{formatMileage(vehicle.mileage)}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Fuel className="h-4 w-4 text-gray-400" />
                      <span>{vehicle.engineType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Settings className="h-4 w-4 text-gray-400" />
                      <span>{vehicle.transmissionType}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2 text-sm text-gray-700">
                  <div>
                    <strong>Body Type:</strong> {vehicle.bodyType}
                  </div>
                  <div>
                    <strong>Color:</strong> {vehicle.color}
                  </div>
                  <div>
                    <strong>Engine:</strong> {vehicle.engineVolume}cm³,{" "}
                    {vehicle.power} HP
                  </div>
                </div>
              </CardContent>
            </Card>

            {!showContactForm ? (
              <Card>
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full"
                    onClick={() => setShowContactForm(true)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Inquiry
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    +48 (800) 123-45-67
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Send Inquiry</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitInquiry} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        readOnly
                        className="bg-gray-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        readOnly
                        className="bg-gray-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        readOnly
                        className="bg-gray-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Optional message to the seller..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1"
                      >
                        {isSubmitting ? "Sending..." : "Send Inquiry"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowContactForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
