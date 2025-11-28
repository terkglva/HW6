import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAll, getById } from "../services/itemsService";

// ---- Thunks ----
export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (query, { rejectWithValue }) => {
    try {
      return await getAll(query);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchItemById = createAsyncThunk(
  "items/fetchItemById",
  async (id, { rejectWithValue }) => {
    try {
      return await getById(id);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ---- Slice ----
const itemsSlice = createSlice({
  name: "items",
  initialState: {
    list: [],
    selectedItem: null,
    loadingList: false,
    loadingItem: false,
    errorList: null,
    errorItem: null,
    query: "",
  },

  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    clearSelected(state) {
      state.selectedItem = null;
      state.errorItem = null;
      state.loadingItem = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // ---- List ----
      .addCase(fetchItems.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      // ---- Single Item ----
      .addCase(fetchItemById.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
        state.selectedItem = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem = action.payload;
      });
  },
});

export const { setQuery, clearSelected } = itemsSlice.actions;

export default itemsSlice.reducer;
