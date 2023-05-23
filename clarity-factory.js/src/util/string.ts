export function toCamelCase(str: string) {
  return str
    .split(" ")
    .map((e, i) =>
      i ? e.charAt(0).toUpperCase() + e.slice(1).toLowerCase() : e.toLowerCase()
    )
    .join("");
}
