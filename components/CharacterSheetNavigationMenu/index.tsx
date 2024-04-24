"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTriggerLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export function CharacterSheetNavigationMenu({
  gameSlug,
  characterSlug,
}: {
  gameSlug: string;
  characterSlug: string;
}) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  return (
    <NavigationMenu className="justify-start border-b max-w-none border-border">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTriggerLink asChild className="rounded-b-none">
            <Link
              href={`/game/${gameSlug}/sheet/${characterSlug}`}
              data-active={selectedLayoutSegment === null ? "" : undefined}
            >
              Übersicht
            </Link>
          </NavigationMenuTriggerLink>
          <NavigationMenuTriggerLink asChild className="rounded-b-none">
            <Link
              href={`/game/${gameSlug}/sheet/${characterSlug}/skills`}
              data-active={selectedLayoutSegment === "skills" ? "" : undefined}
            >
              Talente
            </Link>
          </NavigationMenuTriggerLink>
          <NavigationMenuTriggerLink asChild className="rounded-b-none">
            <Link
              href={`/game/${gameSlug}/sheet/${characterSlug}/combat`}
              data-active={selectedLayoutSegment === "combat" ? "" : undefined}
            >
              Kampf
            </Link>
          </NavigationMenuTriggerLink>
          <NavigationMenuTriggerLink asChild className="rounded-b-none">
            <Link
              href={`/game/${gameSlug}/sheet/${characterSlug}/magic`}
              data-active={selectedLayoutSegment === "magic" ? "" : undefined}
            >
              Magie
            </Link>
          </NavigationMenuTriggerLink>
          <NavigationMenuTriggerLink asChild className="rounded-b-none">
            <Link
              href={`/game/${gameSlug}/sheet/${characterSlug}/karma`}
              data-active={selectedLayoutSegment === "karma" ? "" : undefined}
            >
              Karma
            </Link>
          </NavigationMenuTriggerLink>
          <NavigationMenuTriggerLink asChild className="rounded-b-none">
            <Link
              href={`/game/${gameSlug}/sheet/${characterSlug}/inventory`}
              data-active={
                selectedLayoutSegment === "inventory" ? "" : undefined
              }
            >
              Inventar
            </Link>
          </NavigationMenuTriggerLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
