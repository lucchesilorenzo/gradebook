import { Mail } from "lucide-react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

import { Input } from "@/components/ui/input";

type EmailInputProps<T extends FieldValues> = {
  field: ControllerRenderProps<T>;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
};

export default function EmailInput<T extends FieldValues>({
  field,
  placeholder,
  disabled = false,
  readOnly = false,
  ...props
}: EmailInputProps<T>) {
  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete="email"
        className="peer pe-9"
        {...field}
        {...props}
      />
      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
        <Mail size={16} strokeWidth={2} aria-hidden="true" />
      </div>
    </div>
  );
}
