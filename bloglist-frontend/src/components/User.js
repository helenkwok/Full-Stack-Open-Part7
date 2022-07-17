import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'

const User = () => {
  const users = useSelector(state => state.users )

  const match = useMatch('/users/:id')
  const user = match
    ? users.find(u => u.id === match.params.id)
    : null

  if (!user) return null

  return (
    <Container>
      <Typography variant='h6'>{user.name}</Typography>
      <Typography variant='body'>added blogs</Typography>
      <List>
        {user.blogs.map(blog =>
          <ListItem key={blog.id}>
            <ListItemIcon><ArticleIcon /></ListItemIcon>
            <ListItemText>{blog.title}</ListItemText>
          </ListItem>
        )}
      </List>
    </Container>
  )
}

export default User