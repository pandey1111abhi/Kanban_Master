import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchTicket = createAsyncThunk("fetchTicket", async () => {
  const response = await axios.get(
    "https://api.quicksell.co/v1/internal/frontend-assignment"
  );
  return response.data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    isLoading: false,
    data: null,
    error: null,
    filter: { orderFilter: "title", groupFilter: "status" },
  },
  reducers: {
    groupTicket(state, action) {
      state.filter = action.payload;
      const currState = current(state);
      const tickets = currState.data.tickets;
      const groupSet = new Set();
      const groups = [];
      tickets.map((ticket) => {
        groupSet.add(ticket[action.payload.groupFilter]);
      });
      const groupTypes = Array.from(groupSet);
      groupTypes.sort((a, b) => b - a);
      for (const group of groupTypes) {
        const arr = [];
        for (const ticket of tickets) {
          if (group == ticket[action.payload.groupFilter]) arr.push(ticket);
        }
        groups.push(arr);
      }

      state.groups = groups.map((group) =>
        group.sort(
          (a, b) =>
            b[action.payload.orderFilter] - a[action.payload.orderFilter]
        )
      );
      if (action.payload.orderFilter == "title") {
        state.groups = groups.map((group) =>
          group.sort((a, b) =>
            a[action.payload.orderFilter].localeCompare(
              b[action.payload.orderFilter],
              "en",
              { sensitivity: "base" }
            )
          )
        );
      }
      state.groupTypes = groupTypes;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTicket.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTicket.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchTicket.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
  },
});

export default dataSlice.reducer;
export const { groupTicket } = dataSlice.actions;
