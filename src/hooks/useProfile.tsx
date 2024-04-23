import { Cookie, Storage } from "@/lib";
import { AuthApi } from "@/services/api";
import { Profile } from "@/types";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>();

  const getProfile = async () => {
    try {
      setIsLoading(true);

      const authApi = new AuthApi();
      const result = await authApi.getProfile();

      const { kind } = result;

      if (kind === "ok") {
        setProfile(result.data);
      } else {
        toast.error("Gagal mengambil data profil");
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useState(() => {
    getProfile();
    // @ts-ignore
  }, []);

  return { isLoading, profile };
};
