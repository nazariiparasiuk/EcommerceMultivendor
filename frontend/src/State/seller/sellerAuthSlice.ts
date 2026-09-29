import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { authErrorMessage } from "../AuthSlice";

export interface SellerSignupRequest {
    email: string;
    password: string;
    otp: string;
    sellerName: string;
    mobile: string;
    taxId: string;
    businessDetails: { businessName: string };
    pickupAddress: { name: string; mobile: string; address: string; city: string; state: string; pinCode: string };
    bankDetails: { accountHolderName: string; accountNumber: string };
}

export const sellerLogin = createAsyncThunk<string, { email: string, password: string }, { rejectValue: string }>(
    "sellerAuth/login",
    async (loginRequest, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/sellers/login", loginRequest);
            localStorage.setItem("jwt", data.jwt);
            return data.jwt;
        } catch (error) {
            return rejectWithValue(authErrorMessage(error));
        }
    }
);

export const sendSellerSignupCode = createAsyncThunk<string, { email: string }, { rejectValue: string }>(
    "sellerAuth/sendSellerSignupCode",
    async ({ email }, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/sellers/signup/code", { email });
            return data.message;
        } catch (error) {
            return rejectWithValue(authErrorMessage(error));
        }
    }
);

export const createSeller = createAsyncThunk<void, SellerSignupRequest, { rejectValue: string }>(
    "sellerAuth/createSeller",
    async (sellerSignupRequest, { rejectWithValue }) => {
        try {
            await api.post("/sellers", sellerSignupRequest);
        } catch (error) {
            return rejectWithValue(authErrorMessage(error));
        }
    }
);