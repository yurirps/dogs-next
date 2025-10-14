import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="container"
      style={{
        textAlign: "center",
      }}
    >
      <h1 className="tittle" style={{ marginTop: "1.5rem" }}>
        Página não encontrada
      </h1>
      <Link
        className="button"
        style={{ marginBottom: "1rem", display: "inline-block" }}
        href={"/"}
      >
        Volte para home
      </Link>
    </section>
  );
}
