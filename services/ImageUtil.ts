export function getTokenAvatarText(name: string): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  let text = "";
  if (parts[0]) text += parts[0][0];
  if (parts[1]) text += parts[1][0];
  const numberMatch = name.match(/\d+/);
  if (numberMatch) text += numberMatch[0];
  return text.toUpperCase();
}
export function getAvatarColor(seed: string) {
  const colors = ["#22c55e", "#3b82f6", "#a855f7", "#f97316", "#ef4444"];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}
