import H1 from "@/components/common/H1";
import Loading from "@/components/common/Loading";
import NotificationList from "@/components/notifications/NotificationList";
// import NotificationPagination from "@/components/notifications/NotificationPagination";
import { useUserNotificationsForPagination } from "@/hooks/queries/users/useUserNotificationsForPagination";
import { useState } from "react";

export default function NotificationsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useUserNotificationsForPagination(page);

  if (!data) return null;

  // function handleNextPage() {
  //   if (notifications?.next_page_url) {
  //     setPage((prev) => prev + 1);
  //   }
  // }

  // function handlePrevPage() {
  //   if (notifications?.prev_page_url) {
  //     setPage((prev) => prev - 1);
  //   }
  // }

  return (
    <main>
      <H1>Notifications</H1>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto mt-6 space-y-6">
          <NotificationList notifications={data.notifications} />

          {/* <NotificationPagination
          page={notifications.current_page}
          lastPage={notifications.next_page_url}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
        /> */}
        </div>
      )}
    </main>
  );
}
