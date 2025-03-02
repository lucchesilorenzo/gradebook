import { updateData } from "@/lib/api-client";
import { TProfileFormSchema } from "@/validations/profile-validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateUserSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userSettings: TProfileFormSchema) =>
      updateData("/users/settings", userSettings),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user-settings"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
