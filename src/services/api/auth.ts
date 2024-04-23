import { ApiResponse } from "apisauce";
import { Api } from "./api";
import { getGeneralApiProblem } from "./api-problem";
import { LoginResult, OkResult } from "./api.types";
import { AppConfig } from "@/config";

type EmailSignIn = {
  email: string;
  password: string;
};

export class AuthApi {
  private readonly api: Api;

  constructor() {
    this.api = new Api();
  }

  async signIn(props: EmailSignIn): Promise<LoginResult> {
    console.info({ AppConfig });
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

  async signOut(): Promise<OkResult> {
    try {
      const { selfApiSauce, config } = this.api;

      const response: ApiResponse<any> = await selfApiSauce.post(
        config.signout
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
