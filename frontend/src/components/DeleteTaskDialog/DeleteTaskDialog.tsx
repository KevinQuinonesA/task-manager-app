import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material'
import { Task, useTaskStore } from '../../store/taskStore'

interface DeleteTaskDialogProps {
  open: boolean
  onClose: () => void
  task: Task
}

const DeleteTaskDialog: React.FC<DeleteTaskDialogProps> = ({
  open,
  onClose,
  task
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { deleteTask } = useTaskStore()

  const handleDelete = async () => {
    setSubmitting(true)
    setError(null)

    try {
      await deleteTask(task._id)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Typography>
          Are you sure you want to delete the task "{task.title}"? This action
          cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant='contained'
          color='error'
          disabled={submitting}
        >
          {submitting ? <CircularProgress size={24} /> : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteTaskDialog
