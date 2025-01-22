import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileStatus() {
  return (
    <Card>
      <CardContent className="p-6">
        Status: <Badge className="ml-1">Active</Badge>
      </CardContent>
    </Card>
  );
}
