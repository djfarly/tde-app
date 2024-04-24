export function formatNumberAsModifier(value: number | `*${number}`) {
  return typeof value === "number" && value > 0 ? (
    `+${value}`
  ) : value === 0 ? (
    <span>
      <span className="relative">
        <span
          className="inline-block"
          style={{ transform: `translateY(-.2ex) scale(0.9)` }}
        >
          +
        </span>
        <span
          className="absolute inset-0"
          style={{
            transform: `translateY(.4ex) translateX(.05ch) scale(0.9)`,
          }}
        >
          -
        </span>
      </span>
      {value}
    </span>
  ) : (
    `${value}`
  );
}

export function formatAsPercentage(value: number) {
  return value.toLocaleString("de-DE", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
}
