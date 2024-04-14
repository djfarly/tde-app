"use client";

import Chat from "@/components/Chat";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollBar,
} from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLogs } from "@/lib/log";
import {
  LifeBuoy,
  PersonStanding,
  Rainbow,
  ScrollText,
  SquareUser,
  Swords,
  Triangle,
  Wand,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Sheet } from "./Sheet";

const locale = "de";

export default function Dashboard() {
  const { addLogEntry, logs } = useLogs();

  const chatlog = useRef<HTMLDivElement>(null);

  return (
    <div className="grid h-screen w-full pl-[56px] [--header-height:57px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Character"
              >
                <PersonStanding className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Character
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg bg-muted"
                aria-label="Fähigkeiten"
              >
                <ScrollText className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Fähigkeiten
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Kampf"
              >
                <Swords className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Kampf
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Magie"
              >
                <Wand className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Magie
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Götterwirken"
              >
                <Rainbow className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Götterwirken
            </TooltipContent>
          </Tooltip>
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Help"
              >
                <LifeBuoy className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Help
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Account"
              >
                <SquareUser className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Account
            </TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[--header-height] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/H_1703068595667">
                      Raffaella &quot;Faffi&quot; Ferrera Roché
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Fähigkeiten</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <ScrollText className="size-5" />
                <span className="sr-only">Fähigkeiten</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Fähigkeiten</DrawerTitle>
                <DrawerDescription>
                  Wähle eine Fähigkeit aus, um eine Probe zu machen.
                </DrawerDescription>
              </DrawerHeader>
              <Sheet onAddLogEntry={addLogEntry} />
            </DrawerContent>
          </Drawer>
          {/* <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            <Share className="size-3.5" />
            Share
          </Button> */}
        </header>
        <main className="grid flex-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 max-h-[calc(100svh-var(--header-height))] overflow-y-clip *:min-h-0">
          <ScrollArea className="w-full h-full relative hidden md:block lg:col-span-2">
            <ScrollAreaViewport className="flex-col items-start gap-8 flex">
              <Sheet onAddLogEntry={addLogEntry} />
            </ScrollAreaViewport>
            <ScrollBar />
          </ScrollArea>
          <Chat logEntries={logs} onAddLogEntry={addLogEntry} />
        </main>
      </div>
    </div>
  );
}
