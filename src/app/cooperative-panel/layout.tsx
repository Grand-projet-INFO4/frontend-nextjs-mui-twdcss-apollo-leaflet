import { PropsWithChildren } from "react";

import AuthenticatedPageGuard from "@/features/auth/components/AuthenticatedPageGuard";
import CooperativePanelSideNav from "../../features/cooperative/components/CooperativePanelSideNav";

export default function CooperativePanelLayout({ children }: PropsWithChildren) {
  return <AuthenticatedPageGuard>{children}</AuthenticatedPageGuard>;
}
