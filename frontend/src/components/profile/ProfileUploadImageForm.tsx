import { useUser } from "@/hooks/useUser";
import {
  profileUploadImageFormSchema,
  TProfileUploadImageFormSchema,
} from "@/lib/validations/profile-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoadingButton } from "../common/LoadingButton";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

export default function ProfileUploadImageForm() {
  const { userSettings } = useUser();
  const form = useForm({
    resolver: zodResolver(profileUploadImageFormSchema),
    defaultValues: {
      image: userSettings.image,
    },
  });

  async function onSubmit(data: TProfileUploadImageFormSchema) {
    console.log(data);
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
