import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/usersReducer";
import postsReducer from "./reducers/postsReducer";
import invitesReducer from "./reducers/invitesReducer";
import authReducer from "./reducers/authReducer";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    invites: invitesReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch