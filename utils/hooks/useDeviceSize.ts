import { useEffect, useRef, useState } from "react";

export const useDeviceSize = () => {

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    // component is mounted and window is available
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    // unsubscribe from the event on component unmount
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return [width, height];

};

export function useDeviceWidthSize() {
  const [width, setWidth] = useState(0);
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    // component is mounted and window is available
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    // unsubscribe from the event on component unmount
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return [width];
};

export function useComponentSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    function handleWindowResize() {
      if (ref.current) {
        const { clientWidth, clientHeight } = ref.current;
        // const { offsetWidth, offsetHeight } = ref.current;
        setSize({ width: clientWidth, height: clientHeight });
      }
    };
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { ref: ref, width: size.width, height: size.height };
};


export function useTextAreaRows(paddingX?: number) {
  const [rowsDivider, setRowsDivider] = useState(60);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    function handleWindowResize() {
      if (textAreaRef.current) {
        const { clientWidth } = textAreaRef.current;
        const divider = Math.floor((clientWidth - ((paddingX || 16) * 2)) / 8);
        setRowsDivider(divider);
      }
    };
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, [paddingX]);

  return { ref: textAreaRef, rowsDivider: rowsDivider };
};



// export function useRowsDivider() {
//   const [rowsDivider, setRowsDivider] = useState(60);
//   function getAdaptedRowsDivider(width: number): number {
//     switch (true) {
//       case (width >= 1060): {
//         return 60;
//       }
//       case (width > 915 && width < 1060): {
//         return 40;
//       }
//       case (width <= 915): {
//         return 30;
//       }
//       default:
//         return 60;
//     }
//   }
//   useEffect(() => {
//     // component is mounted and window is available
//     function handleWindowResize() {
//       const adaptedRowsDivider = getAdaptedRowsDivider(window.innerWidth);
//       setRowsDivider(adaptedRowsDivider);
//     };
//     handleWindowResize();
//     window.addEventListener("resize", handleWindowResize);
//     // unsubscribe from the event on component unmount
//     return () => window.removeEventListener("resize", handleWindowResize);
//   }, []);

//   return [rowsDivider];
// };