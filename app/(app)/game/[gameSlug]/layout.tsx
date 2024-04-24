import Chat from "@/components/Chat";
import { ComboboxMyGameParticipations } from "@/components/ComboboxMyGameParticipations";
import GameAvatar from "@/components/GameAvatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button, LinkButton } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  findDemoUser,
  findGame,
  findGameMessages,
  findMyGameParticipation,
  insertMessage,
} from "@/services";
import { MessageInsert } from "@/supabase/schema";
import {
  LifeBuoy,
  NotebookTabs,
  PersonStanding,
  SquareUser,
  Triangle,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default async function GameLayout({
  children,
  breadcrumb,
  params: { gameSlug },
}: {
  children: ReactNode;
  breadcrumb: ReactNode;
  params: { gameSlug: string };
}) {
  const user = await findDemoUser();
  const game = await findGame(Number.parseInt(gameSlug, 10));

  const initialMessages = await findGameMessages({
    gameId: Number.parseInt(gameSlug, 10),
  });

  async function addMessage(message: MessageInsert) {
    "use server";

    await insertMessage(message);
  }

  return (
    <div className="grid h-screen w-full pl-16 [--header-height:64px]">
      <aside className="fixed left-0 z-50 flex flex-col h-full border-r inset-y">
        <div className="p-2 -mt-px border-b">
          <Button variant="outline" aspect="square" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <LinkButton
            href={`/game/${gameSlug}`}
            aria-label="Spielübersicht"
            tooltip="Spielübersicht"
            variant="ghost"
            aspect="square"
            TooltipContentProps={{ side: "right" }}
          >
            <NotebookTabs className="size-5" />
          </LinkButton>
          <LinkButton
            href={`/game/${gameSlug}/sheet`}
            aria-label={`Characterbogen`}
            tooltip={`Characterbogen`}
            variant="ghost"
            aspect="square"
            TooltipContentProps={{ side: "right" }}
          >
            <PersonStanding className="size-5" />
          </LinkButton>
        </nav>
        <nav className="grid gap-1 p-2 mt-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                aspect="square"
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
                aspect="square"
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
        <header className="sticky top-0 z-40 flex h-[--header-height] items-center gap-1 border-b bg-background px-6">
          <h1 className="text-xl font-semibold">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={`/game/${gameSlug}`}
                      className="flex items-center"
                    >
                      <GameAvatar
                        gameId={game?.id}
                        gameName={game?.name}
                        className="mr-2"
                      />
                      {game?.name}
                    </Link>
                  </BreadcrumbLink>
                  <ComboboxMyGameParticipations
                    currentGameId={Number.parseInt(gameSlug)}
                  />
                  {/* <Button variant="ghost" aspect="narrow" size="sm">
                    <ChevronsUpDown className="size-4" />
                  </Button> */}
                </BreadcrumbItem>

                {breadcrumb}
              </BreadcrumbList>
            </Breadcrumb>
          </h1>
          {/* <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" aspect="square" className="md:hidden">
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
          </Drawer>  max- overflow-y-clip */}
        </header>
        <div className="grid flex-1 md:grid-cols-2 lg:grid-cols-3 *:min-h-0">
          <div className="relative hidden w-full h-full p-6 md:block lg:col-span-2">
            {children}
          </div>
          <div className="relative w-full">
            <div className="sticky top-[var(--header-height)] left-0 w-full h-[calc(100svh-var(--header-height))]">
              <Chat
                messages={initialMessages}
                currentUserId={user.id}
                gameId={Number.parseInt(gameSlug, 10)}
                onAddMessage={addMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
