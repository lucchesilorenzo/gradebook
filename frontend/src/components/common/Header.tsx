import { Bell } from "lucide-react";
import ProfileDropdownMenu from "../profile/ProfileDropdownMenu";
import { Button } from "../ui/button";
import { NotificationBadge } from "../ui/notification-badge";
import Logo from "./Logo";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="h-14 border-b border-gray-200 px-2 py-2 sm:px-12">
      <div className="flex items-center justify-between sm:hidden">
        <MobileNavigation />

        <div className="flex items-center gap-2">
          {/* TODO: Add a notification count */}
          <NotificationBadge label="0" variant="destructive">
            <Button type="button" variant="ghost" asChild>
              <Link to="/teacher/notifications">
                <Bell className="h-5 w-5" />
              </Link>
            </Button>
          </NotificationBadge>
          <ProfileDropdownMenu type="mobile" />
        </div>
      </div>

      <div className="hidden items-center justify-between sm:flex">
        <Logo />
        <Navigation />

        <div className="flex items-center gap-2">
          <NotificationBadge label="0" variant="destructive">
            <Button type="button" variant="ghost" asChild>
              <Link to="/teacher/notifications">
                <Bell className="h-5 w-5" />
              </Link>
            </Button>
          </NotificationBadge>
          <ProfileDropdownMenu type="desktop" />
        </div>
      </div>
    </header>
  );
}
