import { updateData } from "@/lib/api-client";
import { TStudentEditFormSchema } from "@/lib/validations/student-validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type useUpdateAttendanceProps = {
  data: TStudentEditFormSchema;
  student_id: string;
  course_unit_id: string;
};

export function useUpdateAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      student_id,
      course_unit_id,
    }: useUpdateAttendanceProps) =>
      updateData(`/attendances/${student_id}/${course_unit_id}`, { data }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["attendances"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
