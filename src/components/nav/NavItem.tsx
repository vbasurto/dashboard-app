import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { type NavItem as NavItemType } from "@/types/nav";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";

interface NavItemProps {
  item: NavItemType;
}

export function NavItem({ item }: NavItemProps) {
  const location = useLocation();
  const { isCollapsed, closeSidebar } = useSidebar();
  const [isOpen, setIsOpen] = useState(() => {
    if (item.children) {
      return item.children.some((child) => child.href === location.pathname);
    }
    return false;
  });

  const isActive = item.href === location.pathname;
  const hasActiveChild = item.children?.some(
    (child) => child.href === location.pathname,
  );

  // Item con submenú
  if (item.children) {
    if (isCollapsed) {
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "w-full justify-center",
                        hasActiveChild && "bg-accent text-accent-foreground",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </Button>
                  </CollapsibleTrigger>
                </Collapsible>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex flex-col gap-1">
              <span className="font-semibold">{item.label}</span>
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  to={child.href!}
                  onClick={closeSidebar}
                  className={cn(
                    "flex items-center gap-2 rounded px-2 py-1 text-sm hover:bg-accent",
                    child.href === location.pathname && "bg-accent font-medium",
                  )}
                >
                  <child.icon className="h-4 w-4" />
                  {child.label}
                </Link>
              ))}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3",
              hasActiveChild && "bg-accent text-accent-foreground",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="flex-1 text-left">{item.label}</span>
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isOpen && "rotate-90",
              )}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1 space-y-1 pl-4">
          {item.children.map((child) => (
            <Button
              key={child.href}
              variant="ghost"
              size="sm"
              asChild
              className={cn(
                "w-full justify-start gap-3",
                child.href === location.pathname && "bg-accent font-medium",
              )}
            >
              <Link to={child.href!} onClick={closeSidebar}>
                <child.icon className="h-4 w-4" />
                <span>{child.label}</span>
              </Link>
            </Button>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  // Item simple
  const buttonContent = (
    <Button
      variant="ghost"
      size={isCollapsed ? "icon" : "default"}
      asChild
      className={cn(
        "w-full",
        isCollapsed ? "justify-center" : "justify-start gap-3",
        isActive && "bg-accent font-medium text-accent-foreground",
      )}
    >
      <Link to={item.href!} onClick={closeSidebar}>
        <item.icon className="h-5 w-5" />
        {!isCollapsed && <span>{item.label}</span>}
        {!isCollapsed && item.badge && (
          <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
            {item.badge}
          </span>
        )}
      </Link>
    </Button>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
          <TooltipContent side="right">
            <span>{item.label}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return buttonContent;
}
