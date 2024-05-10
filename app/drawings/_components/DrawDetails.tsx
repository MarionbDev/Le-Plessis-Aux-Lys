import DrawImage from "./DrawImage";

interface DrawProps {
  title: string;
  description: string;
  image: string;
}

export default function DrawDetails({ title, description, image }: DrawProps) {
  return (
    <>
      <div className="  flex flex-col items-center gap-2">
        <DrawImage image={image} />
        <div> {title} </div>
        <div> {description} </div>
      </div>
    </>
  );
}

