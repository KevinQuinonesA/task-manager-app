import { useEffect } from 'react'
import { Grid, Paper, Typography, Box, CircularProgress } from '@mui/material'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line
} from 'recharts'
import { useTaskStore } from '../../store/taskStore'

const TaskStats = () => {
  const { tasks, isLoading, error, fetchTasks } = useTaskStore()

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

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
        Error loading statistics: {error}
      </Typography>
    )
  }

  // Calculate task statistics
  const todoCount = tasks.filter((task) => task.status === 'todo').length
  const inProgressCount = tasks.filter(
    (task) => task.status === 'in_progress'
  ).length
  const completedCount = tasks.filter(
    (task) => task.status === 'done'
  ).length

  const statusData = [
    { name: 'To Do', value: todoCount, color: '#f44336' },
    { name: 'In Progress', value: inProgressCount, color: '#ff9800' },
    { name: 'Done', value: completedCount, color: '#4caf50' }
  ]

  // Weekly task completion data (this would normally come from the API)
  // For demo purposes, we're creating mock data
  const currentDate = new Date()
  const weeklyData = Array(7)
    .fill(0)
    .map((_, i) => {
      const date = new Date()
      date.setDate(currentDate.getDate() - (6 - i))

      return {
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        completed: Math.floor(Math.random() * 5),
        created: Math.floor(Math.random() * 8)
      }
    })

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Task Statistics
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, height: 350 }}>
            <Typography variant='h6' gutterBottom>
              Task Status Distribution
            </Typography>
            <ResponsiveContainer width='100%' height='90%'>
              <PieChart>
                <Pie
                  data={statusData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill='#8884d8'
                  dataKey='value'
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, height: 350 }}>
            <Typography variant='h6' gutterBottom>
              Task Status Count
            </Typography>
            <ResponsiveContainer width='100%' height='90%'>
              <BarChart
                data={statusData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Bar dataKey='value' name='Tasks'>
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 2, height: 350 }}>
            <Typography variant='h6' gutterBottom>
              Weekly Task Activity
            </Typography>
            <ResponsiveContainer width='100%' height='90%'>
              <LineChart
                data={weeklyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='day' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type='monotone'
                  dataKey='created'
                  stroke='#8884d8'
                  name='Tasks Created'
                />
                <Line
                  type='monotone'
                  dataKey='done'
                  stroke='#4caf50'
                  name='Tasks Done'
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TaskStats
