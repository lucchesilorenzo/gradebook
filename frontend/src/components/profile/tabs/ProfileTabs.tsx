import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import ProfileInfoTab from "./info/ProfileInfoTab";

export default function ProfileTabs() {
  return (
    <Tabs defaultValue="info">
      <TabsList className="mb-4">
        <TabsTrigger value="info">Info</TabsTrigger>
        <TabsTrigger value="edit">Edit Profile</TabsTrigger>
      </TabsList>

      <TabsContent value="info">
        <ProfileInfoTab />
      </TabsContent>

      <TabsContent value="edit">Edit</TabsContent>
    </Tabs>
  );
}
