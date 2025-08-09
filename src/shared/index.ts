export type ActionBasicResponse<T = unknown> =
  | { success: true; data?: T }
  | { success: false; error?: string };
