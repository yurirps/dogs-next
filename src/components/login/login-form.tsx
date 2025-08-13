"use client";

import login from "@/actions/login";
import { useFormStatus } from "react-dom";
import Button from "@/components/forms/button";
import React, { useActionState } from "react";
import Input from "@/components/forms/input";
import ErrorMessage from "../helper/error-message";
import Link from "next/link";
import styles from "./login-form.module.css";

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

  //redirecionar se fizer login
  React.useEffect(() => {
    if (state.ok) window.location.href = "/conta";
  }, [state.ok]);

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label="Usuário" name="username" type="text" />
        <Input label="Senha" name="password" type="password" />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
      <Link href="/login/perdeu" className={styles.perdeu}>
        Esqueceu sua senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Crie sua conta agora mesmo!</p>
        <Link href="/login/criar" className="button" >Criar Conta</Link>
      </div>
    </>
  );
}
