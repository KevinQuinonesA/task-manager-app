import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Divider,
  Avatar,
  useTheme
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Task as TaskIcon,
  BarChart as ChartIcon,
  Logout as LogoutIcon
} from '@mui/icons-material'
import { useAuthStore } from '../../store/authStore'

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()
  const theme = useTheme()

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleNavigation = (path: string) => {
    navigate(path)
    setDrawerOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Tasks', icon: <TaskIcon />, path: '/tasks' },
    { text: 'Statistics', icon: <ChartIcon />, path: '/stats' }
  ]

  const drawer = (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', height: '100%' }}>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant='h6' component='div' sx={{ color: 'white' }}>
          Task Manager
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
      {isAuthenticated && (
        <>
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 2, bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
              {user?.name?.charAt(0) || user?.email?.charAt(0)}
            </Avatar>
            <Typography sx={{ color: 'white' }}>{user?.name || user?.email}</Typography>
          </Box>
          <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
          <List>
            {menuItems.map((item) => (
              <ListItem
                component='button'
                key={item.text}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                  textAlign: 'left',
                  width: '100%',
                  border: 'none',
                  cursor: 'pointer',
                  margin: '16px 0 0 0',
                  padding: theme.spacing(1, 2)
                }}
              >
                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
          <List>
            <ListItem 
              component='button' 
              onClick={handleLogout}
              sx={{
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
                textAlign: 'left',
                width: '100%',
                border: 'none',
                cursor: 'pointer',
                padding: theme.spacing(1, 2)
              }}
              key='logout'
            >
              <ListItemIcon sx={{ color: 'white' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem>
          </List>
        </>
      )}
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position='fixed'>
        <Toolbar>
          {isAuthenticated && (
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          {!isAuthenticated ? (
            <>
              <Button color='inherit' onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button color='inherit' onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          ) : (
            <Button color='inherit' onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant='temporary'
        open={drawerOpen && isAuthenticated}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile
        }}
        sx={{
          '& .MuiDrawer-paper': { width: 240 }
        }}
      >
        {drawer}
      </Drawer>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          mt: '64px'
        }}
      >
        <Container maxWidth='lg'>
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}

export default Layout
