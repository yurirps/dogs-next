"use server";

import { USER_GET } from "@/functions/api";
import apiError from "@/functions/api-error";
import login from "./login";
import { cookies } from "next/headers";

export type User = {
  id: number;
  email: string;
  username: string;
  nome: string;
};

export default async function userGet(formData?: FormData) {
  try {
    const cookieStore = await cookies(); // ok no server
    const token = cookieStore.get("token")?.value;

    if (!token) throw new Error("token não encontrado");

    const { url } = USER_GET();

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) throw new Error("Erro ao buscar usuário.");

    const data = (await response.json()) as User;

    // Só roda login se formData existir
    if (formData) {
      const { ok } = await login({ ok: true, error: "" }, formData);
      if (!ok) throw new Error("Erro ao buscar usuário.");
    }

    return { data, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
