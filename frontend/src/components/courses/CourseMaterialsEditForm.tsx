import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateCourseMaterial } from "@/hooks/mutations/materials/useUpdateCourseMaterial";
import { CourseMaterial } from "@/lib/types";
import {
  courseMaterialsEditFormSchema,
  TCourseMaterialsEditFormSchema,
} from "@/lib/validations/course-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoadingButton } from "../common/LoadingButton";
import { Input } from "../ui/input";

type CourseMaterialsEditFormProps = {
  onFormSubmit: () => void;
  courseMaterial: CourseMaterial;
};

export default function CourseMaterialsEditForm({
  onFormSubmit,
  courseMaterial,
}: CourseMaterialsEditFormProps) {
  const { mutateAsync: updateCourseMaterial } = useUpdateCourseMaterial();
  const form = useForm({
    resolver: zodResolver(courseMaterialsEditFormSchema),
    defaultValues: {
      title: courseMaterial.title || "",
      description: courseMaterial.description || "",
      file: undefined,
      url: courseMaterial.url || "",
    },
    shouldUnregister: true,
  });

  async function onSubmit(data: TCourseMaterialsEditFormSchema) {
    if (courseMaterial.type === "PDF") {
      const formData = new FormData();

      if (data.title) formData.append("title", data.title);
      if (data.description) formData.append("description", data.description);
      if (data.file) formData.append("file", data.file);
      if (data.url) formData.append("url", data.url);

      await updateCourseMaterial({
        data: formData,
        courseMaterialId: courseMaterial.id,
      });
    } else {
      await updateCourseMaterial({ data, courseMaterialId: courseMaterial.id });
    }

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

        {courseMaterial.type === "PDF" && (
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

        {(courseMaterial.type === "LINK" ||
          courseMaterial.type === "VIDEO") && (
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
