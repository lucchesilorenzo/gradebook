import { Spinner } from "../ui/spinner";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner size="lg" className="bg-black dark:bg-white" />
    </div>
  );
}
