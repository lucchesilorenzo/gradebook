import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "../common/LoadingButton";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  courseMaterialsFormSchema,
  TCourseMaterialsFormData,
} from "@/lib/validations/course-validations";

type CourseMaterialsFormProps = {
  onFormSubmit: () => void;
};

export default function CourseMaterialsForm({
  onFormSubmit,
}: CourseMaterialsFormProps) {
  const form = useForm({
    resolver: zodResolver(courseMaterialsFormSchema),
    defaultValues: {
      title: "",
      type: "",
      file: "",
      url: "",
    },
  });

  async function onSubmit(data: TCourseMaterialsFormData) {
    console.log(data);
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
                <Input placeholder="Enter material title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select material type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("type") === "pdf" ? (
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload PDF</FormLabel>
                <FormControl>
                  <Input type="file" accept=".pdf" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/material"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <LoadingButton
          type="submit"
          className="w-full"
          isLoading={form.formState.isSubmitting}
        >
          Add Material
        </LoadingButton>
      </form>
    </Form>
  );
}
