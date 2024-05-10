import Image from "next/image";

interface DrawProps {
  image: string;
}

export default function DrawImage({ image }: DrawProps) {
  return <Image height={200} width={200} alt="" src={image} />;
}

