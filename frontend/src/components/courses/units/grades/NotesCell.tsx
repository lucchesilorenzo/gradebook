import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUpdateAssignmentStudentRecord } from "@/hooks/mutations/assignments/updateAssignmentStudentRecord";
import {
  notesCellFormSchema,
  TAssignmentNotesFormSchema,
} from "@/lib/validations/assignment-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type NotesCellProps = {
  notes: string | null;
  assignmentId: string;
  studentId: string;
};

export default function NotesCell({
  notes,
  assignmentId,
  studentId,
}: NotesCellProps) {
  const { mutateAsync: updateStudentAssignmentRecord } =
    useUpdateAssignmentStudentRecord({
      assignmentId,
      studentId,
    });

  const form = useForm({
    resolver: zodResolver(notesCellFormSchema),
    defaultValues: {
      notes: notes ?? "",
    },
  });

  async function onSubmit(data: TAssignmentNotesFormSchema) {
    await updateStudentAssignmentRecord(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Add notes"
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
