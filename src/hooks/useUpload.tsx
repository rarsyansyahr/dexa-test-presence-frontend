import { FileApi } from "@/services/api";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const useUpload = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filename, setFileName] = useState<string>();

  const upload = async (photo: File) => {
    try {
      setIsLoading(true);

      const fileApi = new FileApi();
      const result = await fileApi.upload(photo);

      const { kind } = result;

      if (kind === "ok") {
        toast.success("Gambar berhasil diupload");
        setFileName(result.data.filename);
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, upload, filename };
};
