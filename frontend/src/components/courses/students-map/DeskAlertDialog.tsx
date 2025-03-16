import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCanvas } from "@/hooks/contexts/useCanvas";

type DeskAlertDialogProps = {
  showAlertDialog: boolean;
  setShowAlertDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeskAlertDialog({
  showAlertDialog,
  setShowAlertDialog,
}: DeskAlertDialogProps) {
  const { selectedDesk, setDesks } = useCanvas();

  function handleDeleteDesk() {
    setDesks((prev) => prev.filter((desk) => desk.student_id !== selectedDesk));
    setShowAlertDialog(false);
  }

  return (
    <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will remove the desk from the map.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setShowAlertDialog(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteDesk}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
