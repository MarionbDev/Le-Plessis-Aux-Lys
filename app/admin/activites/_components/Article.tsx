import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  title: string;
  description: string;
  content: string;
  url_link: string;
  image_path: string;
};

export default function Article({
  title,
  description,
  content,
  url_link,
  image_path,
}: Props) {
  return (
    <>
      <h2>{title}</h2>
      {/* <UploadFileAdmin
        // id={id}
        onUploadComplete={onUploadComplete}
        bucket={bucket}
      /> */}
      <div>
        {image_path && (
          <p>
            <Image
              src={image_path}
              width={200}
              height={200}
              alt={`Photo ${title}`}
            />
          </p>
        )}
      </div>
      <p>{description}</p>
      <p dangerouslySetInnerHTML={{ __html: content }} />
      {url_link ? (
        <Link href={url_link}>
          <p>Lien vers l'article</p>
        </Link>
      ) : (
        <p>/</p>
      )}{" "}
    </>
  );
}

