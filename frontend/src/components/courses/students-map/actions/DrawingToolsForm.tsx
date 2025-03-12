import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
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
import { Slider } from "@/components/ui/slider";
import { useCanvas } from "@/hooks/contexts/useCanvas";
import {
  TDrawingToolsFormSchema,
  drawingToolsFormSchema,
} from "@/validations/canvas-validations";

export default function DrawingToolsForm() {
  const { setDrawingTool } = useCanvas();
  const [open, setOpen] = useState(false);

  const form = useForm<TDrawingToolsFormSchema>({
    resolver: zodResolver(drawingToolsFormSchema),
    defaultValues: {
      name: "",
      color: "#000000",
      size: 5,
    },
  });

  async function onSubmit(data: TDrawingToolsFormSchema) {
    setDrawingTool(data);
    setOpen(false);

    form.reset();
    form.clearErrors();
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>
          <Pencil />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Select tool</h4>
            <p className="text-sm text-muted-foreground">
              Select the tool you want to use.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Tool</FormLabel>

                      <div className="flex items-center gap-2">
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Select a tool" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-64">
                            <SelectItem value="pencil">Pencil</SelectItem>
                            <SelectItem value="eraser">Eraser</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input
                          className="h-8 w-10 border-none p-0"
                          type="color"
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
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Size</FormLabel>
                      <FormControl>
                        <Slider
                          className="max-w-[190px]"
                          min={1}
                          max={20}
                          defaultValue={[field.value]}
                          onChange={field.onChange}
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
