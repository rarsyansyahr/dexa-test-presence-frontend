import { UserLevel } from "@/types";
import { GeneralApiProblem } from "./api-problem";

export type OkResult =
  | { kind: "ok"; data: { message: string } }
  | GeneralApiProblem;

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
