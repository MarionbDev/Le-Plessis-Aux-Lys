import { ArticleProps, onUploadComplete } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

interface Props extends Omit<ArticleProps, "path"> {
  path: string | null; // Utilisation de string ou null pour le chemin d'image
  onUploadComplete: (uploadedFileData: onUploadComplete) => void;
  bucket: string;
}

export default function Article({
  title,
  description,
  content,
  url_link,
  path,
  onUploadComplete,
  bucket,
}: Props) {
  return (
    <>
      <h2>{title}</h2>
      {/* <UploadFileAdmin
        // id={id}
        onUploadComplete={onUploadComplete}
        bucket={bucket}
      /> */}
      {path && (
        <div>
          <Image src={path} width={200} height={200} alt={`Photo ${title}`} />
        </div>
      )}
      <p>{description}</p>
      <p dangerouslySetInnerHTML={{ __html: content }} />
      {url_link ? (
        <Link href={url_link}>
          <a>Lien vers l'article</a>
        </Link>
      ) : (
        <p>/</p>
      )}{" "}
    </>
  );
}

