import "server-only";
import type { PageId } from "@/types/app-types";
import type { StaticImageAlt } from "@/types/image-types";
import { FETCH } from "@/constants/UI/fetch_messages";
import { APP_CONSTANTS } from "@/constants/app_constants";

const { ERROR, WARNING } = FETCH;
const { staticPages } = APP_CONSTANTS;


export async function getStaticImagesByPageId_UseCase(
  pageId: PageId,
  cached_staticImagesAlt?: StaticImageAlt[] | null,
) {
  if (!cached_staticImagesAlt) console.error(WARNING.NO_CACHED_DATA);
  const jsonFileName = staticPages.find(page => page.id === pageId)?.staticImagesDataFile;
  if (!jsonFileName) throw new Error(ERROR.STATIC_GET_ERROR);
}

/** staticPages DTO => only page.id */
export async function getAllStaticPagesId_UseCase() {
  return staticPages.map(page => page.id);
}