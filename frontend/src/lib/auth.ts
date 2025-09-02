export function setBasicAuth(username: string, password: string) {
  const token = btoa(`${username}:${password}`);
  localStorage.setItem("auth.basic", `Basic ${token}`);
}

export function clearAuth() {
  localStorage.removeItem("auth.basic");
}

export function getAuthHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const v = localStorage.getItem("auth.basic");
  return v ? { Authorization: v } : {};
}


