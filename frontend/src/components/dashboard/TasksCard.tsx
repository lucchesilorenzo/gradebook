import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import TasksForm from "./TasksForm";
import { useTasks } from "@/hooks/queries/useTasks";
import Loading from "../common/Loading";

export default function ToDoList() {
  const { data: tasks = [], isLoading } = useTasks();

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle className="text-md font-bold sm:text-xl">Tasks</CardTitle>
        <VisuallyHidden>
          <CardDescription>Tasks</CardDescription>
        </VisuallyHidden>
      </CardHeader>
      <CardContent>
        {isLoading ? <Loading /> : <TasksForm tasks={tasks} />}
      </CardContent>
    </Card>
  );
}
