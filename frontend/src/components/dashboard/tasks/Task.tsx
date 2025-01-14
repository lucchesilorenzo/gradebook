import { TTask } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import TaskAlertDialog from "./TaskAlertDialog";

type TaskProps = {
  task: TTask;
};

export default function Task({ task }: TaskProps) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <li key={task.id} className="flex items-center justify-between">
      <div>
        <Checkbox
          onCheckedChange={() => setIsChecked((isChecked) => !isChecked)}
        />
        <span
          className={cn(
            "ml-2 text-sm",
            isChecked && "text-muted-foreground line-through",
          )}
        >
          {task.title}
        </span>
      </div>

      <TaskAlertDialog taskId={task.id}>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </TaskAlertDialog>
    </li>
  );
}
