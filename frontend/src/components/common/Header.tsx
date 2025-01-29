import ProfileDropdownMenu from "../profile/ProfileDropdownMenu";
import AppLogo from "./AppLogo";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import Notification from "./Notification";

export default function Header() {
  return (
    <header className="h-14 border-b border-gray-200 px-2 py-2 sm:px-12">
      <div className="flex items-center justify-between sm:hidden">
        <MobileNavigation />

        <div className="flex items-center gap-2">
          <Notification />
          <ProfileDropdownMenu type="mobile" />
        </div>
      </div>

      <div className="hidden items-center justify-between sm:flex">
        <AppLogo />
        <Navigation />

        <div className="flex items-center gap-2">
          <Notification />
          <ProfileDropdownMenu type="desktop" />
        </div>
      </div>
    </header>
  );
}
