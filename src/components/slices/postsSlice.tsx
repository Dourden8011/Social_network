import { type PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Post {
  id: string
  userId?: string
  title: string
  body: string
}

interface InitialState {
  loading: boolean
  hasErrors: string | undefined
  posts: Post[]
}

export const initialState: InitialState = {
  loading: false,
  hasErrors: undefined,
  posts: []
}

export const fetchPosts = createAsyncThunk<Post[], undefined, { rejectValue: string }>(
  'posts/fetchPosts',
  async function (_, { rejectWithValue }) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')

    if (!response.ok) {
      return rejectWithValue('Can/t get posts :(')
    }

    const data = await response.json()

    return data
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      const post = {
        id: (state.posts.length + 1).toString(),
        title: action.payload.title,
        body: action.payload.body
      }
      state.posts.push(post)
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true
    })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload
        state.loading = false
        state.hasErrors = undefined
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.hasErrors = action.payload
      })
  }
})

export const { addPost } = postsSlice.actions

export default postsSlice.reducer
