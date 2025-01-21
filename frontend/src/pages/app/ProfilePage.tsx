import ProfileCard from "@/components/profile/tabs/ProfileCard";
import ProfileTabs from "@/components/profile/tabs/ProfileTabs";
import { useUser } from "@/hooks/useUser";
import env from "@/lib/env";
import { useEffect } from "react";

export default function ProfilePage() {
  const { userSettings } = useUser();

  useEffect(() => {
    document.title = `Profile | ${env.VITE_APP_NAME}`;
  }, []);

  return (
    <main className="container mx-auto">
      <ProfileCard userSettings={userSettings} />
      <ProfileTabs />
    </main>
  );
}
