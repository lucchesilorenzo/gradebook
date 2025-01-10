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

export const courseMaterialIcons = {
  pdf: FileText,
  video: Video,
  link: LinkIcon,
};
