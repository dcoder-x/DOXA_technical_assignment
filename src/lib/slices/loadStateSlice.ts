import { createSlice } from "@reduxjs/toolkit";

const loadStateSlice = createSlice({
    name: "loadState",
    initialState: { isLoading: true },
    reducers: {
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        }
    }
});

export const { setIsLoading } = loadStateSlice.actions;
export default loadStateSlice;
