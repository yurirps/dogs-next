import photoGet from "@/actions/photo-get";
import FeedModal from "@/components/feed/feed-modal";
import { notFound } from "next/navigation";

type FotoIdParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: FotoIdParams) {
  const { id } = await params; // Aguarda params primeiro
  const { data } = await photoGet(id);
  if (!data) return { title: "Fotos" };
  return {
    title: data.photo.title,
  };
}

export default async function FotoIdPage({ params }: FotoIdParams) {
  const { id } = await params; // Aguarda params primeiro
  const { data } = await photoGet(id);
  
  if (!data) return notFound();
  
  return (
   <FeedModal photo={data} />
  );
}