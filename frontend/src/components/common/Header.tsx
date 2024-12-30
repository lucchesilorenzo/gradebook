import Logo from "./Logo";
import Navigation from "./Navigation";
import Profile from "./Profile";

export default function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 px-2 sm:px-12">
      <Logo />
      <Navigation />
      <Profile />
    </header>
  );
}
