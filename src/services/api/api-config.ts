export type ApiConfig = typeof DEFAULT_API_CONFIG;

const authPrefix = "auth";
const presencePrefix = "presences";
const employeePrefix = "employees";

export const DEFAULT_API_CONFIG = {
  // * Auth
  signin: `${authPrefix}/login`,
  signout: `${authPrefix}/logout`,
  profile: `${authPrefix}/profile`,

  // * Employee
  employees: (employeeId?: string) =>
    `${employeePrefix}${employeeId && "/" + employeeId}`,

  // * Presence
  presence: presencePrefix,
  presences: (employeeId?: string) =>
    `${presencePrefix}${employeeId ? "/" + employeeId : ""}`,
  lastPresence: (employeeId: string) =>
    `${presencePrefix}/${employeeId}/status`,
};
