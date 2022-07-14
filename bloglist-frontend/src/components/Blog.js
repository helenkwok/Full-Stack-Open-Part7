import { useState } from 'react'

const Blog = ({ blog, user, like, remove }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="blog">
      <div>
        <span className="title">{blog.title}</span>
        <span> </span>
        <span className="author">{blog.author}</span>
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        <div className="url">{blog.url}</div>
        <div className="likes">
          <span>likes {blog.likes}</span>
          <button className="likeButton" onClick={() => like(blog)}>
            like
          </button>
        </div>
        {blog.user.name}
        <br />
        <button
          style={{
            display: (user.name === blog.user.name) & visible ? '' : 'none',
          }}
          onClick={() => remove(blog)}
        >
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
