import { LoadingButton } from "@/components/common/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateAssignment } from "@/hooks/mutations/assignments/useCreateAssignment";
import {
  assignmentFormSchema,
  TAssignmentFormSchema,
} from "@/validations/assignment-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

type CourseUnitAssignmentFormProps = {
  onFormSubmit: () => void;
};

export default function CourseUnitAssignmentForm({
  onFormSubmit,
}: CourseUnitAssignmentFormProps) {
  const { courseSlug, courseUnitSlug } = useParams();
  const { mutateAsync: createAssignment } = useCreateAssignment({
    courseSlug,
    courseUnitSlug,
  });

  const form = useForm({
    resolver: zodResolver(assignmentFormSchema),
    defaultValues: {
      title: "",
      description: "",
      deadline: "",
    },
  });

  async function onSubmit(data: TAssignmentFormSchema) {
    await createAssignment(data);
    onFormSubmit();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Assignment title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Assignment description"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deadline</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="datetime-local"
                  placeholder="Assignment deadline"
                  className="w-fit"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton type="submit" isLoading={form.formState.isSubmitting}>
          Submit assignment
        </LoadingButton>
      </form>
    </Form>
  );
}
