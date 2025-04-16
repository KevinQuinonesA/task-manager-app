import re
import bcrypt

class Authenticator:
    def __init__(self, user_service):
        self.user_service = user_service

    def register_user(self, name, email, password):
        """Register a new user"""
        # Validate inputs
        if not email or not password:
            raise ValueError("Email and password are required")
            
        # Validate email format
        if not self._is_valid_email(email):
            raise ValueError("Invalid email format")
            
        # Validate password strength
        if not self._is_valid_password(password):
            raise ValueError("Password must be at least 8 characters")
            
        # Check if user already exists
        existing_user = self.user_service.find_by_email(email)
        if existing_user:
            raise ValueError("User with this email already exists")
            
        # Hash password
        hashed_password = self._hash_password(password)
        
        # Create user
        user = self.user_service.create({
            'name': name,
            'email': email,
            'password': hashed_password
        })
        
        return user

    def authenticate_user(self, email, password):
        """Authenticate a user with email and password"""
        if not email or not password:
            return None
            
        user = self.user_service.find_by_email(email)
        if not user:
            return None
            
        if self._verify_password(password, user.get('password', '')):
            return user
            
        return None

    def _is_valid_email(self, email):
        """Email validation using regex"""
        pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        return bool(re.match(pattern, email))

    def _is_valid_password(self, password):
        """Password strength validation"""
        return len(password) >= 8

    def _hash_password(self, password):
        """Hash a password using bcrypt"""
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed.decode('utf-8')  # Store as string
        
    def _verify_password(self, plain_password, hashed_password):
        """Verify a password against a hash"""
        try:
            return bcrypt.checkpw(
                plain_password.encode('utf-8'),
                hashed_password.encode('utf-8')
            )
        except Exception:
            return False