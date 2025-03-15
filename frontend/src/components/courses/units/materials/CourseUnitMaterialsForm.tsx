import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseUnitMaterial } from "@/hooks/mutations/materials/useCreateCourseUnitMaterial";
import {
  TCourseUnitMaterialsFormSchema,
  courseUnitMaterialsFormSchema,
} from "@/validations/course-validations";

type CourseUnitMaterialsFormProps = {
  onFormSubmit: () => void;
};

export default function CourseUnitMaterialsForm({
  onFormSubmit,
}: CourseUnitMaterialsFormProps) {
  const { courseSlug, courseUnitSlug } = useParams();

  const { mutateAsync: createCourseUnitMaterial } =
    useCreateCourseUnitMaterial();

  const form = useForm({
    resolver: zodResolver(courseUnitMaterialsFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
      file: undefined,
      url: "",
    },
    shouldUnregister: true,
  });

  async function onSubmit(data: TCourseUnitMaterialsFormSchema) {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("type", data.type);
    if (data.file) formData.append("file", data.file);
    if (data.url) formData.append("url", data.url);

    await createCourseUnitMaterial({
      data: formData,
      courseSlug,
      courseUnitSlug,
    });

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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter material description" {...field} />
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
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="VIDEO">Video</SelectItem>
                  <SelectItem value="LINK">Link</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("type") === "PDF" && (
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload PDF</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) =>
                      field.onChange(e.target.files && e.target.files[0])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {(form.watch("type") === "VIDEO" || form.watch("type") === "LINK") && (
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
