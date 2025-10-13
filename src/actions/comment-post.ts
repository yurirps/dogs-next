"use server";

import { COMMENT_POST } from "@/functions/api";
import apiError from "@/functions/api-error";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { Comment } from "./photo-get";

// ou deixar o objeto vazio**
export default async function commentPost(
  state: { ok: boolean },
  formData: FormData
) {
  const token = (await cookies()).get("token")?.value;
  const comment = formData.get("comment") as string | null;
  const id = formData.get("id") as string | null;

  try {
    if (!comment || !id )
      throw new Error("Preencha todos os dados");
    const { url } = COMMENT_POST(id);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    if (!response.ok) throw new Error("Email ou usuario já cadastrado.");
    const data = await response.json() as Comment;
    revalidateTag('comment')
    return {data, ok: true, error: ''}
  } catch (error: unknown) {
    return apiError(error);
  }
}
