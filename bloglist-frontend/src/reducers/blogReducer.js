import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      state = action.payload
      return state
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog =>
        blog.id !== updatedBlog.id ?
          blog
          :
          updatedBlog
      )
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    appendComment(state, action) {
      const newComment = action.payload
      console.log(newComment)
      console.log(newComment.blog.id)
      console.log(newComment.comment)
      state.map(blog => {
        if (blog.id !== newComment.blog.id) {
          return blog
        } else {
          console.log(blog.comments)
          const updatedBlog = { ...blog, comments: blog.comments.push(newComment.comment) }
          console.log(updatedBlog)
          return updatedBlog
        }
      })
      return
    }
  },
})

export const { setBlogs, appendBlog, updateBlog, deleteBlog, appendComment } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch(setBlogs(blogs))
  }
}

export const addBlog = content => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(content)

      dispatch(appendBlog(newBlog))

      return 'ok'
    } catch (error) {
      return error.message
    }
  }
}

export const addLike = blog => {
  return async dispatch => {
    const changedBlog = {
      ...blog, likes: blog.likes + 1
    }
    try {
      const updatedBlog = await blogService.update(changedBlog)

      dispatch(updateBlog(updatedBlog))

      return 'ok'
    } catch (error) {
      return error.message
    }
  }
}

export const addComment = (comment, blog) => {
  return async dispatch => {
    const CommentObject = { comment: comment }
    try {
      const updatedBlog = await blogService.comment(CommentObject, blog.id)

      dispatch(updateBlog(updatedBlog))

      return 'ok'
    } catch (error) {
      return error.message
    }
  }
}

export const removeBlog = id => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch(deleteBlog(id))
      return 'ok'
    } catch (error) {
      return error.message
    }
  }
}

export default blogSlice.reducer