import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConditionId, conditions } from "@/lib/core/conditions";

const locale = "de";

export function ConditionActivateMenu({
  conditionIds,
  onActivate,
  disabled,
}: {
  conditionIds: ConditionId[];
  onActivate?: (conditionId: ConditionId) => void;
  disabled?: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          disabled={conditionIds.length === 0 || disabled}
          className="w-max"
        >
          Zustand aktivieren
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {conditionIds.map((conditionId) => {
          const condition = conditions.find(({ id }) => id === conditionId)!;
          const Icon = condition.Icon;
          return (
            <DropdownMenuItem
              key={conditionId}
              onSelect={() => onActivate?.(conditionId)}
            >
              <Icon className="mr-2 size-5" />
              {condition.name[locale]}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
