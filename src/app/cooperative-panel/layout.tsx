import { PropsWithChildren } from "react";

import AuthenticatedPageGuard from "@/features/auth/components/AuthenticatedPageGuard";

export default function CooperativePanelLayout({ children }: PropsWithChildren) {
  return <AuthenticatedPageGuard>{children}</AuthenticatedPageGuard>;
}
