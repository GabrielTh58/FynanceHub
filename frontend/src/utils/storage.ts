// services/storageService.ts
export function getStorageItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  
  export function setStorageItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  export function removeStorageItem(key: string): void {
    localStorage.removeItem(key);
  }
  