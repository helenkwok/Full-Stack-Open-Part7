import useField from '../hooks/useField'

const BlogForm = ({ createBlog }) => {
  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title.input.value,
      author: author.input.value,
      url: url.input.value,
    })

    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input {...title.input} />
        </div>
        <div>
          author:
          <input {...author.input} />
        </div>
        <div>
          url:
          <input {...url.input} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
