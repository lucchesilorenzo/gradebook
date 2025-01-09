import { Spinner } from "../ui/spinner";

type LoadingProps = {
  size?: "sm" | "md" | "lg";
};

export default function Loading({ size = "lg" }: LoadingProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner size={size} className="bg-black dark:bg-white" />
    </div>
  );
}
