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

export async function loginRequest(request: AuthRequest): Promise<LoginResponse> {
    const response = await fetch("http://localhost:7197/auth/login", {
        method: "POST",
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error(`Failed to login: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
        token: data.token,
        accountId: data.accountId,
        username: data.username,
    };
}

export async function registerUser(request: AuthRequest): Promise<RegisterResponse> {
    const response = await fetch("http://localhost:7197/auth/register", {
        method: "POST",
        body: JSON.stringify(request),
    });
    if (!response.ok) {
        throw new Error(`Failed to register: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return {
        token: data.token,
        accountId: data.accountId,
        username: data.username,
    };
}

  
