"use client";

import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { COOPERATIVE_PANEL_PATH } from "@/features/cooperative/cooperative.constants";

const formSchema = z.object({
  // Either the email address or the phone number
  identifier: z.string(),
  password: z.string(),
  rememberMe: z.boolean().default(false),
});

export default function SignInForm() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
    shouldFocusError: true,
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    if (!values.identifier || !values.password) {
      !values.identifier && form.setError("identifier", { message: "C" });
      !values.password && form.setError("password", { message: "C" });
      return setError("Tous les champs doivent être remplis");
    }
    setError("");
    form.clearErrors();
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        identifier: values.identifier,
        password: values.password,
        redirect: false,
      });
      if (result?.error) {
        form.setError("identifier", { message: "C" });
        form.setError("password", { message: "C" });
        setError(
          "L'adresse e-mail ou le numéro téléphone ne correspondent pas. Veuillez réeesayer.",
        );
      } else {
        router.push(COOPERATIVE_PANEL_PATH);
      }
    } catch (error) {
      console.log(error);
      form.setError("identifier", { message: "C" });
      form.setError("password", { message: "C" });
      setError("Un erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      {error && (
        <p className="bg-red-200 text-destructive text-sm font-semibold py-3 px-4 rounded-md border border-destructive/10 mb-4 text-center">
          {error}
        </p>
      )}
      <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail ou Numéro téléphone</FormLabel>
              <FormControl>
                <Input
                  placeholder="Votre adresse e-mail ou numéro téléphone"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem style={{ marginTop: "1rem" }}>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Votre mot de passe"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-between" style={{ marginTop: "0.75rem" }}>
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Checkbox checked={field.value} disabled={loading} />
                </FormControl>
                <div className="ml-2" style={{ marginTop: "0" }}>
                  <FormLabel className="text-foreground/80 font-semibold">
                    Rester connecté
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button variant="link" className="text-foreground/60 p-0">
            Mot de passe oublié?
          </Button>
        </div>
        <div style={{ marginTop: "0.75rem" }}>
          <Button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full"
          >
            {!loading && <Lock className="mr-2 h-5 w-5" />}
            {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            S'authentifier
          </Button>
        </div>
      </form>
    </Form>
  );
}
