import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from "./reducers/pizzaSlice";
import usersReducer from "./reducers/usersReducer";
import postsReducer from "./reducers/postsReducer";
import commentsReducer from "./reducers/commentsReducer";
import invitesReducer from "./reducers/invitesReducer";

export const store = configureStore({
  reducer: {
    pizza: pizzaReducer,
    user: usersReducer,
    post: postsReducer,
    comment: commentsReducer,
    invite: invitesReducer
  },
});