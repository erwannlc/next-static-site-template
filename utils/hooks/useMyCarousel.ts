"use client";
import { TouchEvent, useRef, useState } from "react";


export default function useMyCarousel(imagesLength: number) {
  const [actualIndex, setActualIndex] = useState(0);
  const maxIndex = imagesLength - 1;

  function getForwardIndex(index: number) {
    const fordwardIndex = index + 1;
    return fordwardIndex > maxIndex ? 0 : fordwardIndex;
  }
  function getBackwardIndex(index: number) {
    const backwardIndex = index - 1;
    return backwardIndex < 0 ? maxIndex : backwardIndex;
  }
  function nextImage() {
    setActualIndex(index => getForwardIndex(index));
  }
  function prevImage() {
    setActualIndex(index => getBackwardIndex(index));
  }
  // const isActive = (i: number): boolean => (actualIndex === i);
  const goTo = (i: number) => {
    setActualIndex(i);
  };

  function useCarouselTouch() {
    const touchStartX = useRef<number | null>(null);

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
      if (touchStartX.current === null) return;

      const touchCurrentX = e.touches[0].clientX;
      const deltaX = touchCurrentX - touchStartX.current;
      if (deltaX > 12) {
        // Swipe right
        prevImage();
      } else if (deltaX < -12) {
        // Swipe left
        nextImage();
      }

      // Reset touchStartX to null after processing the swipe
      touchStartX.current = null;
    };

    return {
      handleTouchStart,
      handleTouchMove
    };
  }

  return {
    actualIndex,
    prevImage,
    nextImage,
    goTo,
    // isActive,
    useCarouselTouch
  };
}