import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTasks } from "@/hooks/queries/useTasks";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Loading from "../../common/Loading";
import Task from "./Task";
import TaskForm from "./TaskForm";

export default function TasksCard() {
  const { data: tasks = [], isLoading } = useTasks();

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-md font-bold sm:text-xl">Tasks</CardTitle>
        <VisuallyHidden>
          <CardDescription>Tasks</CardDescription>
        </VisuallyHidden>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <Loading size="sm" />
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </ul>
        )}

        <TaskForm />
      </CardContent>
    </Card>
  );
}
