import { toUpperSnake } from "./string";

export type ContractVariable = {
  name: string;
  isConst: boolean;
  canBeFrozen: boolean;
  type: string;
  initialValue: string;
};

export default function t(
  template: string,
  props: { [key: string]: string | boolean },
  options?: {
    removeUnknown?: boolean;
    variables?: ContractVariable[];
  }
) {
  let result = template;

  /* IF..ENDIF */
  const conditions = result.matchAll(
    /[ \t]*{{if (!?)([a-zA-Z-]+)}}\n([\s\S]*?\n{0,2})\s*?{{endif}}\n?/g
  );
  for (const condition of conditions) {
    const match = condition[0];
    const invert = !!condition[1];
    const conditionName = condition[2];
    const body = condition[3];
    if (
      (!invert && props[conditionName]) ||
      (invert && !props[conditionName])
    ) {
      result = result.replace(match, `${body}`);
    } else {
      result = result.replace(match, "");
    }
  }

  /* READ(var or const) */
  const variables = result.matchAll(/{{read\(([a-zA-Z-]+)\)}}/g);
  for (const variable of variables) {
    const match = variable[0];
    const varName = variable[1];

    const varSettings = options?.variables?.find((v) => v.name === varName);
    if (!varSettings) throw new Error(`Missing var/const data for ${varName}`);
    if (varSettings.isConst) {
      result = result.replace(match, toUpperSnake(varName));
    } else {
      result = result.replace(match, `(var-get ${varName})`);
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
