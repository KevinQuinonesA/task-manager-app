class Task:
    def __init__(self, id, title, description, status='pending'):
        self.id = id
        self.title = title
        self.description = description
        self.status = status

    def validate(self):
        if not self.title or not isinstance(self.title, str):
            raise ValueError("Title is required and must be a string.")
        if not isinstance(self.description, str):
            raise ValueError("Description must be a string.")
        if self.status not in ['pending', 'in_progress', 'completed']:
            raise ValueError("Status must be one of: 'pending', 'in_progress', 'completed'.")