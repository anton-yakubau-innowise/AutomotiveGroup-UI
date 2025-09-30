import { useState } from "react";
import { Car } from "../types/car";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  ArrowLeft,
  Calendar,
  Fuel,
  Gauge,
  Settings,
  MapPin,
  Heart,
  Phone,
  Mail,
  MessageCircle,
  Check,
  Star,
} from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useInquiries } from "../hooks/useInquiries";
import { toast } from "sonner@2.0.3";

interface CarDetailsProps {
  car: Car;
  onBack: () => void;
  onToggleFavorite?: (carId: string) => void;
  isFavorite?: boolean;
}

export function CarDetails({
  car,
  onBack,
  onToggleFavorite,
  isFavorite,
}: CarDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const { submitInquiry, isSubmitting } = useInquiries();

  const formatPrice = (price: number) => {
    return "$" + new Intl.NumberFormat("en-US").format(price);
  };

  const formatMileage = (mileage: number) => {
    if (mileage === 0) return "New car";
    return new Intl.NumberFormat("en-US").format(mileage) + " mi";
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();

    const inquiry = {
      carId: car.id,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message:
        formData.message ||
        `Interested in ${car.brand} ${car.model} ${car.year}`,
    };

    const result = await submitInquiry(inquiry);

    if (result.success) {
      toast.success("Inquiry submitted!", {
        description: "We will contact you soon.",
      });
      setShowContactForm(false);
      setFormData({ name: "", phone: "", email: "", message: "" });
    } else {
      toast.error("Failed to submit inquiry", {
        description: "Please try again or contact us by phone.",
      });
    }
  };

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

          {onToggleFavorite && (
            <Button
              variant={isFavorite ? "default" : "outline"}
              onClick={() => onToggleFavorite(car.id)}
              className="ml-4"
            >
              <Heart
                className={`h-4 w-4 ${
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
          {/* Left Column - Images and Gallery */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-white shadow-sm">
              <ImageWithFallback
                src={car.images[selectedImage] || car.images[0]}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image Thumbnails */}
            {car.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${car.brand} ${car.model} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {car.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Car Info and Actions */}
          <div className="space-y-6">
            {/* Car Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {car.brand} {car.model}
                    </h1>
                    <div className="text-3xl font-bold text-blue-600 mt-2">
                      {formatPrice(car.price)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {car.isNew && (
                      <Badge className="bg-green-500 hover:bg-green-600 text-white">
                        New
                      </Badge>
                    )}
                    {car.isReserved && (
                      <Badge variant="secondary">Reserved</Badge>
                    )}
                  </div>
                </div>

                {/* Key Specs */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{car.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-gray-400" />
                      <span>{formatMileage(car.mileage)}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-gray-400" />
                      <span>{car.fuelType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-gray-400" />
                      <span>{car.transmission}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t space-y-2">
                  <div>
                    <strong>Body Type:</strong> {car.bodyType}
                  </div>
                  <div>
                    <strong>Color:</strong> {car.color}
                  </div>
                  <div>
                    <strong>Engine:</strong> {car.engineVolume}L, {car.power} HP
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Showroom Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-semibold">{car.showroomName}</div>
                    <div className="text-sm text-gray-600">
                      Showroom rating: 4.9/5
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Actions */}
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
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="I'm interested in this car..."
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
