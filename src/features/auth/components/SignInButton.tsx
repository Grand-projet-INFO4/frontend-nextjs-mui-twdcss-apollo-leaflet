"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  const [isLoading, setLoading] = useState(false);

  const submit = async () => {
    console.log("Hello!");
    setLoading(true);
    const result = await signIn("credentials", {
      email: "johndoe@gmail.com",
      password: "123abcABC*",
      redirect: false,
    });
    setLoading(false);
    console.log(result);
  };
  return <button onClick={submit}>Sign in {isLoading && "..."}</button>;
}
