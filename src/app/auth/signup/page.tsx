import React from "react";

import ProtectedGuard from "@/features/auth/components/ProtectedGuard";

export default async function SignupPage() {
  return (
    <ProtectedGuard grants={{ authState: "unauthenticated" }}>
      <div>Sign up</div>
    </ProtectedGuard>
  );
}
