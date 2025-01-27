import { UserNotification } from "@/lib/types";
import { format, formatDistanceToNow } from "date-fns";
import { Bell, MoreHorizontal } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type NotificationCardProps = {
  notification: UserNotification;
};

export default function NotificationCard({
  notification,
}: NotificationCardProps) {
  const date = format(
    new Date(notification.data.start_datetime),
    "dd/MM/yyyy 'at' HH:mm",
  );

  return (
    <Card className={notification.read_at ? "bg-background" : "bg-muted"}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Lesson "{notification.data.course_unit}" is starting in 10 minutes
        </CardTitle>
        <Badge variant="outline">Schedule</Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-4">
          <div className="mt-0.5">
            <Bell className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-grow">
            <CardDescription className="text-sm">
              It is reminded that on{" "}
              <span className="font-semibold">{date}</span> the lesson{" "}
              <span className="font-semibold">
                "{notification.data.course_unit}"
              </span>{" "}
              of the course{" "}
              <span className="font-semibold">{notification.data.course}</span>{" "}
              will begin.
            </CardDescription>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(notification.created_at, {
            addSuffix: true,
          })}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {!notification.read_at && (
              <DropdownMenuItem>Mark as read</DropdownMenuItem>
            )}
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
