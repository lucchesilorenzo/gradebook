import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import ToDoListForm from "./ToDoListForm";

export default function ToDoList() {
  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle className="text-md font-bold sm:text-xl">
          To-Do List
        </CardTitle>
        <VisuallyHidden>
          <CardDescription>To-Do List</CardDescription>
        </VisuallyHidden>
      </CardHeader>
      <CardContent>
        <ToDoListForm />
      </CardContent>
    </Card>
  );
}
