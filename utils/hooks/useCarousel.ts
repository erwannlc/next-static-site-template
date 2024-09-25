import { TouchEvent, useRef, useState } from "react";


export default function useCarousel(imagesLength: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : imagesLength - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < imagesLength - 1 ? prevIndex + 1 : 0));
  };
  const goTo = (i: number) => {
    setCurrentIndex(i);
  };
  const isActive = (i: number): boolean => (currentIndex === i);

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
        handlePrev();
      } else if (deltaX < -12) {
        // Swipe left
        handleNext();
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
    currentIndex,
    handleNext,
    handlePrev,
    goTo,
    isActive,
    useCarouselTouch
  };
}

// export function useCarouselTouch () {
//   const touchStartX = useRef<number | null>(null);

//   const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
//     if (touchStartX.current === null) return;

//     const touchCurrentX = e.touches[0].clientX;
//     const deltaX = touchCurrentX - touchStartX.current;
//     if (deltaX > 10) {
//       // Swipe right
//       handleNext();
//     } else if (deltaX < -10) {
//       // Swipe left
//       handlePrev();
//     }

//     // Reset touchStartX to null after processing the swipe
//     touchStartX.current = null;
//   };
// }