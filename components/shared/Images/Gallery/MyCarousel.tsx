"use client";
import type { ImageDataType } from "@/types/image-types";

import styles from "./mycarousel.module.scss";

import MyIcon from "@/components/shared/Icon";
import { ChevronLeft, ChevronRight } from "@/assets/icons";
import CounterBullets from "./CounterBullets";
import useMyCarousel from "@/utils/hooks/useMyCarousel";
import MyImage from "../MyImage";

interface Props {
  images: ImageDataType[];
  className: string;
}

export default function MyCarousel({ images, className }: Props) {
  const isMultipleImages = images.length > 1;
  const { actualIndex, prevImage, nextImage, goTo } = useMyCarousel(images.length);

  const isActive = (i: number): boolean => actualIndex === i;
  return (
    <section className={className}>
      <MyImage
        key={images[actualIndex].id}
        image={images[actualIndex]}
        addStyle={{ width: "100%", height: "auto" }}
        autoStyle={false}
        quality={100}
      />

      {isMultipleImages && (
        <>
          <button type="button" onClick={prevImage} className={`${styles.prev} ${styles.navigate}`}>
            <MyIcon>
              <ChevronLeft />
            </MyIcon>
          </button>
          <button type="button" onClick={nextImage} className={`${styles.next} ${styles.navigate}`}>
            <MyIcon>
              <ChevronRight />
            </MyIcon>
          </button>
          {
            <div className={styles.bullets}>
              {images.map((_, i) => (
                <CounterBullets isActive={isActive(i)} onClick={() => goTo(i)} key={i} />
              ))}
            </div>
          }
        </>
      )}
    </section>
  );
}
