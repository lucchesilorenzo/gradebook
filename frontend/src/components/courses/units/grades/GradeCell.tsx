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
} from "@/lib/validations/assignment-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type GradeCellProps = {
  grade: number | null;
  studentId: string;
};

export default function GradeCell({ grade, studentId }: GradeCellProps) {
  const form = useForm({
    resolver: zodResolver(gradeCellFormSchema),
    defaultValues: {
      grade: grade ?? 0,
    },
  });

  async function onSubmit(data: TAssignmentGradeFormSchema) {
    console.log(data, studentId);
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
