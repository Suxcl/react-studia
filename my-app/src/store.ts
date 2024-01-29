import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from "./reducers/pizzaSlice";
import usersReducer from "./reducers/usersReducer";
import postsReducer from "./reducers/postsReducer";
import commentsReducer from "./reducers/commentsReducer";
import invitesReducer from "./reducers/invitesReducer";

export const store = configureStore({
  reducer: {
    pizza: pizzaReducer,
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    invites: invitesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch