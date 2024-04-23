import { ApiResponse } from "apisauce";
import { Api } from "./api";
import { getGeneralApiProblem } from "./api-problem";
import { UploadResult } from "./api.types";

export class FileApi {
  private readonly api: Api;

  constructor() {
    this.api = new Api();
  }

  async upload(photo: File): Promise<UploadResult> {
    try {
      const { selfApiSauce, config } = this.api;

      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("fileName", photo!.name);

      const response: ApiResponse<any> = await selfApiSauce.post(
        config.files,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
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
