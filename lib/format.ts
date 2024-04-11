export function formatNumberAsModifier(value: number | `*${number}`) {
  return typeof value === "number" && value > 0 ? `+${value}` : `${value}`;
}
