import "server-only";
import { unstable_cache } from "next/dist/server/web/spec-extension/unstable-cache";
import type { PageId, StaticImagesDataJsonFilename } from "@/types/app-types";
import { getStaticImagesDataByPage_dal } from "@/data-access/static_dal";
import { getStaticImagesByPageId_UseCase } from "@/use-cases/static-images";

export const getCachedStaticImagesByPage = async (
  pageId: PageId
) => {
  return unstable_cache(
    async () => await getStaticImagesByPageId_UseCase(pageId),
    [`local-${pageId}`],
    { tags: [`local-${pageId}`] }
  )();
};

/** no usage */
export const getCachedStaticImagesData = (
  imagesFileName: StaticImagesDataJsonFilename
) => {
  return unstable_cache(
    async () => getStaticImagesDataByPage_dal(imagesFileName),
    [`local-${imagesFileName}`],
    { tags: [`local-${imagesFileName}`] }
  )();
};
