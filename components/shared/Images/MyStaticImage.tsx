import Image, { StaticImageData } from "next/image";
import { CSSProperties } from "react";

export interface StaticImage {
  image: StaticImageData;
  alt: string;
  optStyle?: {
    fullSize?: boolean;
    heightAuto?: boolean;
  };
}

export default function MyStaticImage({ staticImage }: { staticImage: StaticImage }) {
  const { image, alt, optStyle } = staticImage;
  const customStyle: CSSProperties = {
    width: "",
    height: "",
  };
  if (optStyle) {
    const { fullSize, heightAuto } = optStyle;
    customStyle.width = fullSize || heightAuto ? "100%" : "";
    customStyle.height = fullSize ? (heightAuto ? "100%" : "auto") : "";
  }

  return <Image src={image} alt={alt} placeholder="blur" style={customStyle} />;
}
