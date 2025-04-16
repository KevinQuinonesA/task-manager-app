import { JSX, useEffect } from 'react'
import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent
} from '@mui/material'
import {
  Assignment as TaskIcon,
  DonutLarge as ProgressIcon,
  CheckCircle as CompletedIcon
} from '@mui/icons-material'
import { useTaskStore } from '../../store/taskStore'
import TaskList from '../../components/TaskList/TaskList'

const Dashboard = () => {
  const { tasks, isLoading, error, fetchTasks } = useTaskStore()

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // Calculate task statistics - ensure tasks is an array before using filter
  const totalTasks = Array.isArray(tasks) ? tasks.length : 0
  const todoTasks = Array.isArray(tasks) 
    ? tasks.filter((task) => task.status === 'todo').length 
    : 0
  const inProgressTasks = Array.isArray(tasks) 
    ? tasks.filter((task) => task.status === 'in_progress').length 
    : 0
  const completedTasks = Array.isArray(tasks) 
    ? tasks.filter((task) => task.status === 'done').length 
    : 0
  

  const StatCard = ({
    title,
    count,
    icon,
    color
  }: {
    title: string
    count: number
    icon: JSX.Element
    color: string
  }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display='flex' alignItems='center'>
          <Box
            sx={{
              backgroundColor: `${color}20`,
              borderRadius: '50%',
              p: 1.5,
              mr: 2,
              display: 'flex'
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant='h5' component='div'>
              {count}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {title}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Typography color='error' variant='h6'>
        Error loading dashboard: {error}
      </Typography>
    )
  }

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Total Tasks'
            count={totalTasks}
            icon={<TaskIcon sx={{ color: '#3f51b5' }} />}
            color='#3f51b5'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='To Do'
            count={todoTasks}
            icon={<TaskIcon sx={{ color: '#f44336' }} />}
            color='#f44336'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='In Progress'
            count={inProgressTasks}
            icon={<ProgressIcon sx={{ color: '#ff9800' }} />}
            color='#ff9800'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Done'
            count={completedTasks}
            icon={<CompletedIcon sx={{ color: '#4caf50' }} />}
            color='#4caf50'
          />
        </Grid>
      </Grid>

      <Typography variant='h5' gutterBottom>
        Recent Tasks
      </Typography>

      <Paper sx={{ p: 2 }}>
        <TaskList tasks={Array.isArray(tasks) ? tasks.slice(0, 5) : []} compact />
      </Paper>
    </Box>
  )
}

export default Dashboard
