import ProfileDropdownMenu from "../profile/ProfileDropdownMenu";
import Logo from "./Logo";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="h-14 border-b border-gray-200 px-2 py-2 sm:px-12">
      <div className="flex items-center justify-between sm:hidden">
        <MobileNavigation />
        <ProfileDropdownMenu type="mobile" />
      </div>

      <div className="hidden items-center justify-between sm:flex">
        <Logo />
        <Navigation />
        <ProfileDropdownMenu type="desktop" />
      </div>
    </header>
  );
}
