import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Showroom } from "../types";
import { getShowrooms } from "../api";
import { ShowroomCard } from "./ShowroomCard";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/backbutton";

export function ShowroomList() {
  const [showrooms, setShowrooms] = useState<Showroom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShowrooms = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getShowrooms();
        setShowrooms(data);
      } catch (err) {
        console.error("Failed to fetch showrooms:", err);
        setError("Could not load showroom data. Please try again later.");
        toast.error("Failed to load showroom list.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowrooms();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-[180px] w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <BackButton className="mt-4" />
      </div>
    );
  }

  return (
    <section id="showrooms" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute left-0">
            <BackButton />
          </div>
          <h2 className="text-3xl font-bold">Our Showrooms</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showrooms.map((showroom) => (
            <ShowroomCard key={showroom.id} showroom={showroom} />
          ))}
        </div>
      </div>
    </section>
  );
}
