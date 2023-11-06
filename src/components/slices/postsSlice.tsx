import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
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
    addPost: (state, action) => {
      console.log(action)
      const post = {
        id: state.posts.length + 1,
        title: action.payload.title,
        body: action.payload.body
      }
      state.posts.push(post)
    }
  }
})

export const { getPosts, getPostsSuccess, getPostsFailure, addPost } = postsSlice.actions

export const postsSelector = (state) => state.posts

export default postsSlice.reducer

export function fetchPosts () {
  return async (dispatch) => {
    dispatch(getPosts())

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await response.json()

      dispatch(getPostsSuccess(data))
    } catch (error) {
      dispatch(getPostsFailure())
    }
  }
}
