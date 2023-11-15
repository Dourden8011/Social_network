import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface User {
  email: string
  firstname: string
  lastname: string
  id: string
}

export interface AuthState {
  user: User | null
  accessToken: string | null
}

const authSlice = createSlice({
  name: 'auth',
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  initialState: {
    user: null,
    accessToken: null
  } as AuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
    },
    logOut: state => {
      state.user = null
      state.accessToken = null
    }
  }
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer
