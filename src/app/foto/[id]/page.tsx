type Props = {
  params: {
    id: string;
  };
};

export default async function FotoIdPage(props: Props) {
  const { id } = await props.params;

  return (
    <main>
      <h1>Foto id: {id}</h1>
    </main>
  );
}

