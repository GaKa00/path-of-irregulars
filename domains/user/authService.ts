import { API_BASE_URL } from "@/config/api";

export interface AuthRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  accountId: number;
  username: string;
}

export interface RegisterResponse {
  token: string;
  accountId: number;
  username: string;
}

export async function loginRequest(
  request: AuthRequest,
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: request.username,
      password: request.password,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to login: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  return {
    token: data.token,
    accountId: data.accountId,
    username: data.username,
  };
}

export async function registerUser(
  request: AuthRequest,
): Promise<RegisterResponse> {
  console.log("Registering user:", request);
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: request.username,
      password: request.password,
    }),
  });
  if (!response.ok) {
    throw new Error(
      `Failed to register: ${response.status} ${response.statusText}`,
    );
  }
  const data = await response.json();
  return {
    token: data.token,
    accountId: data.accountId,
    username: data.username,
  };
}
