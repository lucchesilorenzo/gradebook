import { Textarea } from "@/components/ui/textarea";
import { useCreateTask } from "@/hooks/mutations/tasks/useCreateTask";
import {
  taskFormSchema,
  TTaskFormSchema,
} from "@/validations/task-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { LoadingButton } from "../../common/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";

export default function TaskForm() {
  const { mutateAsync: createTask } = useCreateTask();
  const form = useForm({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(data: TTaskFormSchema) {
    await createTask(data);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <div className="flex-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Add a new task"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <LoadingButton type="submit" isLoading={form.formState.isSubmitting}>
          <Plus />
        </LoadingButton>
      </form>
    </Form>
  );
}
