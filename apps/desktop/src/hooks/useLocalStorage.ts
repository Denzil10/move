import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return initialValue;
      
      try {
        return JSON.parse(item);
      } catch {
        // Fallback for raw strings if they are expected to be strings
        if (typeof initialValue === "string") {
          return item as unknown as T;
        }
        // For numbers, try parsing
        if (typeof initialValue === "number") {
          const num = Number(item);
          return (isNaN(num) ? initialValue : num) as unknown as T;
        }
        // For booleans
        if (typeof initialValue === "boolean") {
          return (item === "true") as unknown as T;
        }
        return initialValue;
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      // If it's a simple string, we can just save it raw or JSON stringify it.
      // JSON stringify is safer for the next read.
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
