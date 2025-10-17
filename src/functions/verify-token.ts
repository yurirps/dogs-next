import { jwtVerify } from "jose";

export default async function verifyToken(token: string): Promise<boolean> {
  if (!token) return false;
  try {
    // await jwtVerify(token, new TextEncoder().encode("AQUI_VAI_SUA_KEY"), {
    //   algorithms: ["HS256"],
    // });

    return true;
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return false;
  }
}
