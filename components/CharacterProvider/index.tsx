"use client";

import { Character } from "@/supabase/schema";
import { createContext, useContext } from "react";

const CharacterContext = createContext<Character | null>(null);

export function useCharacter() {
  const character = useContext(CharacterContext);

  if (!character) {
    throw new Error("CharacterContext not provided");
  }

  return character;
}

export function CharacterProvider({
  character,
  children,
}: {
  character: Character;
  children: React.ReactNode;
}) {
  return (
    <CharacterContext.Provider value={character}>
      {children}
    </CharacterContext.Provider>
  );
}
