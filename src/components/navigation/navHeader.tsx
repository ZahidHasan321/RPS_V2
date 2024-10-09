import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { createLink, Link } from "@tanstack/react-router";
import { LogOutIcon } from "lucide-react";

import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function NavHeader({ logout }: { logout: () => Promise<void> }) {
  return (
    <div className=" flex justify-end  top-0 z-50 border-b">
      <TooltipProvider>
        <NavigationMenu className="mx-4 my-2">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationLink
                title="Dashboard"
                to="/"
                className="flex items-center gap-2"
              />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-bold">
                History
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[100px] gap-3 p-4 md:w-[200px] md:grid-cols-1 lg:w-[250px]">
                  <li>
                    <NavigationLink to="/exam/all-exams" title="Exams">
                      List of all conducted exams
                    </NavigationLink>
                  </li>
                  <li>
                    <NavigationLink to="/examiner/all-papers" title="Papers">
                      List of all assigned papers
                    </NavigationLink>
                  </li>
                  <li>
                    <NavigationLink to="/catm/all-catms" title="Catms">
                      List of all assigned classes
                    </NavigationLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" onClick={logout}>
                    <LogOutIcon color="red" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </TooltipProvider>
    </div>
  );
}

const NavigationLink = createLink(
  React.forwardRef(
    (
      {
        className, // Destructure className from props
        title,
        children,
        ...props // Capture the rest of the props
      }: { className?: string; title?: string; children?: React.ReactNode },
      ref: React.ForwardedRef<HTMLAnchorElement>,
    ) => {
      return (
        <Link
          {...props}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          preload="intent"
        >
          <div className="text-sm font-bold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      );
    },
  ),
);
