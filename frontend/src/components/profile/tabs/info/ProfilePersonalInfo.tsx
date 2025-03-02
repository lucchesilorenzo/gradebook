import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/hooks/contexts/useUser";
import { capitalize } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar, IdCard, MapPin, User } from "lucide-react";

export default function ProfilePersonalInfo() {
  const { userSettings } = useUser();

  const formattedDateOfBirth = format(
    new Date(userSettings.date_of_birth),
    "dd/MM/yyyy",
  );
  const formattedGender = capitalize(userSettings.gender);

  return (
    <Card>
      <CardContent className="mb-2 grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Gender:</span>
          <span>{formattedGender}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Date of Birth:</span>
          <span>{formattedDateOfBirth}</span>
        </div>

        <div className="lg:flex lg:items-center lg:gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Address:</span>
          </div>
          <span>{userSettings.address}</span>
        </div>

        <div className="flex items-center gap-2">
          <IdCard className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Tax ID:</span>
          <span>{userSettings.tax_id}</span>
        </div>
      </CardContent>
    </Card>
  );
}
