export default function t(
  template: string,
  props: { [key: string]: string | boolean },
  options?: { removeUnknown: boolean }
) {
  let result = template;

  /* IF..ENDIF */
  const conditions = result.matchAll(
    /[ \t]*{{if ([a-zA-Z-]+)}}\n+(.*)\s*{{endif}}/g
  );
  for (const condition of conditions) {
    if (condition) {
      const match = condition[0];
      const conditionName = condition[1];
      const body = condition[2];
      if (props[conditionName]) {
        result = result.replace(match, `${body}`);
      } else {
        result = result.replace(match, "");
      }
    }
  }

  /* VARIABLES */
  for (const [k, v] of Object.entries(props)) {
    if (typeof v !== "string") continue;
    result = result.replace(new RegExp(`{{${k}}}`, "g"), v);
  }

  const stillHasTemplateStrings = result.match(/{{(.*)}}/g);

  if (stillHasTemplateStrings) {
    if (options?.removeUnknown) {
      result = result.replace(/{{(.*)}}/g, "");
    } else {
      const err = `missing props, found ${stillHasTemplateStrings.toString()}`;
      console.warn(err);
      // throw new Error(err);
    }
  }
  result = result.replace(/\n{3,}/g, "\n\n");

  return result;
}
