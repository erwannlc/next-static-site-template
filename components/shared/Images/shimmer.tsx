// eslint-disable-next-line max-len
/** @see: https://github.com/vercel/next.js/blob/canary/examples/image-component/pages/shimmer.tsx */

const color1 = "#EEEEEE";
const color2 = "#E5E5E5";
const colorLightest = "#EEEEEE";
const colorMedium = "#CCCCCC";
const colorDarkest = "#BBBBBB";
const shimmer = (w: number, h: number) => `
  <svg 
  width="${w}" 
  height="${h}" 
  version="1.1" 
  xmlns="http://www.w3.org/2000/svg" 
  xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="${color1}" offset="20%" />
        <stop stop-color="${color2}" offset="50%" />
        <stop stop-color="${color1}" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="${color1}" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate 
    xlink:href="#r" 
    attributeName="x" 
    from="-${w}" to="${w}" 
    dur="1s" 
    repeatCount="indefinite"  />
  </svg>`;

const anotherShimmer = (w: number, h: number) => `
<svg xmlns="http://www.w3.org/2000/svg">

 <defs>
    <linearGradient id="myGradient" gradientTransform="rotate(20)">
      <stop offset="5%"  stop-color="#eee">
        <animate 
        attributeName="stop-color" 
        values="${colorLightest}; ${colorMedium}; ${colorLightest}" 
        dur="2s" 
        repeatCount="indefinite"></animate>
      </stop>
      <stop offset="95%" stop-color="#aaa">
        <animate 
        attributeName="stop-color" 
        values="${colorLightest}; ${colorDarkest}; ${colorLightest}" 
        dur="3s" 
        repeatCount="indefinite"></animate>
      </stop>
    </linearGradient>
  </defs>
  <rect fill="url(#myGradient)" width="${w}" height="${h}" fill-opacity="40%"/>  
</svg>
`;

const toBase64 = (str: string) =>
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str);

export function getShimmerPlaceHolder(width: number, height: number): `data:image/${string}` {
  // return data:image... as an <img> src
  return `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`;
}

export default shimmer;
