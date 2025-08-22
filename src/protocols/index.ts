export type CustomError = {
  type: "USER_ALREADY_EXISTS" | "VALIDATION_ERROR" | "NOT_FOUND" | "UNAUTHORIZED" | "BAD_REQUEST";
  message: string;
}

export type AuthenticatedRequest = Request & {
  userId?: number;
};