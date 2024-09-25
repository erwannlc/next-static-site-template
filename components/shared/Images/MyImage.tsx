import Image from "next/image";

import type { CSSProperties } from "react";
import type { ImageDataType } from "@/types/image-types";
import { getShimmerPlaceHolder } from "./shimmer";
import placeholder from "@/public/images/placeholder.png";
import cameraFlower from "@/public/images/_mock/blog/clau-alexa-xc_85A5hvo8-unsplash-Moyenne.jpeg";
import { isIntegerInRange } from "@/utils/utils";

interface Props {
  image: ImageDataType;
  autoStyle?: boolean;
  className?: string;
  addStyle?: CSSProperties;
  fit?: "contain" | "cover";
  quality?: number;
  isCameraFlower?: boolean;
}
export default function MyImage({
  image,
  autoStyle,
  className,
  addStyle,
  fit,
  quality,
  isCameraFlower,
}: Props) {
  const {
    imageSrc,
    alt,
    id,
    metadata: { width, height, orientation },
  } = image;

  const src = image.id.includes("placeholderImgId")
    ? isCameraFlower
      ? cameraFlower
      : placeholder
    : imageSrc;

  function getAutoStyle(): CSSProperties {
    switch (orientation) {
      case "landscape":
        return {
          width: "100%",
          height: "auto",
          objectFit: fit || "cover",
        };
      case "portrait":
        return {
          width: "auto",
          height: "100%",
          objectFit: fit || "cover",
        };
      case "square":
        return {
          width: "auto",
          height: "auto",
          objectFit: fit || "cover",
        };
    }
  }

  const style = autoStyle === false ? { ...addStyle } : { ...getAutoStyle(), ...addStyle };
  const q = quality ? (isIntegerInRange(quality, 1, 100) ? quality : 75) : 75;

  return (
    <Image
      key={id}
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={q}
      placeholder={getShimmerPlaceHolder(width, height)}
      sizes="100%"
      style={style}
      className={className} // blog => styles["article-img"]
    />
  );
}
