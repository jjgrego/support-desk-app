import{ createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const user= JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    error: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
      try {
        return await authService.register(user)
      } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || error.message || error.toString()
        )
      }
    }
  )

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    console.log(user)
    try{
        return await authService.login(user)
    } catch(error){
        const msg =  (error.response && error.response.data && error.response.data.message) || (error.message) || error.toString()
        return thunkAPI.rejectWithValue(msg)
    }
})

export const logout = createAsyncThunk('/auth/logout', async () => {
    await authService.logout
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { reset: (state) => {
        state.error = false
        state.isSuccess = false
        state.isLoading = false
        state.message = ''
    }},
    extraReducers: (builder) => {
        builder
        // .addCase(register.pending, (state) => state.isLoading = true)
        // .addCase(register.fulfilled, (state, action) => {
        //     state.isLoading = false
        //     state.isSuccess = true
        //     state.user = action.payLoad})
        // .addCase(register.rejected, (state, action) => {
        //     state.isLoading = false
        //     state.user = null
        //     state.isError = true
        //     state.message = action.payload
        // })
        .addCase(logout.fulfilled, (state) => {
             state.user = null
        })

    },
})
export const { reset } = authSlice.actions
export default authSlice.reducer