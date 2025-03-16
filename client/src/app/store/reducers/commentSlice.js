import { createSlice } from "@reduxjs/toolkit";
import commentsService from "../../service/comments.service";

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    commentsReceived: (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentAdd: (state, action) => {
      state.comments.push(action.payload);
      state.isLoading = false;
    },
    commentDel: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
      state.isLoading = false;
    },
    commentEdit: (state, action) => {
      const { id, text } = action.payload;
      const comment = state.comments.find((comment) => comment.id === id);
      if (comment) {
        comment.text = text;
      }
      state.isLoading = false;
    },
  },
});

export const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentAdd,
  commentDel,
  commentEdit,
} = commentSlice.actions;

export const fetchComments = () => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const data = await commentsService.get();
    dispatch(commentsReceived(data.reverse()));
  } catch (e) {
    dispatch(commentsRequestFailed(e.message));
  }
};

export const addComment = (text) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const data = await commentsService.post(text);

    dispatch(commentAdd(data));
  } catch (e) {
    dispatch(commentsRequestFailed(e.message));
  }
};

export const delComment = (id) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    await commentsService.del(id);
    dispatch(commentDel(id));
  } catch (e) {
    dispatch(commentsRequestFailed(e.message));
  }
};

export const editComments = (id, newText) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const data = await commentsService.edit(id, newText);
    dispatch(commentEdit(data));
  } catch (e) {
    dispatch(commentsRequestFailed(e.message));
  }
};

export default commentSlice.reducer;
