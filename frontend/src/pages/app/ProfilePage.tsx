import { useEffect } from "react";

import ProfileCard from "@/components/profile/tabs/ProfileCard";
import ProfileTabs from "@/components/profile/tabs/ProfileTabs";
import { useUser } from "@/hooks/contexts/useUser";
import env from "@/lib/env";

export default function ProfilePage() {
  useEffect(() => {
    document.title = `Profile | ${env.VITE_APP_NAME}`;
  }, []);

  const { userSettings } = useUser();

  return (
    <main className="container mx-auto">
      <ProfileCard userSettings={userSettings} />
      <ProfileTabs />
    </main>
  );
}
