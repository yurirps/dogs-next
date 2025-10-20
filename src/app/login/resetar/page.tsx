import LoginResetarForm from "@/components/login/login-resetar-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resetar senha | Dogs",
  description: "Resetar senha",
};

type ResetarSearchParams = {
  searchParams: Promise<{
    key: string;
    login: string;
  }>;
};

export default async function ResetarPage({
  searchParams,
}: ResetarSearchParams) {
  const { key, login } = await searchParams;

  return (
    <div className="animeLeft">
      <h1 className="title">Nova Senha</h1>
      <LoginResetarForm
        keyToken={key}
        login={login}
      />
    </div>
  );
}