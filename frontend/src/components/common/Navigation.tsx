import { Link, useLocation } from "react-router-dom";

import { routes } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const { pathname } = useLocation();

  return (
    <nav>
      <ul className="flex items-center gap-4">
        {routes.map((route) => (
          <li key={route.href}>
            <Link
              to={route.href}
              className={cn(
                "hover:underline",
                route.href === pathname && "underline",
              )}
            >
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
