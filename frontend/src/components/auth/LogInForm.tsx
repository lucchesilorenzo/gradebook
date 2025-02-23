import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLogIn } from "@/hooks/mutations/auth/useLogIn";
import {
  logInFormSchema,
  TLogInFormSchema,
} from "@/lib/validations/auth-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import EmailInput from "../common/EmailInput";
import { LoadingButton } from "../common/LoadingButton";
import PasswordInput from "../common/PasswordInput";

export default function LogInForm() {
  const { mutateAsync: logIn } = useLogIn();
  const form = useForm({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: TLogInFormSchema) {
    await logIn(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <EmailInput placeholder="m@example.com" field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="•••••••••" field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton type="submit" isLoading={form.formState.isSubmitting}>
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
}
