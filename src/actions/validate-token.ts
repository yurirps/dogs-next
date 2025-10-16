"use server";

import { TOKEN_VALIDATE_POST } from "@/functions/api";
import apiError from "@/functions/api-error";
import { cookies } from "next/headers";

export default async function validateToken() {
  try {
    const token = (await cookies()).get("token")?.value;
    if(!token) throw new Error('Acesso negado')
    const { url } = TOKEN_VALIDATE_POST();
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) throw new Error("Erro ao validar Token.");
    const data = (await response.json());
    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
