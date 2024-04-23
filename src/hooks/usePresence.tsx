import { PresenceApi } from "@/services/api/presence";
import { PresenceStatus, PresenceTime } from "@/types";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const usePresence = (callback: () => void) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [presenceTime, setPresenceTime] = useState<PresenceTime>();

  const createPresence = async (status: PresenceStatus) => {
    try {
      setIsLoading(true);

      const presenceApi = new PresenceApi();
      const result = await presenceApi.presence(status);

      const { kind } = result;

      if (kind === "ok") {
        toast.success("Presensi berhasil direkam");
        callback();
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, createPresence };
};
