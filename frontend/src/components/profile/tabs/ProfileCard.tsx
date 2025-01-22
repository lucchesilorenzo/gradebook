import { UserSettings } from "@/lib/types/user-types";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import ProfileUploadImageForm from "../ProfileUploadImageForm";
import ProfilePicture from "../ProfilePicture";

type ProfileCardProps = {
  userSettings: UserSettings;
};

export default function ProfileCard({ userSettings }: ProfileCardProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div>
            <ProfilePicture />
            <ProfileUploadImageForm />
          </div>
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
