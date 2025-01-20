import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

export default function ProfileContacts() {
  return (
    <Card>
      <CardContent className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
        <div className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Email:</span>
          <span>jzDdD@example.com</span>
        </div>

        <div className="flex items-center space-x-2">
          <Phone className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Phone:</span>
          <span>+1 (123) 456-7890</span>
        </div>
      </CardContent>
    </Card>
  );
}
