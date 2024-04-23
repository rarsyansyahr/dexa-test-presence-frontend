import { UserLevel } from "@/types";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

const getAccessToken = () => getCookie("access_token")?.toString();

const getUserId = () => getCookie("user_id")?.toString();

const getEmail = () => getCookie("email")?.toString();

const getLevel = () => getCookie("level")?.toString() as UserLevel;

const getName = () => getCookie("name")?.toString() as UserLevel;

const get = (key: string) => getCookie(key);

const set = (key: string, value: any) => setCookie(key, value);

const remove = (key: string) => deleteCookie(key);

export const Cookie = {
  getAccessToken,
  getUserId,
  getEmail,
  getLevel,
  getName,
  set,
  get,
  remove,
};
