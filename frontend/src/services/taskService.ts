import api from './api';
import { Task } from '../store/taskStore';

export const TaskService = {
  getTasks: async (): Promise<Task[]> => {
    const { data } = await api.get<Task[]>('/tasks');
    return data;
  },

  getTask: async (id: string): Promise<Task> => {
    const { data } = await api.get<Task>(`/tasks/${id}`);
    return data;
  },

  createTask: async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>): Promise<Task> => {
    const { data } = await api.post<Task>('/tasks', taskData);
    return data;
  },

  updateTask: async (id: string, taskData: Partial<Task>): Promise<Task> => {
    const { data } = await api.put<Task>(`/tasks/${id}`, taskData);
    return data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};