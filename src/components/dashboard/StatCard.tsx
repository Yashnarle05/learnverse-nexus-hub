
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
}

const StatCard = ({ title, value, icon, description }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lms-primary/10">
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
