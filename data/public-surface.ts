export function cleanPublicText(value: string) {
  return value.replaceAll(" — ", " · ").replaceAll("—", "·");
}

export function cleanPublicValue<T>(value: T): T {
  return JSON.parse(cleanPublicText(JSON.stringify(value))) as T;
}
