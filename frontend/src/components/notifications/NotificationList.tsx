import NotificationCard from "./NotificationCard";

import { UserNotification } from "@/types";

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
