import { ApisauceInstance, create } from "apisauce";
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config";
import { AppConfig } from "@/config";
export class Api {
  selfApiSauce: ApisauceInstance;

  config: ApiConfig;

  constructor() {
    this.config = DEFAULT_API_CONFIG;

    console.info(this.config);

    this.selfApiSauce = create({
      baseURL: AppConfig.api.baseUrl,
      timeout: AppConfig.api.httpTimeout,
      headers: {
        Accept: "application/json",
      },
    });
  }

  setup() {
    // * Setup Actions
  }
}
