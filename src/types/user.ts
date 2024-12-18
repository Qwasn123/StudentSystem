export type UserRole = 'student' | 'mentor' | 'admin';

export interface User {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    name: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}
