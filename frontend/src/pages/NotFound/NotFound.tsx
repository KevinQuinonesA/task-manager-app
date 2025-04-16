import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh'
      }}
    >
      <Typography variant='h1' fontWeight='bold' color='primary'>
        404
      </Typography>
      <Typography variant='h4' sx={{ mt: 2, mb: 4 }}>
        Page Not Found
      </Typography>
      <Typography variant='body1' sx={{ mb: 4 }}>
        The page you are looking for might have been removed or doesn't exist.
      </Typography>
      <Button variant='contained' color='primary' onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </Box>
  )
}

export default NotFound
