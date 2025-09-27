import { useState, useEffect } from "react";
import { useInquiries, CarInquiry } from "../hooks/useInquiries";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { MessageSquare, Phone, Mail, Calendar, Car } from "lucide-react";

export function InquiriesPanel() {
  const { getInquiries } = useInquiries();
  const [inquiries, setInquiries] = useState<CarInquiry[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setInquiries(getInquiries());
    }
  }, [isOpen, getInquiries]);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: CarInquiry['status']) => {
    const variants = {
      new: { variant: "default" as const, label: "New" },
      contacted: { variant: "secondary" as const, label: "Contacted" },
      closed: { variant: "outline" as const, label: "Closed" }
    };
    
    const config = variants[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="fixed bottom-4 right-4 z-50">
          <MessageSquare className="h-4 w-4 mr-2" />
          Inquiries ({inquiries.length})
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Customer Inquiries</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {inquiries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No inquiries yet</p>
            </div>
          ) : (
            inquiries.map((inquiry) => (
              <Card key={inquiry.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">
                      {inquiry.carBrand} {inquiry.carModel}
                    </CardTitle>
                    {getStatusBadge(inquiry.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{inquiry.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <a href={`tel:${inquiry.phone}`} className="text-blue-600 hover:underline">
                        {inquiry.phone}
                      </a>
                    </div>
                    {inquiry.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">
                          {inquiry.email}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(inquiry.timestamp)}</span>
                    </div>
                  </div>
                  
                  {inquiry.message && (
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-700">{inquiry.message}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}