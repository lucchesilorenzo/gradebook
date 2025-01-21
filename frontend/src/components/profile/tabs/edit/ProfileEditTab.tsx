import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileEditForm from "./ProfileEditForm";

export default function ProfileEditTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md font-bold sm:text-xl">
          Edit Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ProfileEditForm />
      </CardContent>
    </Card>
  );
}
