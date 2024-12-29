import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <Outlet />
    </main>
  );
}
