import { createSlice } from "@reduxjs/toolkit";
import {
    fetchDiscussions,
    addLikeOrRemoveLike,
    addLikeOrRemoveLikeComment,
    getDiscussById,
    deleteDiscussById
} from "./discussAction"

const initialState = {
    discussions: [],
    loading: false,
    error: null,
    totalPages: 0,
};

const discussSlice = createSlice({
    name: "discussions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetching discussions
            .addCase(fetchDiscussions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDiscussions.fulfilled, (state, action) => {
                state.loading = false;
                state.discussions = action.payload.topics || [];
                state.totalPages = action.payload.pages || 0;
            })
            .addCase(fetchDiscussions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || action.payload;
            })

            // Handle like/unlike discussion
            .addCase(addLikeOrRemoveLike.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addLikeOrRemoveLike.fulfilled, (state, action) => {
                state.loading = false;
                const updatedDiscussion = state.discussions.find(
                    (discussion) => discussion._id === action.payload._id
                );
                if (updatedDiscussion) {
                    updatedDiscussion.likes = action.payload.likes;
                }
            })
            .addCase(addLikeOrRemoveLike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || action.payload;
            })

            // Handle like/unlike comment
            .addCase(addLikeOrRemoveLikeComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addLikeOrRemoveLikeComment.fulfilled, (state, action) => {
                state.loading = false;

                // Find the discussion containing the comment
                const updatedDiscussion = state.discussions.find(
                    (discussion) => discussion._id === action.payload.discussionId
                );

                if (updatedDiscussion) {
                    // Find the specific comment within the discussion and update its likes
                    const updatedComment = updatedDiscussion.comments.find(
                        (comment) => comment._id === action.payload.commentId
                    );

                    if (updatedComment) {
                        updatedComment.likes = action.payload.likes;
                    }
                }
            })
            .addCase(addLikeOrRemoveLikeComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || action.payload;
            })

            // Handle fetching discussion by ID
            .addCase(getDiscussById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDiscussById.fulfilled, (state, action) => {
                state.loading = false;
                const updatedDiscussion = action.payload;
                state.discussions = state.discussions.map(discussion =>
                    discussion._id === updatedDiscussion._id ? updatedDiscussion : discussion
                );
            })
            .addCase(getDiscussById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || action.payload;
            })

            // Handle deleting a discussion by ID
            .addCase(deleteDiscussById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteDiscussById.fulfilled, (state, action) => {
                state.loading = false;
                state.discussions = state.discussions.filter(
                    (discussion) => discussion._id !== action.payload
                );
            })
            .addCase(deleteDiscussById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || action.payload;
            });
    },
});

export default discussSlice.reducer;
