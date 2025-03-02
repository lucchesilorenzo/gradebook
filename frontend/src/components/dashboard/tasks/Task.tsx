import { TTask } from "@/types";
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
    <li key={task.id} className="flex justify-between">
      <div className="flex items-center">
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
        <Button variant="ghost" size="icon" disabled={!isChecked}>
          <Trash2 />
        </Button>
      </TaskAlertDialog>
    </li>
  );
}
