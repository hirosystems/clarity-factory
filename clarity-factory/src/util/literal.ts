export function getProp<T>(
  input: { [key: string]: any },
  propPath: string[]
): T | null {
  if (propPath.length === 1) return input[propPath[0]];

  const [first, ...newPath] = propPath;
  if (!input.hasOwnProperty(first)) return null;

  return getProp(input[first], newPath);
}
