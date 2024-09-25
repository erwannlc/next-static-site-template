import { ImageDataType } from "@/types/image-types";
import Image from "next/image";
import { getShimmerPlaceHolder } from "./shimmer";

interface Props {
  image: ImageDataType;
  className: string;
}

/** unused */
export default function CustomImage({ image, className }: Props) {
  const {
    alt,
    id,
    imageSrc,
    metadata: { width, height },
  } = image;
  return (
    <Image
      key={id}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      placeholder={getShimmerPlaceHolder(width, height)}
    />
  );
}
