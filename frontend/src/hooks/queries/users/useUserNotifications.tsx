import { fetchData } from "@/lib/api-client";
import { UserNotificationWithCount } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useUserNotifications() {
  return useQuery({
    queryKey: ["user-notifications"],
    queryFn: (): Promise<UserNotificationWithCount> =>
      fetchData("/users/notifications"),
  });
}
