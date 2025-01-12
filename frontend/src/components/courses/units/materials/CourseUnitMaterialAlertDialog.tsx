import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteCourseUnitMaterial } from "@/hooks/mutations/materials/useDeleteCourseUnitMaterial";

type CourseUnitMaterialAlertDialogProps = {
  children: React.ReactNode;
  courseUnitMaterialId: string;
};

export default function CourseUnitMaterialAlertDialog({
  children,
  courseUnitMaterialId,
}: CourseUnitMaterialAlertDialogProps) {
  const { mutateAsync: deleteCourseUnitMaterial } =
    useDeleteCourseUnitMaterial();

  async function handleDeleteCourseUnitMaterial() {
    await deleteCourseUnitMaterial(courseUnitMaterialId);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            material.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteCourseUnitMaterial}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
