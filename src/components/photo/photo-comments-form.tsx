"use client";

import { useFormStatus } from "react-dom";
import styles from "./photo-comments-form.module.css";
import EnviarIcon from "@/icons/enviar-icon";
import ErrorMessage from "../helper/error-message";
import { Comment } from "@/actions/photo-get";
import commentPost from "@/actions/comment-post";
import React, { useActionState } from "react";

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button className={styles.button} disabled={pending}>
      <EnviarIcon />
    </button>
  );
}

export default function PhotoCommentsForm({
  single,
  id,
  setComments,
}: {
  single: boolean;
  id: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}) {
  const [state, action] = useActionState(commentPost, {
    ok: false,
    data: null,
    error: "",
  });

  React.useEffect(() => {
    if (state.ok && state.data) {
      setComments((comments) => [...comments, state.data]);
    }
  }, [state, setComments]);

  return (
    <form
      action={action}
      className={`${styles.form} ${single ? styles.single : ""}`}
    >
      <input type="hidden" name="id" id="id" value={id} />
      <textarea
        className={styles.textarea}
        name="comment"
        id="comment"
        placeholder="Comente..."
      ></textarea>
      <FormButton />
      <ErrorMessage error={state.error} />
    </form>
  );
}
