import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  CircularProgress,
  SelectChangeEvent
} from '@mui/material'
import { TaskStatus, useTaskStore } from '../../store/taskStore'

interface AddTaskDialogProps {
  open: boolean
  onClose: () => void
}

const INITIAL_FORM_STATE = {
  title: '',
  description: '',
  status: 'todo' as TaskStatus
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { addTask } = useTaskStore()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
      isValid = false
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters'
      isValid = false
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target as { name?: string; value: unknown }
    setFormData((prev) => ({
      ...prev,
      [name as string]: value
    }))

    // Clear error when field is edited
    if (errors[name as string]) {
      setErrors((prev) => ({
        ...prev,
        [name as string]: ''
      }))
    }
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setSubmitting(true)
    setError(null)

    try {
      await addTask({
        title: formData.title,
        description: formData.description,
        status: formData.status
      })
      setFormData(INITIAL_FORM_STATE)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add task')
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData(INITIAL_FORM_STATE)
    setErrors({})
    setError(null)
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          autoFocus
          margin='dense'
          id='title'
          name='title'
          label='Task Title'
          type='text'
          fullWidth
          value={formData.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
          variant='outlined'
          sx={{ mb: 2, mt: 1 }}
        />

        <TextField
          margin='dense'
          id='description'
          name='description'
          label='Description'
          type='text'
          fullWidth
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          variant='outlined'
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth variant='outlined'>
          <InputLabel id='status-label'>Status</InputLabel>
          <Select
            labelId='status-label'
            id='status'
            name='status'
            value={formData.status}
            onChange={handleChange}
            label='Status'
          >
            <MenuItem value='todo'>To Do</MenuItem>
            <MenuItem value='in_progress'>In Progress</MenuItem>
            <MenuItem value='done'>Done</MenuItem>
          </Select>
          <FormHelperText>Select the initial status of the task</FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={submitting}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant='contained'
          color='primary'
          disabled={submitting}
        >
          {submitting ? <CircularProgress size={24} /> : 'Add Task'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddTaskDialog
