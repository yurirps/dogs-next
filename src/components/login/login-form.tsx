"use client";

import login from "@/actions/login";
import { useFormStatus } from "react-dom";
import Button from "@/components/forms/button";
import { useActionState } from "react";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending}>Aguarde...</Button>
      ) : (
        <Button>Entrar</Button>
      )}
    </>
  );
}

export default function LoginForm() {
  const [state, action] = useActionState(login, {
    ok: false,
    error: "",
    data: null,
  });

  return (
    <>
      <form action={action}>
        <input type="text" name="username" placeholder="usuário" />
        <input type="password" name="password" placeholder="senha" />
        <FormButton />
        <p>{state.error}</p>
      </form>
    </>
  );
}
