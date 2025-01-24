import { cn } from "@/lib/utils";
import { Badge, BadgeProps } from "./badge";

export interface NotificationBadgeProps extends BadgeProps {
  label?: string | number;
  show?: boolean;
}

export const NotificationBadge = ({
  label,
  className,
  show,
  children,
  ...props
}: NotificationBadgeProps) => {
  const showBadge =
    typeof label !== "undefined" && (typeof show === "undefined" || show);
  return (
    <div className="relative inline-flex">
      {children}
      {showBadge && (
        <Badge
          className={cn(
            "absolute right-0 top-0 rounded-full",
            typeof label !== "undefined" && ("" + label).length === 0
              ? "-translate-y-1 translate-x-1 px-1.5 py-1.5"
              : "-translate-y-1.5 translate-x-1.5 px-2",
            className,
          )}
          {...props}
        >
          {"" + label}
        </Badge>
      )}
    </div>
  );
};
