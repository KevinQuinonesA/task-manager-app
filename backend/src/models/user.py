class User:
    def __init__(self, user_id, name, email, password):
        self.id = user_id
        self.name = name
        self.email = email
        self.password = password

    def validate_email(self):
        # Add email validation logic here
        pass

    def validate_password(self):
        # Add password validation logic here
        pass