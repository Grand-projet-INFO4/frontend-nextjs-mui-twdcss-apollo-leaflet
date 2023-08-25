"use client";

import { handleChange } from "@/helpers/event-handlers.helper";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

export default function SignInForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn("credentials", {
        identifier,
        password,
        redirect: false,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="identifier"
          placeholder="Email or Phone number"
          value={identifier}
          onChange={handleChange((value) => setIdentifier(value))}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange((value) => setPassword(value))}
        />
      </div>
      <button type="submit" disabled={loading}>
        Submit {loading && "..."}
      </button>
    </form>
  );
}
