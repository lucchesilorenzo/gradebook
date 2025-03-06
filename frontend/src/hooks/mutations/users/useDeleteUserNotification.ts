import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteData } from "@/lib/api-client";

export function useDeleteUserNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      deleteData(`/users/notifications/${notificationId}`),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user-notifications"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
