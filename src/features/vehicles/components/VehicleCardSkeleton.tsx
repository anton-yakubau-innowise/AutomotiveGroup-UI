import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function VehicleCardSkeleton() {
  return (
    <Card className="border-0 shadow-sm">
      <div className="relative">
        <Skeleton className="aspect-[4/3] w-full rounded-t-lg" />
      </div>
      <CardContent className="p-4 space-y-3">
        <div>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-8 w-1/2" />
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
