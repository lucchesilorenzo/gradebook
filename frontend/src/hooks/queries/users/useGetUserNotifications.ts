import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { UserNotificationWithCount } from "@/types";

export function useGetUserNotifications() {
  return useQuery({
    queryKey: ["user-notifications"],
    queryFn: (): Promise<UserNotificationWithCount> =>
      fetchData("/users/notifications"),
  });
}
