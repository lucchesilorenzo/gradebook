import { postData } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useLogOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => postData("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      localStorage.removeItem("token");
      navigate("/auth/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
