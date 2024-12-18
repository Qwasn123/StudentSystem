import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from '../../types/user';

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
};

// 模拟登录验证
const mockLogin = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'test@example.com' && password === '123456') {
                resolve({
                    token: 'mock-jwt-token',
                    user: {
                        id: '1',
                        email: 'test@example.com',
                        username: 'test',
                        role: 'student',
                        name: '测试用户',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    }
                });
            } else {
                reject(new Error('邮箱或密码错误'));
            }
        }, 1000); // 模拟网络延迟
    });
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }) => {
        try {
            const response = await mockLogin(credentials.email, credentials.password);
            const { token, user } = response as any;
            localStorage.setItem('token', token);
            return { token, user };
        } catch (error) {
            throw error;
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('token');
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || '登录失败';
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
