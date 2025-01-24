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

export default function NotificationCard() {
  const isRead = false;

  return (
    <Card className={isRead ? "bg-background" : "bg-muted"}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Lesson X is starting in 5 minutes
        </CardTitle>
        <Badge variant="outline">Schedule</Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-4">
          <div className="mt-0.5">
            <Bell className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-grow">
            <CardDescription className="text-sm">To be defined</CardDescription>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">One day ago</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {!isRead && <DropdownMenuItem>Mark as read</DropdownMenuItem>}
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
