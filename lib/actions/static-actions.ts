"use server";
import type { PageId } from "@/types/app-types";
import { getAllStaticPagesId_UseCase } from "@/use-cases/static-images";
import { revalidateTag } from "next/cache";


export async function revalidateStaticImagesDataByPage(
  pageId: PageId
) {
  revalidateTag(`local-${pageId}`);
}

export async function revalidateStaticImagesDataForAllPages(
) {
  const pagesId = await getAllStaticPagesId_UseCase();
  pagesId.forEach(pageId => {
    revalidateTag(`local-${pageId}`);
  });
}
