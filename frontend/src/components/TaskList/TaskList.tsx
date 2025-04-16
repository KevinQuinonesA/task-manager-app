import { useState } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Chip,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider
} from '@mui/material'
import {
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as StartIcon,
  Pause as PauseIcon,
  Check as CompleteIcon,
  Refresh as ResetIcon
} from '@mui/icons-material'
import { Task, TaskStatus, useTaskStore } from '../../store/taskStore'
import EditTaskDialog from '../EditTaskDialog/EditTaskDialog'
import DeleteTaskDialog from '../DeleteTaskDialog/DeleteTaskDialog'

interface TaskListProps {
  tasks: Task[]
  compact?: boolean
}

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case 'todo':
      return 'error'
    case 'in_progress':
      return 'warning'
    case 'done':
      return 'success'
    default:
      return 'default'
  }
}

const getStatusLabel = (status: TaskStatus) => {
  switch (status) {
    case 'todo':
      return 'To Do'
    case 'in_progress':
      return 'In Progress'
    case 'done':
      return 'Done'
    default:
      return 'Unknown'
  }
}

const TaskList: React.FC<TaskListProps> = ({ tasks = [], compact = false }) => {
  // Ensure tasks is an array
  const taskArray = Array.isArray(tasks) ? tasks : []
  
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const { updateTask } = useTaskStore()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, task: Task) => {
    setMenuAnchorEl(event.currentTarget)
    setCurrentTask(task)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }

  const handleStatusChange = async (status: TaskStatus) => {
    if (currentTask) {
      await updateTask(currentTask._id, { status })
    }
    handleMenuClose()
  }

  const handleEditClick = () => {
    setOpenEditDialog(true)
    handleMenuClose()
  }

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true)
    handleMenuClose()
  }

  if (taskArray.length === 0) {
    return <Typography>No tasks available</Typography>
  }

  return (
    <>
      <List>
        {taskArray.map((task) => (
          <ListItem
            key={task._id}
            divider
            secondaryAction={
              <IconButton edge='end' onClick={(e) => handleMenuOpen(e, task)}>
                <MoreIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={task.title}
              secondary={
                compact ? undefined : (
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {task.description}
                  </Typography>
                )
              }
            />
            <Box sx={{ ml: 2 }}>
              <Chip
                label={getStatusLabel(task.status)}
                color={getStatusColor(task.status)}
                size='small'
              />
            </Box>
          </ListItem>
        ))}
      </List>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>
          <ListItemIcon>
            <EditIcon fontSize='small' />
          </ListItemIcon>
          Edit
        </MenuItem>

        <Divider />

        {currentTask?.status !== 'in_progress' && (
          <MenuItem onClick={() => handleStatusChange('in_progress')}>
            <ListItemIcon>
              <StartIcon fontSize='small' />
            </ListItemIcon>
            Start Progress
          </MenuItem>
        )}

        {currentTask?.status === 'in_progress' && (
          <MenuItem onClick={() => handleStatusChange('todo')}>
            <ListItemIcon>
              <PauseIcon fontSize='small' />
            </ListItemIcon>
            Pause Progress
          </MenuItem>
        )}

        {currentTask?.status !== 'done' && (
          <MenuItem onClick={() => handleStatusChange('done')}>
            <ListItemIcon>
              <CompleteIcon fontSize='small' />
            </ListItemIcon>
            Mark as Done
          </MenuItem>
        )}

        {currentTask?.status === 'done' && (
          <MenuItem onClick={() => handleStatusChange('todo')}>
            <ListItemIcon>
              <ResetIcon fontSize='small' />
            </ListItemIcon>
            Reopen Task
          </MenuItem>
        )}

        <Divider />

        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon fontSize='small' color='error' />
          </ListItemIcon>
          <Typography color='error'>Delete</Typography>
        </MenuItem>
      </Menu>

      {currentTask && (
        <>
          <EditTaskDialog
            open={openEditDialog}
            onClose={() => setOpenEditDialog(false)}
            task={currentTask}
          />

          <DeleteTaskDialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            task={currentTask}
          />
        </>
      )}
    </>
  )
}

export default TaskList
