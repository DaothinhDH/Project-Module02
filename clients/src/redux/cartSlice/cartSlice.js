import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCartUser = createAsyncThunk("cart/getCartUser", async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/carts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartUser.pending, (state) => {
        state.status = "Loading..."; // chờ
      })
      .addCase(getCartUser.fulfilled, (state, action) => {
        state.status = "successfully get"; // thành công
        state.data = action.payload; // dữ liệu trả về
      })
      .addCase(getCartUser.rejected, (state, action) => {
        state.status = "Failed"; // Thất bại
        state.error = action.error.message; // nội dung lỗi
      });
  },
});

export default cartSlice.reducer;
