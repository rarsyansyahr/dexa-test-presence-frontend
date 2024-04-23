import { PresenceApi } from "@/services/api";
import { PresenceTime } from "@/types";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const useLastPresence = (employeeId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [presenceTime, setPresenceTime] = useState<PresenceTime>();

  const getLastPresence = async () => {
    try {
      setIsLoading(true);

      const presenceApi = new PresenceApi();
      const result = await presenceApi.getLastPresence(employeeId);

      const { kind } = result;

      if (kind === "ok") {
        setPresenceTime(result.data);
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useState(() => {
    getLastPresence();
    // @ts-ignore
  }, []);

  return { isLoading, presenceTime, getLastPresence };
};
