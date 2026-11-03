export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toLocaleUpperCase("vi-VN") ?? "")
    .join("");
}

export function formatTime(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatRelativeTime(value: string): string {
  const date = new Date(value);
  const now = new Date();
  if (date.toDateString() === now.toDateString()) return formatTime(value);
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
  }).format(date);
}

export function isProfileOnline(
  isOnline: boolean,
  lastSeenAt: string,
  now = Date.now(),
): boolean {
  const age = now - new Date(lastSeenAt).getTime();
  return isOnline && age >= 0 && age < 2 * 60 * 1000;
}
