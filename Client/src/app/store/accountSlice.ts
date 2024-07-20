import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { User } from "../../models/user"
import { FieldValues } from "react-hook-form"
import agent from "../api/agent"
import { router } from "../route/Routes"
import { toast } from "react-toastify"

interface AccountState {
  user: User | null
}

const initialState: AccountState = {
  user: null,
}

export const signInUser = createAsyncThunk<User, FieldValues>(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const user = await agent.Account.login(data)
      localStorage.setItem("user", JSON.stringify(user))
      return user
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  },
)

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)))
    try {
      const user = await agent.Account.currentUser()
      localStorage.setItem("user", JSON.stringify(user))
      return user
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false
    },
  },
)

export const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    signOut: (state) => {
      state.user = null
      localStorage.removeItem("user")
      router.navigate("/")
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.rejected, (state, action) => {
      console.log("action:", action)
    })
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null
      localStorage.removeItem("user")
      toast.error("Your session has expired. Please log in again to continue.")
      router.navigate("/login")
    })
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        state.user = action.payload
      },
    )
  },
})

export const { signOut, setUser } = accountSlice.actions
