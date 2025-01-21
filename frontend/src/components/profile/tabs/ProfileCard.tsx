import { UserSettings } from "@/lib/types/user-types";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import ProfilePicture from "../ProfilePicture";

type ProfileCardProps = {
  userSettings: UserSettings;
};

export default function ProfileCard({ userSettings }: ProfileCardProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <ProfilePicture className="h-24 w-24" />
          <div>
            <CardTitle className="text-2xl">
              {userSettings.first_name} {userSettings.last_name}
            </CardTitle>
            <p className="text-muted-foreground">Teacher</p>
            <p className="text-muted-foreground">Some other info</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
