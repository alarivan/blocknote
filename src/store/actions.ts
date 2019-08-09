export const EMPTY_ACTION = "EMPTY_ACTION";

export type EmptyAction = { type: "EMPTY_ACTION" };

export function emptyAction(): EmptyAction {
  return { type: EMPTY_ACTION };
}
