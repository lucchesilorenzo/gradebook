import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import env from "@/lib/env";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

type NotFoundPageProps = {
  content?: string;
};

export default function NotFoundPage({ content = "page" }: NotFoundPageProps) {
  useEffect(() => {
    document.title = `404 | ${env.VITE_APP_NAME}`;
  }, []);

  const location = useLocation();
  const passedContent = location.state?.content || content;

  return (
    <main className="mx-auto flex min-h-screen w-[500px] flex-col items-center justify-center space-y-4">
      <h1 className="flex items-center">
        <span className="text-xl font-bold">404</span>
        <Separator orientation="vertical" className="mx-3 h-8 bg-gray-400" />
        <span className="text-lg">
          This {passedContent} could not be found.
        </span>
      </h1>

      <Button variant="link">
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft /> Go back to dashboard
        </Link>
      </Button>
    </main>
  );
}
