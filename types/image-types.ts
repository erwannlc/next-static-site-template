import { DateString } from "./utility-types";

type ImageID = string

interface ImageDataType {
  imageSrc: string
  fileName: string
  alt: string
  id: ImageID
  metadata: ImageMetadata
}

interface ImageOnlyID {
  id: ImageID
}

interface ImageMetadata {
  width: number,
  height: number,
  orientation: MetadataOrientation
  format: string,
  size: number
  uploadedBy?: string
  uploadedAt?: DateString
}
type MetadataOrientation = "landscape" | "portrait" | "square"

interface Dimensions {
  width: number
  height: number
}

interface StaticImageAlt {
  image_id: ImageID,
  alt: string
}

export type {
  ImageDataType,
  ImageOnlyID,
  ImageMetadata,
  MetadataOrientation,
  Dimensions,
  ImageID,
  StaticImageAlt
};