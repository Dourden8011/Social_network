import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type RootState } from './store'

export interface Post {
  id: string
  userId: string | undefined
  title: string
  body: string
}

export interface User {
  id: string
  firstname: string
  lastname: string
  email: string
  password: string
}

export interface UserResponse {
  user: User
  accessToken: string
}

export interface LoginRequest {
  email: string
  password: string
}

export const networkApi = createApi({
  reducerPath: 'networkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken
      if (token !== null) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getPosts: build.query<Post[], string>({
      query: () => ({
        url: 'posts'
      }),
      providesTags: (result, error, id) => [{ type: 'Post', id, error }]
    }),
    newPost: build.mutation<Post, Post>({
      query: (post) => ({
        url: 'posts',
        method: 'POST',
        body: post
      }),
      invalidatesTags: ['Post']
    }),
    deletePost: build.mutation<Post, Post>({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: 'DELETE',
        body: post
      }),
      invalidatesTags: ['Post']
    }),
    editPost: build.mutation<Post, Post>({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: 'PUT',
        body: post
      }),
      invalidatesTags: ['Post']
    }),
    newUser: build.mutation<UserResponse, User>({
      query: (user) => ({
        url: 'signup',
        method: 'POST',
        body: user
      })
    }),
    authUser: build.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'signin',
        method: 'POST',
        body: { ...credentials }
      }),
      invalidatesTags: ['Post']
    })
  })
})

export const {
  useGetPostsQuery,
  useNewPostMutation,
  useNewUserMutation,
  useAuthUserMutation,
  useDeletePostMutation,
  useEditPostMutation
} = networkApi
