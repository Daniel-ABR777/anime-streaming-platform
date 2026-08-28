import type { Metadata } from "next";
import { RegisterPage } from "@/components/auth/register-page";

export const metadata: Metadata = {
  title: "AniStream — Create Account",
  description: "Create your AniStream account and start watching anime.",
};

export default function SignUp() {
  return <RegisterPage />;
}
