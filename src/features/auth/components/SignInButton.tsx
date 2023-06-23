"use client";

import React from "react";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  const submit = () =>
    signIn("credentials", {
      email: "johndoe@gmail.com",
      password: "123abcABC*",
      redirect: false,
    });
  return <button onClick={submit}>SignIn</button>;
}
