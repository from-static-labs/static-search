import _STATIC from "../../static.json";
import { get } from "lodash";

import type { GMetaResult } from "static-search/pages";

export const STATIC = _STATIC;

const FIELD_LOOKUPS = {
  result: {
    identifier:
      "identifier" in STATIC.contents.result
        ? STATIC.contents.result.identifier
        : "subject",
    title:
      "title" in STATIC.contents.result
        ? STATIC.contents.result.title
        : "subject",
    summary:
      "summary" in STATIC.contents.result
        ? STATIC.contents.result.summary
        : null,
  },
};

export function getStaticField(result: GMetaResult, field: string) {
  console.log(result, field, get(FIELD_LOOKUPS, field));
  return get(result, get(FIELD_LOOKUPS, field));
}
