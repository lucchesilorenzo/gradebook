import { fetchData } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export function useUserNotifications() {
  return useQuery({
    queryKey: ["user-notifications"],
    queryFn: (): Promise<number> => fetchData("/users/notifications"),
  });
}
