"use client";

import { getAllArticles } from "@/app/api/article/route";
import { ArticleProps } from "@/app/types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddArticle from "./AddArticle";
import ListArticles from "./ListArticles";
import UpdateArticle from "./UpdateArticle";

export default function ToVisitInTheRegion() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const modalUpdate = searchParams.get("modal-edit");
  const articleId = searchParams.get("articleId");
  const pathname = usePathname();

  const [articles, setArticles] = useState<ArticleProps[]>([]);

  const fetchArticles = async () => {
    try {
      const allArticles = await getAllArticles();
      if (allArticles) {
        setArticles(allArticles as ArticleProps[]);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    if (!modal && !modalUpdate) {
      fetchArticles();
    }
  }, [modal, modalUpdate]);

  return (
    <div className="pb-20 flex flex-col items-center  ">
      {modal && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-white m-auto p-8">
            <div className=" relative gap-10">
              <AddArticle />
              <Link href={pathname}>
                <Button
                  type="button"
                  className="absolute top-0 right-0 p-2 hover:scale-125 "
                >
                  <X />
                </Button>
              </Link>
            </div>
          </div>
        </dialog>
      )}

      {modalUpdate && articleId && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-white m-auto p-8">
            <div className=" relative gap-10">
              <UpdateArticle articleId={articleId} />
              <Link href={pathname}>
                <Button
                  type="button"
                  className="absolute top-0 right-0 p-2 hover:scale-125 "
                >
                  <X />
                </Button>
              </Link>
            </div>
          </div>
        </dialog>
      )}
      <div className=" flex justify-center w-full">
        <ListArticles articles={articles} setArticles={setArticles} />
      </div>
    </div>
  );
}

