import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk("getUser", async (search) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/users?_sort=id&_order=desc&user_name_like=${search}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const changeActiveUser = createAsyncThunk(
  "changeActiveUser",
  async (user) => {
    try {
      await axios.patch(`http://localhost:3000/users/${user.id}`, {
        active: !user.active,
      });
      return user.id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// export const changeSetRoleUser = createAsyncThunk(
//   "changeSetRoleUser",
//   async (user) => {
//     try {
//       const newRole = user.role ? 1 : 0;
//       await axios.patch(`http://localhost:8000/users/${user.id}`, {
//         role: newRole,
//       });
//       return user.id;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }
// );

// export const updateUserRole = (user) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.patch(
//         `http://localhost:8000/users/${user.id}`,
//         {
//           role: user.role ? 1 : 0,
//         }
//       );

//       dispatch(changeSetRoleUser(user));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    mess: "no mess",
    isLoadingGet: false,
    isLoadingChange: false,
    isLoadingRole: false,
  },
  reducers: {
    changeUserRole(state, action) {
      const userId = action.payload;
      const user = state.data.find((user) => user.id === userId);
      if (user) {
        user.role = user.role ? 1 : 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        return {
          ...state,
          mess: "pending",
          isLoadingGet: true,
        };
      })
      .addCase(getUser.fulfilled, (state, action) => {
        return {
          ...state,
          mess: "ok",
          data: action.payload,
          isLoadingGet: false,
        };
      })
      .addCase(getUser.rejected, (state) => {
        return {
          ...state,
          mess: "no",
          isLoadingGet: false,
        };
      })
      .addCase(changeActiveUser.pending, (state) => {
        return {
          ...state,
          mess: "pending",
          isLoadingChange: true,
        };
      })
      .addCase(changeActiveUser.fulfilled, (state, action) => {
        return {
          ...state,
          mess: "oke",
          isLoadingChange: false,
        };
      })
      .addCase(changeActiveUser.rejected, (state) => {
        return {
          ...state,
          mess: "no",
          isLoadingChange: false,
        };
      });
    // .addCase(changeSetRoleUser.pending, (state) => {
    //   state.isLoadingRole = true;
    // })
    // .addCase(changeSetRoleUser.fulfilled, (state, action) => {
    //   state.isLoadingRole = false;
    //   const userId = action.payload;
    //   const user = state.data.find((user) => user.id === userId);
    //   if (user) {
    //     user.role = user.role ? 0 : 1;
    //   }
    // })
    // .addCase(changeSetRoleUser.rejected, (state) => {
    //   state.isLoadingRole = false;
    // });
  },
});

export const { changeUserRole } = userSlice.actions;
export default userSlice.reducer;
