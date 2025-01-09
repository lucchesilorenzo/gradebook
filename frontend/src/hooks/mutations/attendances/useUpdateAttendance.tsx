import { updateData } from "@/lib/api-client";
import { TAttendanceEditFormSchema } from "@/lib/validations/attendance-validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type useUpdateAttendanceProps = {
  data: TAttendanceEditFormSchema;
  student_id: string;
  course_id: string;
  course_unit_id: string;
};

export function useUpdateAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      student_id,
      course_id,
      course_unit_id,
    }: useUpdateAttendanceProps) =>
      updateData(
        `/attendances/${course_id}/${course_unit_id}/${student_id}`,
        data,
      ),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["attendances"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
