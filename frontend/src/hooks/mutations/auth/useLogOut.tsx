import { postData } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postData("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
}
