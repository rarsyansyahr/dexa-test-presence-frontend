import { EmployeeApi } from "@/services/api";
import { Employee } from "@/types";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const useEmployee = (employeeId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [employee, setEmployee] = useState<Employee>();

  const getAll = async () => {
    try {
      setIsLoading(true);

      const employeeApi = new EmployeeApi();
      const result = await employeeApi.getOne(employeeId);

      const { kind } = result;

      if (kind === "ok") {
        setEmployee(result.data);
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useState(() => {
    getAll();
    // @ts-ignore
  }, []);

  return { isLoading, employee, getAll };
};
