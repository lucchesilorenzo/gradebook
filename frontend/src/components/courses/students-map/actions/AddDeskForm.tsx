import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoadingButton } from "@/components/common/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { deskFormSchema } from "@/validations/canvas-validations";
import { TDeskFormSchema } from "@/validations/canvas-validations";

export default function AddDeskForm() {
  const form = useForm<TDeskFormSchema>({
    resolver: zodResolver(deskFormSchema),
    defaultValues: {
      student_name: "",
    },
  });

  async function onSubmit(data: TDeskFormSchema) {
    console.log(data);
    form.reset();
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Add desk</Button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Add desk</h4>
            <p className="text-sm text-muted-foreground">
              Add a new desk to the map.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="student_name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-10">
                      <FormLabel>Student</FormLabel>
                      <FormControl>
                        <Input placeholder="Student name" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoadingButton
                type="submit"
                className="w-full"
                isLoading={form.formState.isSubmitting}
              >
                Confirm
              </LoadingButton>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
