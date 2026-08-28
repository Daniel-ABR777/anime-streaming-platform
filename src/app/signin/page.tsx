import type { Metadata } from "next";
import { LoginPage } from "@/components/auth/login-page";

export const metadata: Metadata = {
  title: "AniStream — Sign In",
  description: "Sign in to AniStream and continue watching anime.",
};

export default function SignIn() {
  return <LoginPage />;
}
