import { Card, CardContent } from "@/components/ui/card";
import { Calendar, IdCard, MapPin, User } from "lucide-react";

export default function ProfilePersonalInfo() {
  return (
    <Card>
      <CardContent className="mb-2 grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
        <div className="flex items-center space-x-2">
          <User className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Gender:</span>
          <span>Male</span>
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Date of Birth</span>
          <span>12/12/1990</span>
        </div>

        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Address:</span>
          <span>123 Main St, Anytown USA</span>
        </div>

        <div className="flex items-center space-x-2">
          <IdCard className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Tax ID:</span>
          <span>123456789</span>
        </div>
      </CardContent>
    </Card>
  );
}
