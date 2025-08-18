export type UserData = {
    name: string;
    email: string;
    password: string
}

export type CustomError = {
  type: "USER_ALREADY_EXISTS" | "VALIDATION_ERROR" | "NOT_FOUND" | "UNAUTHORIZED" | "BAD_REQUEST";
  message: string;
}

export type CredentialData = {
  title: string;
  username: string;
  password: string;
  url: string; 
};