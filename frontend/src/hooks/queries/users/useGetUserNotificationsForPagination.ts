import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { UserNotificationWithCount } from "@/types";

export function useGetUserNotificationsForPagination(page: number) {
  return useQuery({
    queryKey: ["user-notifications", page],
    queryFn: (): Promise<UserNotificationWithCount> =>
      fetchData(`/users/notifications?page=${page}`),
  });
}
