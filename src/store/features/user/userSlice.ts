import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { User } from "@/types/userType";

// Define a type for the slice state
interface UserState {
  value: User | null;
}

// Define the initial state using that type
const initialState: UserState = {
  value: null,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
    removeUser: (state) => {
      state.value = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
