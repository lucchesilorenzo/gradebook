import { Card, CardHeader, CardTitle } from "../../ui/card";
import ProfilePicture from "../ProfilePicture";

export default function ProfileCard() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <ProfilePicture className="h-24 w-24" />
          <div>
            <CardTitle className="text-2xl">John Doe</CardTitle>
            <p className="text-muted-foreground">Teacher</p>
            <p className="text-muted-foreground">Some other info</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
