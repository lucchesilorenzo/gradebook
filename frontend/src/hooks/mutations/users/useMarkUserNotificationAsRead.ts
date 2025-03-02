import { updateData } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useMarkUserNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      updateData(`/users/notifications/${notificationId}/read`),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user-notifications"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
