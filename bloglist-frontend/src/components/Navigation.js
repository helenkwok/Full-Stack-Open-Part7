import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography
} from '@mui/material'
import { loggedUser, logout } from '../reducers/loginReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { initializeUsers } from '../reducers/userReducer'

const Navigation = () => {
  const currentUser = useSelector(state => state.login)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loggedUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  const handleLogout = async () => {
    dispatch(logout())
  }
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          <Typography
            sx={{
              ml: 2,
              fontWeight: 500,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {currentUser.name} logged in
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant='h5'>blog app</Typography>
      </Container>
    </>
  )
}

export default Navigation