import type { ImageDataType, MetadataOrientation } from "@/types/image-types";
import { getCurrentDate, incrementNumericPart } from "./utils";

export const placeholderImgData: Omit<ImageDataType, "id"> = {
  imageSrc: "/images/placeholder.png",
  fileName: "placeholder.png",
  alt: "",
  metadata: {
    width: 960,
    height: 796,
    format: "png",
    size: 6.84,
    orientation: "landscape",
    uploadedBy: "default_admin"
  }
};

/** used in useContentAdmin addImage (client side) */
export function addPlaceholderImgData(
  previousIndex: number
): ImageDataType {
  return {
    ...placeholderImgData,
    id: incrementNumericPart(`placeholderImgId-${previousIndex + 1}`),
    metadata: {
      ...placeholderImgData.metadata,
      uploadedAt: getCurrentDate()
    }
  };
}

export function getOrientation(width: number, height: number): MetadataOrientation {
  if (width > height) {
    return "landscape";
  } else if (width < height) {
    return "portrait";
  } else return "square";
}