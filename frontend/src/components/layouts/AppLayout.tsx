import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import AuthGuard from "../common/AuthGuard";

export default function AppLayout() {
  return (
    <AuthGuard>
      <main>
        <Header />
        <Outlet />
      </main>
    </AuthGuard>
  );
}
