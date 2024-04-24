"use client";

import { Character, Game } from "@/supabase/schema";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { Combobox, ComboboxTriggerButtonSimple } from "../Combobox";
import { ReactNode } from "react";

export function ComboboxGameCharactersClient({
  options,
  currentGameId,
  currentCharacterId,
}: {
  options: { value: number; label: ReactNode }[];
  currentGameId: Game["id"];
  currentCharacterId: Character["id"];
}) {
  const { push } = useRouter();
  const selectedLayoutSegment = useSelectedLayoutSegment();

  return (
    <Combobox
      options={options}
      value={currentCharacterId}
      onSelect={(selectedCharacterId) => {
        push(
          `/game/${currentGameId}/sheet/${selectedCharacterId}` +
            (selectedLayoutSegment ? `/${selectedLayoutSegment}` : "")
        );
      }}
      empty="Kein Character gefunden"
      inputPlaceholder="Character suchen…"
    >
      <ComboboxTriggerButtonSimple aria-label="Character auswählen" />
    </Combobox>
  );
}
