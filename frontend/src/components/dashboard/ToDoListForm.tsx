import {
  toDoListFormSchema,
  TToDoListFormSchema,
} from "@/lib/validations/to-do-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { LoadingButton } from "../common/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function ToDoListForm() {
  const form = useForm({
    resolver: zodResolver(toDoListFormSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(data: TToDoListFormSchema) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
