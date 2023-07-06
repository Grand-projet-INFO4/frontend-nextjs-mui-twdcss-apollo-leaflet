import { redirect } from "next/navigation";

export default function CooperativePanelIndex() {
  // No URL segments for the sections defaults to the dashboard section
  redirect("/cooperative-panel/dashboard");

  return null;
}
