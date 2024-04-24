"use client";

import { Game } from "@/supabase/schema";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Combobox, ComboboxTriggerButtonSimple } from "../Combobox";

export function ComboboxMyGameParticipationsClient({
  options,
  currentGameId,
}: {
  options: { value: number; label: ReactNode }[];
  currentGameId: Game["id"];
}) {
  const { push } = useRouter();
  return (
    <Combobox
      options={options}
      value={currentGameId}
      onSelect={(gameId) => {
        push(`/game/${gameId}`);
      }}
      empty="Kein Spiel gefunden"
      inputPlaceholder="Spiel suchen…"
    >
      <ComboboxTriggerButtonSimple aria-label="Spiel auswählen" />
    </Combobox>
  );
}
