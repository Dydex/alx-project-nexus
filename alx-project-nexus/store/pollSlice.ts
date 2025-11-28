import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PollState } from "@/interfaces";
import { Poll } from "@/interfaces";
import { v4 as uuidv4 } from "uuid";

const initialState: PollState = {
  polls: [],
};

const durationMap: Record<string, number> = {
  "1 hour": 60 * 60 * 1000,
  "6 hours": 6 * 60 * 60 * 1000,
  "12 hours": 12 * 60 * 60 * 1000,
  "24 hours": 24 * 60 * 60 * 1000,
  "3 days": 3 * 24 * 60 * 60 * 1000,
};

const pollSlice = createSlice({
  name: "polls",
  initialState,
  reducers: {
    addPoll: (
      state,
      action: PayloadAction<
        Omit<Poll, "id" | "createdAt" | "expiresIn"> & { timeFrame: string }
      >
    ) => {
      const poll: Poll = {
        ...action.payload,
        id: uuidv4(),
        createdAt: Date.now(),
        expiresIn: durationMap[action.payload.timeFrame],
        options: action.payload.options.map((opt) =>
          typeof opt === "string" ? { text: opt, votes: 0 } : opt
        ),
      };
      state.polls.unshift(poll);
    },
    castVote: (
      state,
      action: PayloadAction<{ pollId: string; optionIndex: number }>
    ) => {
      const poll = state.polls.find((p) => p.id === action.payload.pollId);
      if (poll) {
        poll.options[action.payload.optionIndex].votes += 1;
      }
    },
    removeExpiredPolls: (state) => {
      const now = Date.now();
      state.polls = state.polls.filter(
        (poll) => now < poll.createdAt + poll.expiresIn
      );
    },
  },
});

export const { addPoll, castVote, removeExpiredPolls } = pollSlice.actions;
export default pollSlice.reducer;
