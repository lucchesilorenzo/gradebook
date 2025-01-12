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
import { useDeleteCourseMaterial } from "@/hooks/mutations/materials/useDeleteCourseMaterial";

type CourseUnitMaterialAlertDialogProps = {
  children: React.ReactNode;
  courseMaterialId: string;
};

export default function CourseMaterialAlertDialog({
  children,
  courseMaterialId,
}: CourseUnitMaterialAlertDialogProps) {
  const { mutateAsync: deleteCourseMaterial } = useDeleteCourseMaterial();

  async function handleDeleteCourseUnitMaterial() {
    await deleteCourseMaterial(courseMaterialId);
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
