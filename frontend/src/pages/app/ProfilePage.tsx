import ProfileCard from "@/components/profile/tabs/ProfileCard";
import ProfileTabs from "@/components/profile/tabs/ProfileTabs";
import env from "@/lib/env";
import { useEffect } from "react";

export default function ProfilePage() {
  useEffect(() => {
    document.title = `Profile | ${env.VITE_APP_NAME}`;
  }, []);

  return (
    <main className="container mx-auto">
      <ProfileCard />
      <ProfileTabs />
    </main>
  );
}
