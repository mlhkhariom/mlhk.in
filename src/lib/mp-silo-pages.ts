import { MP_SILO_INDORE_MALWA } from "./mp-silo-indore-malwa";
import { MP_SILO_CIRCUITS } from "./mp-silo-mp-circuits";
import type { MpSiloPageData } from "./mp-silo-types";

export * from "./mp-silo-types";

export const ALL_MP_SILO_PAGES: readonly MpSiloPageData[] = [
  ...MP_SILO_INDORE_MALWA,
  ...MP_SILO_CIRCUITS,
];

const MP_SILO_BY_PATH = new Map<string, MpSiloPageData>(
  ALL_MP_SILO_PAGES.map((page) => [page.path, page]),
);

export function getMpSiloPageOrThrow(path: string): MpSiloPageData {
  const found = MP_SILO_BY_PATH.get(path);
  if (!found) {
    throw new Error(`Unknown MP silo page path: ${path}`);
  }
  return found;
}
