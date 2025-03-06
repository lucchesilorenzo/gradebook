import ProfileEditForm from "./ProfileEditForm";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfileEditTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold sm:text-xl">Edit Information</CardTitle>
      </CardHeader>
      <CardContent>
        <ProfileEditForm />
      </CardContent>
    </Card>
  );
}
