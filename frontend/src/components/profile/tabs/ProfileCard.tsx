import { Card, CardHeader, CardTitle } from "../../ui/card";
import ProfilePicture from "../ProfilePicture";
import ProfileUploadImageForm from "../ProfileUploadImageForm";

import { UserSettings } from "@/types/user-types";

type ProfileCardProps = {
  userSettings: UserSettings;
};

export default function ProfileCard({ userSettings }: ProfileCardProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:gap-20">
          <div className="flex items-center space-x-4">
            <ProfilePicture className="h-24 w-24" />
            <ProfileUploadImageForm />
          </div>

          <div>
            <CardTitle className="text-2xl">
              {userSettings.first_name} {userSettings.last_name}
            </CardTitle>
            <p className="text-muted-foreground">Teacher</p>
            <p className="text-muted-foreground">IT Department</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
