def validate_task_data(task_data):
    if not isinstance(task_data, dict):
        raise ValueError("Task data must be a dictionary.")
    
    required_fields = ['title', 'description', 'status']
    for field in required_fields:
        if field not in task_data:
            raise ValueError(f"Missing required field: {field}")
    
    if not isinstance(task_data['title'], str) or not task_data['title']:
        raise ValueError("Title must be a non-empty string.")
    
    if not isinstance(task_data['description'], str):
        raise ValueError("Description must be a string.")
    
    if task_data['status'] not in ['pending', 'in_progress', 'completed']:
        raise ValueError("Status must be one of: 'pending', 'in_progress', 'completed'.")

def validate_user_data(user_data):
    if not isinstance(user_data, dict):
        raise ValueError("User data must be a dictionary.")
    
    required_fields = ['email', 'password']
    for field in required_fields:
        if field not in user_data:
            raise ValueError(f"Missing required field: {field}")
    
    if not isinstance(user_data['email'], str) or '@' not in user_data['email']:
        raise ValueError("Email must be a valid email address.")
    
    if not isinstance(user_data['password'], str) or len(user_data['password']) < 6:
        raise ValueError("Password must be a string with at least 6 characters.")