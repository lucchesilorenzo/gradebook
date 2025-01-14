import {
  taskFormSchema,
  TTaskFormSchema,
} from "@/lib/validations/task-validations";
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
import { Input } from "../../ui/input";
import { useCreateTask } from "@/hooks/mutations/tasks/useCreateTask";

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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Add a new task" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton type="submit" isLoading={form.formState.isSubmitting}>
            <Plus />
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
