export type ApiConfig = typeof DEFAULT_API_CONFIG;

export const DEFAULT_API_CONFIG = {
  // * Auth
  signin: "auth/login",
  signout: "auth/logout",
  profile: "auth/profile",
};
