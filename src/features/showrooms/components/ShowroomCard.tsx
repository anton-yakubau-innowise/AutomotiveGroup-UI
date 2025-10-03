import { Showroom } from "../types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock, Building2 } from "lucide-react";

interface ShowroomCardProps {
  showroom: Showroom;
}

export function ShowroomCard({ showroom }: ShowroomCardProps) {
  const getStatusBadge = (status: Showroom["status"]) => {
    switch (status) {
      case "Open":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white">
            Open
          </Badge>
        );
      case "Closed":
        return <Badge variant="secondary">Closed</Badge>;
      case "UnderRenovation":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            Under Renovation
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Building2 className="h-6 w-6 text-gray-700" />
            <span className="text-xl font-bold text-gray-900">
              {showroom.alias || "Automotive Showroom"}
            </span>
          </div>
          {getStatusBadge(showroom.status)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-gray-600">
        <div className="flex items-start gap-3">
          <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
          <span>
            {showroom.address}, {showroom.city}, {showroom.country}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4 flex-shrink-0" />
          <span>{showroom.phoneNumber}</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-4 w-4 flex-shrink-0" />
          <span>{showroom.operatingHours}</span>
        </div>
      </CardContent>
    </Card>
  );
}
