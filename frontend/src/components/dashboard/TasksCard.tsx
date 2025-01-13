import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import TasksForm from "./TasksForm";

export default function ToDoList() {
  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle className="text-md font-bold sm:text-xl">Tasks</CardTitle>
        <VisuallyHidden>
          <CardDescription>Tasks</CardDescription>
        </VisuallyHidden>
      </CardHeader>
      <CardContent>
        <TasksForm />
      </CardContent>
    </Card>
  );
}
