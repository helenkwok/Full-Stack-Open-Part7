import useField from '../hooks/useField'
import {
  Box,
  Button,
  Typography,
  TextField
} from '@mui/material'

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
    <Box>
      <Typography variant='h6'>create new</Typography>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label='title'
            variant='filled'
            InputProps={{ ...title.input }}
          />
        </div>
        <div>
          <TextField
            label='author'
            variant='filled'
            InputProps={{ ...author.input }}
          />
        </div>
        <div>
          <TextField
            label='url'
            variant='filled'
            InputProps={{ ...url.input }}
          />
        </div>
        <Button type="submit" variant='contained'>create</Button>
      </form>
    </Box>
  )
}

export default BlogForm
