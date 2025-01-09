import { updateData } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type useUpdateEndTimeProps = {
  end_time: string;
  course_slug: string;
  course_unit_slug: string;
};

export function useUpdateEndTime() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      end_time,
      course_slug,
      course_unit_slug,
    }: useUpdateEndTimeProps) =>
      updateData(`/attendances/${course_slug}/${course_unit_slug}/end-time`, {
        end_time,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["attendances"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
