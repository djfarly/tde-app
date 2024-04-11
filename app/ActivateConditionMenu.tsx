import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConditionId, conditions } from "@/lib/skills";

const locale = "de";

export function ActivateConditionMenu({
  conditionIds,
  onActivate,
}: {
  conditionIds: ConditionId[];
  onActivate: (conditionId: ConditionId) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={conditionIds.length === 0} className="w-max">
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
              onSelect={() => onActivate(conditionId)}
            >
              <Icon className="size-5 mr-2" />
              {condition.name[locale]}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
