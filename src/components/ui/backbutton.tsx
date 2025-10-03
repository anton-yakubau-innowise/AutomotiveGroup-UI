import { Link } from "react-router-dom";
import { Button } from "./button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  to?: string;
  className?: string;
  children?: React.ReactNode;
}

export function BackButton({
  to = "/",
  className,
  children = "Back to Catalog",
}: BackButtonProps) {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "flex items-center gap-2 transition-shadow hover:shadow-md",
        className
      )}
    >
      <Link to={to}>
        <ArrowLeft className="h-4 w-4" />
        {children}
      </Link>
    </Button>
  );
}
