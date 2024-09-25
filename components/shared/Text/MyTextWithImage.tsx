import MyStaticImage, { StaticImage } from "../Images/MyStaticImage";
import MyText, { MyTextType } from "./MyText";


interface Props {
  text: MyTextType
  staticImage: StaticImage,   
  className: string
  addTextClassName?: string
}

export default function MyTextWithImage ({ 
  text, 
  staticImage, 
  className,
  addTextClassName
 }: Props) {
  return (
    <div className={className}>
      <MyStaticImage staticImage={staticImage} />
      <MyText text={text} addClassName={addTextClassName} withTitle/>
    </div>
  );
}