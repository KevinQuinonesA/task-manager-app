from bson.objectid import ObjectId
from bson.errors import InvalidId
import json
import uuid
from datetime import datetime

class TaskService:
    def __init__(self, db):
        self.db = db
        self.collection = db["tasks"]

    def get_all_tasks(self):
        """Retrieve all tasks from the database"""
        try:
            tasks = []
            for task in self.collection.find():
                task['_id'] = str(task['_id'])
                tasks.append(task)
            return tasks
        except Exception as e:
            print(f"Error retrieving tasks: {str(e)}")
            raise

    def create_task(self, task_data):
        """Create a new task with required fields"""
        try:
            # Validate required fields
            if not task_data.get('title'):
                raise ValueError("Task title is required")

            # Set default values if not provided
            new_task = {
                'title': task_data['title'],
                'description': task_data.get('description', ''),
                'status': task_data.get('status', 'todo'),  # Default status is 'todo'
                'created_at': datetime.utcnow().isoformat(),
                'updated_at': datetime.utcnow().isoformat(),
                'user_id': task_data.get('user_id')
            }
            
            result = self.collection.insert_one(new_task)
            
            # Return the created task with string ID
            created_task = self.get_task(str(result.inserted_id))
            return created_task
        except Exception as e:
            print(f"Error creating task: {str(e)}")
            raise

    def update_task(self, task_id, task_data):
        """Update an existing task"""
        try:
            # Validate ObjectId
            if not ObjectId.is_valid(task_id):
                raise ValueError(f"Invalid task ID: {task_id}")
                
            # Add updated timestamp
            task_data['updated_at'] = datetime.utcnow().isoformat()
            
            result = self.collection.update_one(
                {"_id": ObjectId(task_id)}, 
                {"$set": task_data}
            )
            
            if result.modified_count > 0:
                return self.get_task(task_id)
            elif self.collection.find_one({"_id": ObjectId(task_id)}):
                # Task exists but no changes were made
                return self.get_task(task_id)
            else:
                # Task not found
                return None
        except InvalidId:
            raise ValueError(f"Invalid task ID format: {task_id}")
        except Exception as e:
            print(f"Error updating task: {str(e)}")
            raise

    def update_task_status(self, task_id, status_data):
        """Update just the status of a task"""
        try:
            if 'status' not in status_data:
                raise ValueError("Status field is required")
                
            # Validate status value
            valid_statuses = ['todo', 'in_progress', 'done']
            if status_data['status'] not in valid_statuses:
                raise ValueError(f"Invalid status. Must be one of: {', '.join(valid_statuses)}")
                
            return self.update_task(task_id, {'status': status_data['status']})
        except Exception as e:
            print(f"Error updating task status: {str(e)}")
            raise

    def delete_task(self, task_id):
        """Delete a task by ID"""
        try:
            # Validate ObjectId
            if not ObjectId.is_valid(task_id):
                raise ValueError(f"Invalid task ID: {task_id}")
                
            result = self.collection.delete_one({"_id": ObjectId(task_id)})
            return result.deleted_count > 0
        except InvalidId:
            raise ValueError(f"Invalid task ID format: {task_id}")
        except Exception as e:
            print(f"Error deleting task: {str(e)}")
            raise

    def get_task(self, task_id):
        """Get a single task by ID"""
        try:
            # Validate ObjectId
            if not ObjectId.is_valid(task_id):
                raise ValueError(f"Invalid task ID: {task_id}")
                
            task = self.collection.find_one({"_id": ObjectId(task_id)})
            if task:
                task['_id'] = str(task['_id'])
            return task
        except InvalidId:
            raise ValueError(f"Invalid task ID format: {task_id}")
        except Exception as e:
            print(f"Error retrieving task: {str(e)}")
            raise
            
    def get_tasks_by_status(self, status):
        """Get all tasks with a specific status"""
        try:
            tasks = []
            for task in self.collection.find({"status": status}):
                task['_id'] = str(task['_id'])
                tasks.append(task)
            return tasks
        except Exception as e:
            print(f"Error retrieving tasks by status: {str(e)}")
            raise
            
    def get_tasks_by_user(self, user_id):
        """Get all tasks for a specific user"""
        try:
            tasks = []
            for task in self.collection.find({"user_id": user_id}):
                task['_id'] = str(task['_id'])
                tasks.append(task)
            return tasks
        except Exception as e:
            print(f"Error retrieving user tasks: {str(e)}")
            raise