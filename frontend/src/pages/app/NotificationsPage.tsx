import { useEffect, useState } from "react";

import H1 from "@/components/common/H1";
import Loading from "@/components/common/Loading";
import NotificationList from "@/components/notifications/NotificationList";
import NotificationPagination from "@/components/notifications/NotificationPagination";
import { useGetUserNotificationsForPagination } from "@/hooks/queries/users/useGetUserNotificationsForPagination";
import env from "@/lib/env";

export default function NotificationsPage() {
  useEffect(() => {
    document.title = `Notifications | ${env.VITE_APP_NAME}`;
  }, []);

  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetUserNotificationsForPagination(page);

  if (!data) return null;

  return (
    <main>
      <H1>Notifications</H1>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto mt-6 space-y-6">
          <NotificationList notifications={data.notifications.data} />

          {data.notifications.data.length > 0 && (
            <NotificationPagination
              page={data.notifications.current_page}
              lastPage={data.notifications.next_page_url}
              totalPages={data.notifications.last_page}
              setPage={setPage}
            />
          )}
        </div>
      )}
    </main>
  );
}
