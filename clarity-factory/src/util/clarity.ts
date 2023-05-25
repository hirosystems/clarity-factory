export function getClarityValue(type: string, value: number | string) {
  if (type === "principal") {
    if (value === "tx-sender") return value;
    return `'${value}`;
  }
  if (type === "uint") {
    return `u${value}`;
  }
  if (type.startsWith("(string-utf8")) {
    return `u"${value}"`;
  }
  if (type.startsWith("(string-ascii")) {
    return `"${value}"`;
  }
  throw new Error(`Invalid type ${type}`);
}
