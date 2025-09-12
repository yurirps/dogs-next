"use client";

import { useFormStatus } from "react-dom";
import Button from "@/components/forms/button";
import React, { useActionState } from "react";
import Input from "@/components/forms/input";
import ErrorMessage from "../helper/error-message";
import styles from "./login-form.module.css";
import passwordReset from "@/actions/password-reset";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending}>Aguarde...</Button>
      ) : (
        <Button>Resetar Senha</Button>
      )}
    </>
  );
}

export default function LoginResetarForm({keyToken, login}: { keyToken: string, login: string }) {
  const [state, action] = useActionState(passwordReset, {
    ok: false,
    error: "",
    data: null,
  });

  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    setUrl(
      `${window.location.origin}${window.location.pathname.replace(
        "perdeu",
        "resetar"
      )}`
    );
  }, []);

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label="Nova senha" name="password" type="password" />
        <Input type="hidden" name="login" value={login} label="" />
        <Input type="hidden" name="key" value={keyToken} label="" />
        <ErrorMessage error={state.error} />

        <FormButton />
      </form>
    </>
  );
}
