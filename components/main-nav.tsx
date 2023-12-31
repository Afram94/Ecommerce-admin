"use client"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"
import Link from "next/link";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.sotreId}/settings`,
      label: 'Settings',
      active: pathName === `/${params.sotreId}/settings`,
    }
  ];
    return (
        <nav
          className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        >
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-black dark:text-white" : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
    )
}