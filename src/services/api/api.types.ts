import { Employee, Presence, PresenceTime, Profile, UserLevel } from "@/types";
import { GeneralApiProblem } from "./api-problem";

export type OkResult = { kind: "ok" } | GeneralApiProblem;

export type LoginResult =
  | {
      kind: "ok";
      data: {
        access_token: string;
        level: UserLevel;
        user_id: string;
        email: string;
        name: string;
      };
    }
  | GeneralApiProblem;

export type ProfileResult =
  | {
      kind: "ok";
      data: Profile;
    }
  | GeneralApiProblem;

export type LastPresenceResult =
  | {
      kind: "ok";
      data: PresenceTime;
    }
  | GeneralApiProblem;

export type PresencesResult =
  | {
      kind: "ok";
      data: Array<Presence>;
    }
  | GeneralApiProblem;

export type EmployeesResult =
  | {
      kind: "ok";
      data: Array<Employee>;
    }
  | GeneralApiProblem;

export type EmployeeResult =
  | {
      kind: "ok";
      data: Employee;
    }
  | GeneralApiProblem;
