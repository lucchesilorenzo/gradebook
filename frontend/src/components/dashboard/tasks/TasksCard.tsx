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
import { useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import TaskPagination from "./TaskPagination";

export default function TasksCard() {
  const [page, setPage] = useState(1);
  const { data: tasks, isLoading } = useTasks(page);

  if (!tasks) return null;

  function handleNextPage() {
    if (tasks?.next_page_url) {
      setPage((prev) => prev + 1);
    }
  }

  function handlePrevPage() {
    if (tasks?.prev_page_url) {
      setPage((prev) => prev - 1);
    }
  }

  return (
    <Card className="max-w-96">
      <CardHeader>
        <CardTitle className="text-md font-bold sm:text-xl">Tasks</CardTitle>
        <VisuallyHidden>
          <CardDescription>Tasks</CardDescription>
        </VisuallyHidden>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading && <Spinner size="sm" />}
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
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )}

        <TaskForm />
      </CardContent>
    </Card>
  );
}
