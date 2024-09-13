// src/store/slices/discussSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
    createDiscuss,
    deleteDiscussById,
    fetchDiscussions,
    getDiscussById,
    updateDiscussById,

} from "./discussAction";

const discussSlice = createSlice({
    name: "discussions",
    initialState: {
        discussions: [], // List of discussions
        selectedDiscussion: null, // Current selected discussion
        loading: false, // Loading state for any async action
        error: null, // Error message if an action fails
        totalPages: 0, // For pagination purposes
    },
    reducers: {
        // You can add other reducers here if you need to manage other states locally


    },
    extraReducers: (builder) => {
        builder
            // Handle fetch discussions
            .addCase(fetchDiscussions.pending, (state) => {
                state.loading = true; // Set loading state when the fetch starts
                state.error = null; // Reset error state
            })
            .addCase(fetchDiscussions.fulfilled, (state, action) => {
                state.loading = false; // Turn off loading state
                state.discussions = action.payload.topics || []; // Save discussions to state
                state.totalPages = action.payload.pages || 0; // Save total number of pages for pagination
            })
            .addCase(fetchDiscussions.rejected, (state, action) => {
                state.loading = false; // Turn off loading
                state.error = action.payload; // Save error message
            })

            // Handle getdiscussion by ID
            .addCase(getDiscussById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDiscussById.fulfilled, (state, action) => {
                state.loading = false;
                //check id is exicting or not give me

                const existingDiscussion = state.discussions.find((discussion) => discussion._id === action.payload._id);
                if (existingDiscussion) {
                    state.discussions = state.discussions.map((discussion) => {
                        if (discussion._id === action.payload._id) {
                            return action.payload;
                        }
                        return discussion;
                    });
                }
                else {
                    state.discussions.push(action.payload);
                }
            })
            .addCase(getDiscussById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // handle  post createDiscuss
            .addCase(createDiscuss.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createDiscuss.fulfilled, (state, action) => {
                state.loading = false;
                state.discussions.unshift(action.payload);
            })
            .addCase(createDiscuss.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // handle delete deleteDiscussById
            .addCase(deleteDiscussById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteDiscussById.fulfilled, (state, action) => {
                state.loading = false;
                state.discussions = state.discussions.filter(
                    (discussion) => discussion._id !== action.payload.deletedTopic

                );
            })
            .addCase(deleteDiscussById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //handle update updateDiscussById

            .addCase(updateDiscussById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateDiscussById.fulfilled, (state, action) => {
                state.loading = false;
                state.discussions = state.discussions.map((item) => {
                    if (item._id === action.payload._id) {
                        return action.payload
                    }
                    return item;
                });
            })
            .addCase(updateDiscussById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});



export default discussSlice.reducer;