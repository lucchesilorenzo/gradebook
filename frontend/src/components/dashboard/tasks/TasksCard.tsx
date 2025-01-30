import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useTasks } from "@/hooks/queries/useTasks";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { NotebookText } from "lucide-react";
import { useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import TaskPagination from "./TaskPagination";

export default function TasksCard() {
  const [page, setPage] = useState(1);
  const { data: tasks, isLoading } = useTasks(page);

  if (!tasks) return null;

  return (
    <Card>
      {isLoading ? (
        <div className="flex h-96 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-bold sm:text-xl">
              <NotebookText />
              Tasks
            </CardTitle>
            <VisuallyHidden>
              <CardDescription>Tasks</CardDescription>
            </VisuallyHidden>
          </CardHeader>
          <CardContent className="space-y-4">
            {!tasks.data.length && !isLoading ? (
              <p className="text-sm text-muted-foreground">No tasks yet.</p>
            ) : (
              <ul className="space-y-2">
                {tasks.data.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </ul>
            )}

            {tasks.data.length > 0 && (
              <TaskPagination
                page={tasks.current_page}
                lastPage={tasks.next_page_url}
                setPage={setPage}
              />
            )}

            <TaskForm />
          </CardContent>
        </>
      )}
    </Card>
  );
}
