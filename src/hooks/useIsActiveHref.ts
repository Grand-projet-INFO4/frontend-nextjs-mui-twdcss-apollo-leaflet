import { usePathname } from "next/navigation";
import { UrlObject } from "url";

export type UseIsActiveHrefParams = {
  href: string | UrlObject;
  strict?: boolean;
};

/**
 * Verifies whether an href value is active on the current pathname
 */
export default function useIsActiveHref({ href, strict = false }: UseIsActiveHrefParams) {
  const pathname = usePathname();

  const hrefString = href.toString();
  const hrefWithoutSearch = hrefString.replace(/(\?.*)$/, "");

  const isActive =
    strict || pathname === "/"
      ? hrefWithoutSearch === pathname
      : hrefWithoutSearch.startsWith(pathname ?? "");

  return isActive;
}
