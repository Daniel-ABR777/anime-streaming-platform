import { redirect } from "next/navigation";

export default function NotificationsRoute() {
  redirect("/profile?tab=notifications");
}
