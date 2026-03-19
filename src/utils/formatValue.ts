export const formatValue = (value: number, type?: string) => {
  if (value === null || value === undefined) return "-";

  // ✅ Percentage
  if (type === "percentage") {
    return `${value}%`;
  }

  // ✅ Currency (₹ with K, M, B)
  if (type === "currency") {
    if (value >= 1_000_000_000) return `₹${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `₹${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `₹${(value / 1_000).toFixed(0)}K`;
    return `₹${value}`;
  }

  // ✅ Default
  return value;
};