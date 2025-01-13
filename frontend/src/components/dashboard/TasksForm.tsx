import { TTask } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  taskFormSchema,
  TTaskFormSchema,
} from "@/lib/validations/task-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { LoadingButton } from "../common/LoadingButton";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type TasksFormProps = {
  tasks: TTask[];
};

export default function TasksForm({ tasks }: TasksFormProps) {
  const form = useForm({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(data: TTaskFormSchema) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ul className="space-y-2">
          {/* <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Use different settings for my mobile devices
                  </FormLabel>
                  <FormDescription>
                    You can manage your mobile notifications in the{" "}
                    <Link href="/examples/forms">mobile settings</Link> page.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          /> */}

          {tasks.map((task) => (
            <li key={task.id} className="flex items-center">
              <Checkbox checked={task.completed} onCheckedChange={() => {}} />
              <label
                htmlFor={`task-${task.id}`}
                className={cn(
                  "ml-2 text-sm",
                  task.completed && "text-muted-foreground line-through",
                )}
              >
                {task.title}
              </label>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={() => {}}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>

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
