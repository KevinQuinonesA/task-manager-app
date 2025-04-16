import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Paper
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import TaskList from '../../components/TaskList/TaskList'
import AddTaskDialog from '../../components/AddTaskDialog/AddTaskDialog'
import { useTaskStore, TaskStatus } from '../../store/taskStore'

const TasksPage = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [tabValue, setTabValue] = useState<TaskStatus | 'all'>('all')
  const { tasks, isLoading, error, fetchTasks } = useTaskStore()

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleTabChange = (
    _: React.SyntheticEvent,
    newValue: TaskStatus | 'all'
  ) => {
    setTabValue(newValue)
  }

  // Ensure tasks is an array before filtering
  const tasksArray = Array.isArray(tasks) ? tasks : []
  
  const filteredTasks =
    tabValue === 'all'
      ? tasksArray
      : tasksArray.filter((task) => task.status === tabValue)

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3
        }}
      >
        <Typography variant='h4'>Tasks</Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
        >
          Add Task
        </Button>
      </Box>

      {error && (
        <Alert severity='error' sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
        >
          <Tab value='all' label='All Tasks' />
          <Tab value='todo' label='To Do' />
          <Tab value='in_progress' label='In Progress' />
          <Tab value='done' label='Done' />
        </Tabs>
      </Paper>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredTasks.length === 0 ? (
        <Typography variant='body1' sx={{ textAlign: 'center', mt: 4 }}>
          No tasks found in this category. Add your first task!
        </Typography>
      ) : (
        <TaskList tasks={filteredTasks} />
      )}

      <AddTaskDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
      />
    </Box>
  )
}

export default TasksPage