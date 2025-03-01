import React from "react";
import { useNavigate } from "react-router-dom";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) navigate("/auth/login");

  return children;
}
