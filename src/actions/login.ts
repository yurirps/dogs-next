"use server";

import { TOKEN_POST } from "@/functions/api";
import apiError from "@/functions/api-error";
import { cookies } from "next/headers";

export default async function login(
  state: { ok: boolean },
  formData: FormData
) {
  // ou deixar o objeto vazio**
  const username = formData.get("username") as string | null;
  const password = formData.get("password") as string | null;

  try {
    if (!username || !password) throw new Error("Preencha os dados");
    const{url} = TOKEN_POST()
    const response = await fetch(url,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) throw new Error("Credenciais incorretas");

    const data = await response.json();
    const cookieStore = await cookies(); // Aguarda a promise do cookies() antes de chamar set()
    cookieStore.set("token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    return { data: null, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
