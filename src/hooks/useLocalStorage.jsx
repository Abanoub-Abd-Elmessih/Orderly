export const useLocalStorage = (key) => {
    const get = () => {
      try {
        return JSON.parse(localStorage.getItem(key) || "null");
      } catch {
        return null;
      }
    };
  
    const set = (value) => {
      localStorage.setItem(key, JSON.stringify(value));
    };
  
    const remove = () => {
      localStorage.removeItem(key);
    };
  
    return { get, set, remove };
  };
  