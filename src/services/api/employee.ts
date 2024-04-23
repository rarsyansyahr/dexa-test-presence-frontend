import { ApiResponse } from "apisauce";
import { Api } from "./api";
import { getGeneralApiProblem } from "./api-problem";
import { EmployeesResult, LoginResult } from "./api.types";
import { LoginProps, UpdateEmployeeProps } from "@/types";

export class EmployeeApi {
  private readonly api: Api;

  constructor() {
    this.api = new Api();
  }

  async getAll(): Promise<EmployeesResult> {
    try {
      const { selfApiSauce, config } = this.api;

      const response: ApiResponse<any> = await selfApiSauce.get(
        config.employees()
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

  async update(props?: UpdateEmployeeProps): Promise<LoginResult> {
    try {
      const { selfApiSauce, config } = this.api;

      const response: ApiResponse<any> = await selfApiSauce.put(
        config.employees(props?.id),
        props
      );

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const { data } = response;

      return { kind: "ok", data };
    } catch (error) {
      console.error(error);
      return { kind: "bad-data" };
    }
  }
}
