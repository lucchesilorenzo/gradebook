import { fetchData } from "@/lib/api-client";
import { UserNotificationWithCount } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useUserNotificationsForPagination(page: number) {
  return useQuery({
    queryKey: ["user-notifications", page],
    queryFn: (): Promise<UserNotificationWithCount> =>
      fetchData(`/users/notifications?page=${page}`),
  });
}
