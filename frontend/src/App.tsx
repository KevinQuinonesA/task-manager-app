import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { useAuthStore } from './store/authStore'
import Layout from './components/Layout/Layout'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import TasksPage from './pages/Tasks/TasksPage'
import TaskStats from './pages/TaskStats/TaskStats'
import NotFound from './pages/NotFound/NotFound'
import './App.css'
import { JSX } from 'react'

const theme = createTheme({
  palette: {
    primary: {
      main: '#01a048'
    },
    secondary: {
      main: '#f50057'
    }
  }
})

function App() {
  const { isAuthenticated } = useAuthStore()

  // Protected route component
  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!isAuthenticated) {
      return <Navigate to='/login' />
    }
    return children
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            {/* Public routes */}
            <Route
              path='/login'
              element={
                !isAuthenticated ? <Login /> : <Navigate to='/dashboard' />
              }
            />
            <Route
              path='/register'
              element={
                !isAuthenticated ? <Register /> : <Navigate to='/dashboard' />
              }
            />

            {/* Protected routes */}
            <Route
              path='/dashboard'
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path='/tasks'
              element={
                <ProtectedRoute>
                  <TasksPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/stats'
              element={
                <ProtectedRoute>
                  <TaskStats />
                </ProtectedRoute>
              }
            />

            {/* Default routes */}
            <Route
              path='/'
              element={
                <Navigate to={isAuthenticated ? '/dashboard' : '/login'} />
              }
            />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
