import { useState } from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateStudentDeskPosition } from "@/hooks/queries/courses/useUpdateStudentDeskPosition";
import { Student } from "@/types";
import {
  TDeskFormSchema,
  deskFormSchema,
} from "@/validations/canvas-validations";

type AddDeskFormProps = {
  students: Student[];
  courseSlug: string;
};

export default function AddDeskForm({
  students,
  courseSlug,
}: AddDeskFormProps) {
  const { mutateAsync: updateStudentDeskPosition } =
    useUpdateStudentDeskPosition(courseSlug);

  const [open, setOpen] = useState(false);

  const form = useForm<TDeskFormSchema>({
    resolver: zodResolver(deskFormSchema),
    defaultValues: {
      student_id: "",
      x: 5,
      y: 5,
    },
  });

  async function onSubmit(data: TDeskFormSchema) {
    await updateStudentDeskPosition(data);

    form.reset();
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
                name="student_id"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Student</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="max-w-[190px]">
                            <SelectValue placeholder="Student name" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-64">
                          {students
                            .filter((student) => !student.desk_position)
                            .map((student) => (
                              <SelectItem key={student.id} value={student.id}>
                                {student.first_name} {student.last_name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="x"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>X</FormLabel>
                      <FormControl>
                        <Input
                          className="max-w-[190px]"
                          placeholder="5"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="y"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Y</FormLabel>
                      <FormControl>
                        <Input
                          className="max-w-[190px]"
                          placeholder="5"
                          {...field}
                        />
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
