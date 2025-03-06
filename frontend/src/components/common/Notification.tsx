import { useEffect } from "react";

import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { NotificationBadge } from "../ui/notification-badge";

import { useUser } from "@/hooks/contexts/useUser";
import env from "@/lib/env";

export default function Notification() {
  useEffect(() => {
    document.title = `Notifications | ${env.VITE_APP_NAME}`;
  }, []);

  const { notifications } = useUser();

  return (
    <NotificationBadge label={notifications || undefined} variant="destructive">
      <Button type="button" variant="ghost" asChild>
        <Link to="/teacher/notifications">
          <Bell className="h-5 w-5" />
        </Link>
      </Button>
    </NotificationBadge>
  );
}
