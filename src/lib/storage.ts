import secureLocalStorage from "react-secure-storage";

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
const load = (key: string): any | null => {
  try {
    if (typeof window !== "undefined") return secureLocalStorage.getItem(key);
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
const save = (key: string, value: any): void => {
  try {
    if (typeof window !== "undefined") secureLocalStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
const remove = (key: string): void => {
  try {
    if (typeof window !== "undefined") secureLocalStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Burn it all to the ground.
 */
const clear = (): void => {
  try {
    if (typeof window !== "undefined") secureLocalStorage.clear();
  } catch (error) {
    console.error(error);
  }
};

export const Storage = {
  load,
  save,
  remove,
  clear,
};
