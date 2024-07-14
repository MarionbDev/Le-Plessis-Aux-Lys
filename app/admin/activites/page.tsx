"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import AddArticle from "./_components/AddArticle";
import ListArticles from "./_components/ListArticles";

export default function ToVisitInTheRegion() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();

  return (
    <div className=" px-20 flex flex-col items-center my-10 ">
      {modal && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-white m-auto p-8">
            <div className="flex flex-col items-center">
              <AddArticle />
              <Link href={pathname}>
                <button type="button" className="bg-red-500 text-white p-2">
                  Close Modal
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

