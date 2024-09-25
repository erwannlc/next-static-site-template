import { GenericMainMenuItem } from "@/types/ui-types";
import Image from "next/image";
import Link from "next/link";
import styles from "./thumbnail-menu.module.scss";

export default function ThumbnailMenu({
  menuItems,
  optClassName,
}: {
  menuItems: GenericMainMenuItem[];
  optClassName?: string;
}) {
  function getClassName() {
    let className = `${styles.menu}`;
    if (optClassName) className += ` ${optClassName}`;
    return className;
  }

  return (
    <section className={getClassName()}>
      <ul>
        {menuItems.map(item => (
          <li key={item.path}>
            <MenuItem menuItem={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function MenuItem({ menuItem }: { menuItem: GenericMainMenuItem }) {
  const { path, tooltip, title, text, itemImage } = menuItem;
  return (
    <Link href={`/${path}`}>
      <Image
        src={itemImage}
        placeholder="blur"
        style={{
          width: "100%",
          height: "auto",
        }}
        alt={tooltip}
      />
      <h1>{title ? title : text}</h1>
    </Link>
  );
}
