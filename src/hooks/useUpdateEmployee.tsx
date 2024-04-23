import { EmployeeApi } from "@/services/api";
import { PresenceStatus, PresenceTime, UpdateEmployeeProps } from "@/types";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const useUpdateEmployee = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const update = async (props?: UpdateEmployeeProps) => {
    try {
      setIsLoading(true);

      const employeeApi = new EmployeeApi();
      const result = await employeeApi.update(props);

      const { kind } = result;

      if (kind === "ok") {
        toast.success("Profil berhasil diperbarui");
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, update };
};
