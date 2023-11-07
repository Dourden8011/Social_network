import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Post {
  id: string
  userId?: string
  title: string
  body: string
}

interface InitialState {
  loading: boolean
  hasErrors: boolean
  posts: Post[]
}

export const initialState: InitialState = {
  loading: false,
  hasErrors: false,
  posts: []
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPosts: (state) => {
      state.loading = true
    },
    getPostsSuccess: (state, { payload }) => {
      state.posts = payload
      state.loading = false
      state.hasErrors = false
    },
    getPostsFailure: (state) => {
      state.loading = false
      state.hasErrors = true
    },
    addPost: (state, action: PayloadAction<Post>) => {
      const post = {
        id: (state.posts.length + 1).toString(),
        title: action.payload.title,
        body: action.payload.body
      }
      state.posts.push(post)
    }
  }
})

export const { getPosts, getPostsSuccess, getPostsFailure, addPost } = postsSlice.actions

export default postsSlice.reducer

// export function fetchPosts () {
//   return async (dispatch) => {
//     dispatch(getPosts())

//     try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/posts')
//       const data = await response.json()

//       dispatch(getPostsSuccess(data))
//     } catch (error) {
//       dispatch(getPostsFailure())
//     }
//   }
// }
