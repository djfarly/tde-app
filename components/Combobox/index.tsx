"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const ComboboxContext = React.createContext<
  | {
      value: string | number | null;
      options: {
        label: React.ReactNode;
        value: string | number | null;
      }[];
      open: boolean;
    }
  | undefined
>(undefined);

function ComboboxProvider({
  value,
  options,
  children,
  open,
}: {
  value: string | number | null;
  options: {
    label: React.ReactNode;
    value: string | number | null;
  }[];
  children: React.ReactNode;
  open: boolean;
}) {
  return (
    <ComboboxContext.Provider value={{ value, options, open }}>
      {children}
    </ComboboxContext.Provider>
  );
}

function useCombobox() {
  const context = React.useContext(ComboboxContext);

  if (!context) {
    throw new Error("useCombobox must be used within a ComboboxProvider");
  }

  return context;
}

export const ComboboxTrigger = PopoverTrigger;

export function ComboboxTriggerButton({
  noValue = "Select option...",
}: {
  noValue?: React.ReactNode;
}) {
  const { value, options, open } = useCombobox();
  return (
    <ComboboxTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-[200px] justify-between"
      >
        {value
          ? options.find((option) => option.value === value)?.label
          : noValue}
        <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
      </Button>
    </ComboboxTrigger>
  );
}

export function ComboboxTriggerButtonSimple({
  children,
  ...props
}: ButtonProps) {
  const { open } = useCombobox();
  return (
    <ComboboxTrigger asChild>
      <Button
        variant="ghost"
        role="combobox"
        aspect="narrow"
        size="sm"
        {...props}
        aria-expanded={open}
      >
        {children ?? <ChevronsUpDown className="size-4" />}
      </Button>
    </ComboboxTrigger>
  );
}

export function Combobox<
  TOptions extends {
    label: React.ReactNode;
    value: string | number | null;
  }[]
>({
  options,
  value,
  onSelect,
  children,
  empty = "No option found.",
  inputPlaceholder = "Search option…",
}: {
  options: TOptions;
  value?: NoInfer<TOptions[number]["value"]>;
  onSelect: (
    value: NoInfer<TOptions[number]["value"]>,
    close: () => void
  ) => void;
  children?: React.ReactNode;
  empty?: React.ReactNode;
  inputPlaceholder?: string;
}) {
  const [open, setOpen] = React.useState(false);

  const close = () => setOpen(false);

  return (
    <ComboboxProvider value={value ?? null} options={options} open={open}>
      <Popover open={open} onOpenChange={setOpen}>
        {children}
        <PopoverContent className="p-0 w-max">
          <Command>
            <CommandInput placeholder={inputPlaceholder} />
            <CommandEmpty>{empty}</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      onSelect(option.value, close);
                    }}
                    className="justify-between"
                  >
                    <div className="flex items-center">{option.label}</div>
                    <Check
                      className={cn(
                        "ml-2 size-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </ComboboxProvider>
  );
}
