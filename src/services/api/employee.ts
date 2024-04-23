import { ApiResponse } from "apisauce";
import { Api } from "./api";
import { getGeneralApiProblem } from "./api-problem";
import { LoginResult, OkResult } from "./api.types";
import { AppConfig } from "@/config";
import { LoginProps } from "@/types";

export class AuthApi {
  private readonly api: Api;

  constructor() {
    this.api = new Api();
  }

  async signIn(props: LoginProps): Promise<LoginResult> {
    try {
      const { selfApiSauce, config } = this.api;

      const response: ApiResponse<any> = await selfApiSauce.post(
        config.signin,
        props
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
}
