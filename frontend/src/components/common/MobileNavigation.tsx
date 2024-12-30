import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { routes } from "@/lib/data";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function MobileNavigation() {
  const [isSheetOpen, setIsSheetOpen] = useState(true);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-zinc-100">
        <SheetHeader>
          <SheetTitle>
            <Logo onOpenChange={() => setIsSheetOpen(false)} />
          </SheetTitle>
          <VisuallyHidden>
            <SheetDescription>Navigation menu</SheetDescription>
          </VisuallyHidden>
        </SheetHeader>
        <nav className="mt-4">
          <ul className="grid text-lg font-medium">
            {routes.map((route) => (
              <li key={route.name}>
                <SheetClose asChild>
                  <Link
                    to={route.href}
                    className="mx-[-0.65rem] flex items-center gap-4 px-3 py-2"
                  >
                    <route.icon className="h-5 w-5" />
                    {route.name}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
