// src/store/actions/discussAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../Api/axiosConfig";

// Helper function to handle errors
const handleThunkError = (error, rejectWithValue) => {
    const message = error.response?.data?.message || "An error occurred";
    toast.error(message); // Show error notification
    return rejectWithValue(message); // Return the error message to be handled in the slice
};

// Fetch discussions
export const fetchDiscussions = createAsyncThunk(
    "discussions/fetchDiscussions",
    async ({ page, limit, sortBy, order, searchTerm }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/discuss", {
                params: { page, limit, sortBy, order, searchTerm },
            });
            return response.data; // Return fetched discussions
        } catch (error) {
            return handleThunkError(error, rejectWithValue); // Handle error
        }
    }
);

// Get discussion by ID
export const getDiscussById = createAsyncThunk(
    "discussions/getDiscussById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/discuss/${id}`);
            return response.data; // Return discussion data
        } catch (error) {
            return handleThunkError(error, rejectWithValue); // Handle error
        }
    }
);


