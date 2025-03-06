import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoadingButton } from "../../../common/LoadingButton";
import { Input } from "../../../ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateCourseUnitMaterial } from "@/hooks/mutations/materials/useUpdateCourseUnitMaterial";
import { CourseUnitMaterial } from "@/types";
import {
  TCourseUnitMaterialsEditFormSchema,
  courseUnitMaterialsEditFormSchema,
} from "@/validations/course-validations";

type CourseUnitMaterialsEditFormProps = {
  onFormSubmit: () => void;
  courseUnitMaterial: CourseUnitMaterial;
};

export default function CourseUnitMaterialsEditForm({
  onFormSubmit,
  courseUnitMaterial,
}: CourseUnitMaterialsEditFormProps) {
  const { mutateAsync: updateCourseUnitMaterial } = useUpdateCourseUnitMaterial(
    courseUnitMaterial.type,
  );
  const form = useForm({
    resolver: zodResolver(courseUnitMaterialsEditFormSchema),
    defaultValues: {
      title: courseUnitMaterial.title || "",
      description: courseUnitMaterial.description || "",
      file: undefined,
      url: courseUnitMaterial.url || "",
    },
  });

  async function onSubmit(data: TCourseUnitMaterialsEditFormSchema) {
    if (courseUnitMaterial.type === "PDF") {
      const formData = new FormData();

      if (data.title) formData.append("title", data.title);
      if (data.description) formData.append("description", data.description);
      if (data.file) formData.append("file", data.file);
      formData.append("_method", "PATCH");

      await updateCourseUnitMaterial({
        data: formData,
        courseUnitMaterialId: courseUnitMaterial.id,
      });
    } else {
      await updateCourseUnitMaterial({
        data,
        courseUnitMaterialId: courseUnitMaterial.id,
      });
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

        {courseUnitMaterial.type === "PDF" && (
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

        {(courseUnitMaterial.type === "LINK" ||
          courseUnitMaterial.type === "VIDEO") && (
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
          Edit Material
        </LoadingButton>
      </form>
    </Form>
  );
}
