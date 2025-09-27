"use server";

import { PHOTO_POST } from "@/functions/api";
import apiError from "@/functions/api-error";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ou deixar o objeto vazio**
export default async function photoPost(
  state: { ok: boolean },
  formData: FormData
) {
  const token = (await cookies()).get("token")?.value;
  const nome = formData.get("nome") as string | null;
  const idade = formData.get("idade") as string | null;
  const peso = formData.get("peso") as string | null;
  const img = formData.get("img") as File;

  try {
    if (!nome || !idade || !peso || img.size === 0)
      throw new Error("Preencha todos os dados");
    const { url } = PHOTO_POST();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    if (!response.ok) throw new Error("Email ou usuario já cadastrado.");
  } catch (error: unknown) {
    return apiError(error);
  }
  revalidateTag("photos");
  redirect('/conta')
}
