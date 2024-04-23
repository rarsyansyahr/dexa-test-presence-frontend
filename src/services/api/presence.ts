import { ApiResponse } from "apisauce";
import { Api } from "./api";
import { getGeneralApiProblem } from "./api-problem";
import {
  LastPresenceResult,
  LoginResult,
  OkResult,
  PresencesResult,
} from "./api.types";
import { GetPresencesProps, PresenceStatus } from "@/types";

export class PresenceApi {
  private readonly api: Api;

  constructor() {
    this.api = new Api();
  }

  async getLastPresence(employeeId: string): Promise<LastPresenceResult> {
    try {
      const { selfApiSauce, config } = this.api;

      const response: ApiResponse<any> = await selfApiSauce.get(
        config.lastPresence(employeeId)
      );

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      if (response.status === 404) return { kind: "not-found" };

      const { data } = response;

      return { kind: "ok", data };
    } catch (error) {
      console.error(error);
      return { kind: "bad-data" };
    }
  }

  async getAll(props?: GetPresencesProps): Promise<PresencesResult> {
    try {
      const { selfApiSauce, config } = this.api;
      const employeeId = props?.employeeId;
      const started_at = props?.started_at;
      const ended_at = props?.ended_at;

      const response: ApiResponse<any> = await selfApiSauce.get(
        // @ts-ignore
        config.presences(employeeId),
        { started_at, ended_at }
      );

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      if (response.status === 404) return { kind: "not-found" };

      const { data } = response;

      return { kind: "ok", data };
    } catch (error) {
      console.error(error);
      return { kind: "bad-data" };
    }
  }

  async presence(status: PresenceStatus): Promise<OkResult> {
    try {
      const { selfApiSauce, config } = this.api;

      const response: ApiResponse<any> = await selfApiSauce.post(
        config.presence,
        { status }
      );

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const { data } = response;

      return { kind: "ok" };
    } catch (error) {
      console.error(error);
      return { kind: "bad-data" };
    }
  }
}
