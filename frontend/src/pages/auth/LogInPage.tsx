import BrandLogo from "@/components/common/BrandLogo";
import LogInCard from "@/components/auth/LogInCard";
import env from "@/lib/env";
import { useEffect } from "react";

export default function LogInPage() {
  useEffect(() => {
    document.title = `Log In | ${env.VITE_APP_NAME}`;
  }, []);

  return (
    <main className="flex min-h-screen justify-center p-6 md:p-10">
      <div>
        <BrandLogo />

        <div className="flex flex-col gap-6">
          <LogInCard />
        </div>
      </div>
    </main>
  );
}
