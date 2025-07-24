type Props = {
  params: {
    user: string;
  };
};


export default async function PerfilUserPage(props: Props) {
    const { user } = await props.params;
    return (
        <main>
            <h1>Usuario: {user}</h1>
        </main>
    )
} 