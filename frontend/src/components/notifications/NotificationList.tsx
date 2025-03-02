import { UserNotification } from "@/types";
import NotificationCard from "./NotificationCard";

type NotificationListProps = {
  notifications: UserNotification[];
};

export default function NotificationList({
  notifications,
}: NotificationListProps) {
  return (
    <>
      {!notifications.length ? (
        <p className="text-center text-muted-foreground">
          No notifications found.
        </p>
      ) : (
        <>
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}
        </>
      )}
    </>
  );
}
