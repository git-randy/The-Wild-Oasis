import { useState, useEffect } from "react";

export function useLocalStorageState(
  initialState: boolean,
  key: string
): [boolean, React.Dispatch<boolean>] {
  /**
   * Set and use state in local storage
   * @param {boolean} initialState - Set the initial state
   * @param {string} key - Give a name to the key
   * @returns {[boolean, React.Dispatch<boolean>]} An array of a getter and setter
   */
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
