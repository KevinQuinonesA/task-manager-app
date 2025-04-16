import unittest
from src.services.task_service import TaskService
from src.models.task import Task

class TestTaskService(unittest.TestCase):

    def setUp(self):
        self.task_service = TaskService()
        self.test_task = Task(id="1", title="Test Task", description="This is a test task.", status="pending")

    def test_create_task(self):
        created_task = self.task_service.create_task(self.test_task)
        self.assertEqual(created_task.title, self.test_task.title)
        self.assertEqual(created_task.description, self.test_task.description)
        self.assertEqual(created_task.status, self.test_task.status)

    def test_get_all_tasks(self):
        self.task_service.create_task(self.test_task)
        tasks = self.task_service.get_all_tasks()
        self.assertGreater(len(tasks), 0)

    def test_update_task_status(self):
        self.task_service.create_task(self.test_task)
        updated_task = self.task_service.update_task_status("1", "completed")
        self.assertEqual(updated_task.status, "completed")

    def test_delete_task(self):
        self.task_service.create_task(self.test_task)
        self.task_service.delete_task("1")
        tasks = self.task_service.get_all_tasks()
        self.assertEqual(len(tasks), 0)

if __name__ == '__main__':
    unittest.main()