import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import { Mail, Phone } from "lucide-react";

export default function ProfileContacts() {
  const { userSettings } = useUser();

  return (
    <Card>
      <CardContent className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
        <div className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Email:</span>
          <span>{userSettings.email}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Phone className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Phone:</span>
          <span>{userSettings.phone_number}</span>
        </div>
      </CardContent>
    </Card>
  );
}
