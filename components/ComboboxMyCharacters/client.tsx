"use client";

import { Character, Game } from "@/supabase/schema";
import { ArrowRightLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Combobox, ComboboxTrigger } from "../Combobox";
import { Button } from "../ui/button";

export function ComboboxMyCharactersClient({
  options,
  activeCharacterId,
  currentGameId,
  onSetActiveCharacter,
  children,
}: {
  options: { value: number | null; label: ReactNode }[];
  activeCharacterId?: Character["id"];
  currentGameId: Game["id"];
  onSetActiveCharacter?: (
    currentGameId: Game["id"],
    selectedCharacterId: Character["id"] | null
  ) => Promise<unknown>;
  children?: ReactNode;
}) {
  const router = useRouter();

  return (
    <Combobox
      options={options}
      value={activeCharacterId}
      onSelect={async (selectedCharacterId, close) => {
        await onSetActiveCharacter?.(currentGameId, selectedCharacterId);
        close();
        router.refresh();
      }}
      empty="Kein Character gefunden"
      inputPlaceholder="Character suchen…"
    >
      {children ?? (
        <ComboboxTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            aspect="square"
            tooltip="Anderen Character wählen"
          >
            <ArrowRightLeft className="size-4" />
          </Button>
        </ComboboxTrigger>
      )}
    </Combobox>
  );
}
