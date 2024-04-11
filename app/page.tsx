"use client";

import { Badge } from "@/components/ui/badge";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLogs } from "@/lib/log";
import {
  Bird,
  CornerDownLeft,
  LifeBuoy,
  List,
  Mic,
  Paperclip,
  PersonStanding,
  Rabbit,
  Rainbow,
  ScrollText,
  Settings,
  Share,
  SquareUser,
  Swords,
  Triangle,
  Turtle,
  Wand,
} from "lucide-react";
import Link from "next/link";
import { Sheet } from "./Sheet";
import { attributes, skills } from "@/lib/skills";
import { IconD20 } from "./IconD20";
import { Attributes } from "./Attribute";

const locale = "de";

export default function Dashboard() {
  const { addLogEntry, logs } = useLogs();

  console.log(logs);

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
        <main className="grid flex-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
          <ScrollArea
            className="w-full h-[calc(100svh-var(--header-height)-2rem)]  relative hidden md:block lg:col-span-2"
            viewPortClassName="flex-col items-start gap-8 flex"
          >
            <Sheet onAddLogEntry={addLogEntry} />
          </ScrollArea>
          <div className="">
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4">
              <Badge variant="outline" className="absolute right-3 top-3">
                Output
              </Badge>
              <div className="flex-1 py-4">
                <div className="flex flex-col items-start justify-end h-full gap-2">
                  {logs.map((log) => (
                    <div key={log.id} className="flex flex-col gap-px">
                      <div className="rounded-xl px-3 py-2 bg-white border border-border">
                        <div className="text-sm leading-6">
                          {log.type === "skillCheck" ? (
                            <>
                              <span>
                                Probe auf{" "}
                                <span className="font-semibold">
                                  {
                                    skills.find(({ id }) => id === log.skillId)!
                                      .name[locale]
                                  }
                                </span>
                              </span>
                              <div className="flex gap-px">
                                <IconD20
                                  side={log.rolls[0]}
                                  attributeId={
                                    skills.find(({ id }) => id === log.skillId)!
                                      .attributes[0]
                                  }
                                />
                                <IconD20
                                  side={log.rolls[1]}
                                  attributeId={
                                    skills.find(({ id }) => id === log.skillId)!
                                      .attributes[1]
                                  }
                                />
                                <IconD20
                                  side={log.rolls[2]}
                                  attributeId={
                                    skills.find(({ id }) => id === log.skillId)!
                                      .attributes[2]
                                  }
                                />
                              </div>
                              <div>
                                <Attributes
                                  attributes={
                                    skills.find(({ id }) => id === log.skillId)!
                                      .attributes
                                  }
                                />
                              </div>
                              {log.result.type === "success" ? (
                                <span className="text-xs">
                                  Peter hat eine Probe auf{" "}
                                  {
                                    skills.find(({ id }) => id === log.skillId)!
                                      .name[locale]
                                  }{" "}
                                  mit QS {log.result.qualityLevel} bestanden.
                                </span>
                              ) : (
                                <span className="text-xs">
                                  Peter hat eine Probe auf{" "}
                                  {
                                    skills.find(({ id }) => id === log.skillId)!
                                      .name[locale]
                                  }{" "}
                                  nicht bestanden.
                                </span>
                              )}
                            </>
                          ) : (
                            log.message
                          )}
                        </div>
                      </div>
                      <div className="text-xs px-3 text-muted-foreground">
                        {log.createdAt.toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <form
                className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                x-chunk="dashboard-03-chunk-1"
              >
                <Label htmlFor="message" className="sr-only">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                />
                <div className="flex items-center p-3 pt-0">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="size-4" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Mic className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Use Microphone</TooltipContent>
                  </Tooltip>
                  <Button type="submit" size="sm" className="ml-auto gap-1.5">
                    Send Message
                    <CornerDownLeft className="size-3.5" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
