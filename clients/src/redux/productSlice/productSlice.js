import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// gọi API lấy thông tin tất cả product
export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      return response.data;
    } catch (error) {}
  }
);

//gọi API xóa thông tin một product theo id
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

// API thêm mới sản phẩm
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/products`,
        product
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const { id, ...data } = product;
    const response = await axios.put(
      `http://localhost:3000/products/${id}`,
      data
    );
    return product.id;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.status = "Loading..."; // chờ
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.status = "successfully get"; // thành công
        state.data = action.payload; // dữ liệu trả về
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.status = "Failed"; // Thất bại
        state.error = action.error.message; // nội dung lỗi
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.status = "successfully delete";
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.status = "successfully create";
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.status = "successfully update";
      });
  },
});

export default productSlice.reducer;
