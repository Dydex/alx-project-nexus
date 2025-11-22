import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PollState } from "@/interfaces";
import { Poll } from "@/interfaces";

const initialState: PollState = {
  polls: [],
};

const pollSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {
    addPoll: (state, action: PayloadAction<Poll>) => {
      state.polls.unshift(action.payload);
    },
  },
});

export const { addPoll } = pollSlice.actions;
export default pollSlice.reducer;
