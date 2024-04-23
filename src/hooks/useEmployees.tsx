import { EmployeeApi } from "@/services/api";
import { Employee } from "@/types";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const useEmployees = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [employees, setEmployees] = useState<Array<Employee>>();

  const getAll = async () => {
    try {
      setIsLoading(true);

      const employeeApi = new EmployeeApi();
      const result = await employeeApi.getAll();

      const { kind } = result;

      if (kind === "ok") {
        setEmployees(result.data);
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

  return { isLoading, employees, getAll };
};
