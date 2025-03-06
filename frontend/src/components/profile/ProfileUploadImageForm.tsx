import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoadingButton } from "../common/LoadingButton";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

import { useUploadUserImage } from "@/hooks/mutations/users/useUploadUserImage";
import {
  TProfileUploadImageFormSchema,
  profileUploadImageFormSchema,
} from "@/validations/profile-validations";

export default function ProfileUploadImageForm() {
  const { mutateAsync: uploadUserImage } = useUploadUserImage();
  const form = useForm({
    resolver: zodResolver(profileUploadImageFormSchema),
  });

  async function onSubmit(data: TProfileUploadImageFormSchema) {
    const formData = new FormData();

    if (data.image) formData.append("image", data.image);
    await uploadUserImage(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    field.onChange(e.target.files && e.target.files[0])
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        <LoadingButton type="submit" isLoading={form.formState.isSubmitting}>
          Upload Image
        </LoadingButton>
      </form>
    </Form>
  );
}
