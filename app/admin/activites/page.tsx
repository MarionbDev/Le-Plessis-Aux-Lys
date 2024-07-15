"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import AddArticle from "./_components/AddArticle";
import ListArticles from "./_components/ListArticles";

export default function ToVisitInTheRegion() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();

  return (
    <div className="pb-20 flex flex-col items-center  ">
      {modal && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-white m-auto p-8">
            <div className=" relative gap-10">
              <AddArticle />
              <Link href={pathname}>
                <button
                  type="button"
                  className="absolute top-0 right-0 p-2 hover:scale-125 "
                >
                  <X />
                </button>
              </Link>
            </div>
          </div>
        </dialog>
      )}
      <ListArticles />
    </div>
  );
}

