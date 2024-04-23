import { PresenceApi } from "@/services/api/presence";
import { GetPresencesProps, Presence } from "@/types";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const usePresences = (props?: GetPresencesProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [presences, setPresences] = useState<Array<Presence>>();

  const getPresences = async (input?: GetPresencesProps) => {
    try {
      setIsLoading(true);

      const presenceApi = new PresenceApi();
      const result = await presenceApi.getAll(input ?? props);

      const { kind } = result;

      if (kind === "ok") {
        setPresences(
          result.data.filter(
            (item) =>
              dayjs(item.created_at).format("YYYY-MM-DD") !==
              dayjs().format("YYYY-MM-DD")
          )
        );
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPresences();
  }, []);

  return { isLoading, getPresences, presences };
};
