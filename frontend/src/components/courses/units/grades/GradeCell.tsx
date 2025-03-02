import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  gradeCellFormSchema,
  TAssignmentGradeFormSchema,
} from "@/validations/assignment-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUpdateAssignmentStudentRecord } from "@/hooks/mutations/assignments/useUpdateAssignmentStudentRecord";

type GradeCellProps = {
  grade: number | null;
  assignmentId: string;
  studentId: string;
};

export default function GradeCell({
  grade,
  assignmentId,
  studentId,
}: GradeCellProps) {
  const { mutateAsync: updateStudentAssignmentRecord } =
    useUpdateAssignmentStudentRecord({
      assignmentId,
      studentId,
    });

  const form = useForm({
    resolver: zodResolver(gradeCellFormSchema),
    defaultValues: {
      grade: grade ?? 0,
    },
  });

  async function onSubmit(data: TAssignmentGradeFormSchema) {
    await updateStudentAssignmentRecord(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Insert grade"
                        onBlur={form.handleSubmit(onSubmit)}
                      />
                    </FormControl>
                  </TooltipTrigger>
                  <TooltipContent>
                    <FormMessage />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
