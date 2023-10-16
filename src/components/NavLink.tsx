"use client";

import Link, { type LinkProps } from "next/link";

import useIsActiveHref from "@/hooks/useIsActiveHref";
import { cn } from "@/lib/utils";

export type NavLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps & {
    children?: React.ReactNode;
  } & React.RefAttributes<HTMLAnchorElement> & {
    activeClassName?: string;
    strict?: boolean;
  };

export default function NavLink({
  href,
  children,
  className,
  activeClassName = "active",
  strict = false,
  ...props
}: NavLinkProps) {
  const isActive = useIsActiveHref({
    href,
    strict,
  });

  return (
    <Link
      href={href}
      className={cn(className, {
        [activeClassName]: isActive,
      })}
      {...props}
    >
      {children}
    </Link>
  );
}
