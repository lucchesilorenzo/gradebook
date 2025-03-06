import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { postData } from "@/lib/api-client";
import { TLogInFormSchema } from "@/validations/auth-validations";

export function useLogIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: TLogInFormSchema) => postData("/auth/login", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
