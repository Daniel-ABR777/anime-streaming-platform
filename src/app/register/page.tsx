import type { Metadata } from "next";
import { RegisterPage } from "@/components/auth/register-page";

export const metadata: Metadata = {
  title: "Nova Stream — Create Account",
  description: "Create your Nova Stream account and start watching anime.",
};

export default function Register() {
  return <RegisterPage />;
}
