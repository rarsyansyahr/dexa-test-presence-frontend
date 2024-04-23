import { AuthApi } from "@/services/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Storage } from "@/lib";
import { LoginProps, UserLevel } from "@/types";

export const useLogin = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onLogin = async (props: LoginProps) => {
    try {
      setIsLoading(true);

      const authApi = new AuthApi();
      const result = await authApi.signIn(props);

      const { kind } = result;

      if (kind === "ok") {
        const { access_token, level, user_id, email } = result.data;
        const routePrefix = level === UserLevel.Employee ? "/employee" : "/hr";

        Object.keys(result.data).forEach((key) => {
          // @ts-ignore
          Cookies.set(key, result.data[key]);
        });

        Storage.save("accessToken", access_token);

        router.replace(routePrefix + "/home");
      } else {
        toast.error("Login Gagal");
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { onLogin, isLoading };
};
