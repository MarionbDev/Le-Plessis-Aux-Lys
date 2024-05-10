"use client";
import { Reorder } from "framer-motion";
import { useState } from "react";
import data from "../../data/data.json";
import DrawImage from "./DrawImage";

export default function DrawingListGallery() {
  const [items, setItems] = useState(data);
  // console.log(data);

  return (
    <Reorder.Group
      axis="x"
      values={items}
      onReorder={setItems}
      className="flex justify-center gap-10 mx-24 mt-20 "
    >
      {items.map((item) => (
        <Reorder.Item key={item.id} value={item}>
          <div className=" flex flex-col items-center hover:scale-110 duration-500 border-4 p-2">
            <DrawImage image={item.image} />
            {item.title}
          </div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

