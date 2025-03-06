import React from "react";

import {
  CalendarClock,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LinkIcon,
  Video,
} from "lucide-react";

export const routes = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Courses", href: "/courses", icon: GraduationCap },
  { name: "Calendar", href: "/calendar", icon: CalendarClock },
];

export const courseUnitMaterialIcons = {
  PDF: React.createElement(FileText),
  VIDEO: React.createElement(Video),
  LINK: React.createElement(LinkIcon),
};
