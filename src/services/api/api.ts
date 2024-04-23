import { ApisauceInstance, create } from "apisauce";
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config";
import { AppConfig } from "@/config";
import { Cookie } from "@/lib";
export class Api {
  selfApiSauce: ApisauceInstance;

  config: ApiConfig;

  constructor() {
    this.config = DEFAULT_API_CONFIG;

    this.selfApiSauce = create({
      baseURL: AppConfig.api.baseUrl,
      timeout: AppConfig.api.httpTimeout,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + Cookie.getAccessToken(),
      },
    });
  }

  setup() {
    // * Setup Actions
  }
}
