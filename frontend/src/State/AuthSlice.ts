import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/Api";
import { User, UserRole } from "../types/UserTypes";

export const authErrorMessage = (error: any): string => {
    if (!error?.response) {
        return "Can't reach Sellway right now. Check your connection and try again.";
    }
    return error.response.data?.error || error.response.data?.message || "Something went wrong. Try again.";
};

export const signin = createAsyncThunk<{ jwt: string, role: UserRole }, { email: string, password: string }, { rejectValue: string }>(
    "auth/signin",
    async (loginRequest, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/auth/signing", loginRequest);
            localStorage.setItem("jwt", data.jwt);
            return { jwt: data.jwt, role: data.role };
        } catch (error) {
            return rejectWithValue(authErrorMessage(error));
        }
    }
);

export const sendSignupCode = createAsyncThunk<string, { email: string }, { rejectValue: string }>(
    "auth/sendSignupCode",
    async ({ email }, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/auth/signup/code", { email });
            return data.message;
        } catch (error) {
            return rejectWithValue(authErrorMessage(error));
        }
    }
);

export const signup = createAsyncThunk<string, { email: string, fullName: string, password: string, otp: string }, { rejectValue: string }>(
    "auth/signup",
    async (signupRequest, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/auth/signup", signupRequest);
            localStorage.setItem("jwt", data.jwt);
            return data.jwt;
        } catch (error) {
            return rejectWithValue(authErrorMessage(error));
        }
    }
);

export const requestPasswordReset = createAsyncThunk<string, { email: string, role: UserRole }, { rejectValue: string }>(
    "auth/requestPasswordReset",
    async (request, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/auth/password/forgot", request);
            return data.message;
        } catch (error) {
            return rejectWithValue(authErrorMessage(error));
        }
    }
);

export const resetPassword = createAsyncThunk<string, { email: string, otp: string, newPassword: string, role: UserRole }, { rejectValue: string }>(
    "auth/resetPassword",
    async (request, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/auth/password/reset", request);
            return data.message;
        } catch (error) {
            return rejectWithValue(authErrorMessage(error));
        }
    }
);

export const fetchUserProfile = createAsyncThunk<any, any>("/auth/fetchUserProfile",
    async ({jwt}, {rejectWithValue}) => {
        try {
            const response = await api.get("/api/users/profile", {headers: {
                Authorization: `Bearer ${jwt}`
            }});
            return response.data;
        } catch (error) {
            console.log("ERROR - - - ", error);
        }
    }
)

export const logout = createAsyncThunk<any, any>("/auth/logout",
    async (navigate, {rejectWithValue}) => {
        try {
            localStorage.clear();
            navigate("/");
        } catch (error) {
            console.log("ERROR - - - ", error);
        }
    }
)

interface AuthState {
    jwt: string | null;
    isLoggedIn: boolean;
    user: User | null;
}

const initialState: AuthState = {
    jwt: null,
    isLoggedIn: false,
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signin.fulfilled, (state, action) => {
            state.jwt = action.payload.jwt;
            state.isLoggedIn = true;
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.jwt = action.payload;
            state.isLoggedIn = true;
        })
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.jwt = null;
            state.isLoggedIn = false;
            state.user = null;
        })
    }
})

export default authSlice.reducer;