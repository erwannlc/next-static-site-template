import { ImageDataType } from "@/types/image-types";
import Image from "next/image";
import { getShimmerPlaceHolder } from "../shimmer";

export default function Fill({
  images,
  cols,
  height,
  forcedWidth,
  fit,
  sameRatio,
  displayId,
}: {
  images: ImageDataType[];
  cols: number;
  height?: string;
  forcedWidth?: string;
  fit?: "contain" | "cover";
  sameRatio?: boolean;
  displayId?: boolean;
  // blurredImages?: string[]
}) {
  const getWidthPx = (): string => {
    if (forcedWidth) return forcedWidth;
    switch (cols) {
      case 1:
        return "600px";
      case 2:
        return "400px";
      case 3:
        return "300px";
      case 4:
        return "200px";
      case 5:
        return "100px";
      default:
        return "400px";
    }
  };
  const currentHeight = height || "400px";

  // sameRatio
  // ? reduce global width to respect gridGaps and photos width
  // : each image width grows (100% - gridGaps)
  const justifyContent = sameRatio ? "center" : "";
  // if (!blurredImages) return <p>404</p>;

  return (
    <div
      style={{
        display: "grid",
        gridGap: "12px",
        justifyContent,
        gridTemplateColumns: `repeat(auto-fit, minmax(${getWidthPx()}, auto))`,
      }}
    >
      {images.map((image, i) => {
        if (!image) {
          console.error("image not found, at index : ", i);
          return;
        }
        const {
          fileName,
          alt,
          id,
          imageSrc,
          metadata: { width, height },
        } = image;
        // const blurredImage = blurredImages[i];
        return (
          <div
            style={{
              position: "relative",
              height: currentHeight,
              maxWidth: "90vw",
              overflow: "hidden",
            }}
            key={id}
          >
            <Image
              alt={alt}
              src={imageSrc}
              fill
              sizes="(min-width: 808px) 50vw, 90vw"
              style={{
                objectFit: fit || "cover", // cover, contain, none
              }}
              placeholder={getShimmerPlaceHolder(width, height)}
              // placeholder="blur"
              // blurDataURL={blurredImage}
            />
            {displayId && (
              <span
                style={{
                  position: "absolute",
                  color: "white",
                  textShadow: "0 0 2px black",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "2rem",
                }}
              >
                {id.slice(13)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
